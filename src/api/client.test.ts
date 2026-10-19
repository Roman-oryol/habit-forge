import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Окружение тестов node: браузерные API подставляем руками
function stubBrowser() {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  vi.stubGlobal("window", { addEventListener: () => {} });

  // Web Locks: очередь, как у настоящего замка
  let queue: Promise<unknown> = Promise.resolve();
  vi.stubGlobal("navigator", {
    locks: {
      request: <T>(_name: string, fn: () => Promise<T>) => {
        const run = queue.then(fn);
        queue = run.catch(() => {});
        return run;
      },
    },
  });
  vi.stubEnv("VITE_API_URL", "http://api.test");
  return store;
}

const json = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status });

type Handler = (url: string, init: RequestInit) => Response;

function mockFetch(handler: Handler) {
  const fn = vi.fn(async (url: string, init: RequestInit = {}) =>
    handler(url, init),
  );
  vi.stubGlobal("fetch", fn);
  return fn;
}

const authHeader = (init: RequestInit) =>
  new Headers(init.headers).get("Authorization");

async function load() {
  vi.resetModules();
  const client = await import("./client");
  const tokens = await import("@/lib/auth-token");
  return { ...client, ...tokens };
}

describe("apiFetch", () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = stubBrowser();
    store.set("habitforge:token", "expired");
    store.set("habitforge:refresh-token", "refresh-1");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("на 401 обновляет сессию и повторяет запрос с новым токеном", async () => {
    const fetchMock = mockFetch((url, init) => {
      if (url.endsWith("/auth/refresh")) {
        return json(200, { token: "fresh", refreshToken: "refresh-2" });
      }
      return authHeader(init) === "Bearer fresh"
        ? json(200, { ok: true })
        : json(401, { error: "Invalid token" });
    });
    const { apiFetch, authToken, refreshToken } = await load();

    await expect(apiFetch("/habits")).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(3); // 401, refresh, повтор
    expect(authToken.get()).toBe("fresh");
    expect(refreshToken.get()).toBe("refresh-2");
  });

  it("параллельные запросы делают ровно один refresh", async () => {
    const fetchMock = mockFetch((url, init) => {
      if (url.endsWith("/auth/refresh")) {
        return json(200, { token: "fresh", refreshToken: "refresh-2" });
      }
      return authHeader(init) === "Bearer fresh"
        ? json(200, { ok: true })
        : json(401, { error: "Invalid token" });
    });
    const { apiFetch } = await load();

    await Promise.all([
      apiFetch("/habits"),
      apiFetch("/categories"),
      apiFetch("/auth/me"),
    ]);

    const refreshCalls = fetchMock.mock.calls.filter(([url]) =>
      url.endsWith("/auth/refresh"),
    );
    expect(refreshCalls).toHaveLength(1);
  });

  it("если refresh-токен отклонён, завершает сессию и бросает 401", async () => {
    mockFetch((url) =>
      url.endsWith("/auth/refresh")
        ? json(401, { error: "Invalid refresh token" })
        : json(401, { error: "Invalid token" }),
    );
    const { apiFetch, authToken, refreshToken, ApiError } = await load();

    await expect(apiFetch("/habits")).rejects.toBeInstanceOf(ApiError);

    expect(authToken.get()).toBeNull();
    expect(refreshToken.get()).toBeNull();
  });

  it("при недоступном сервере (503 на refresh) сессию не трогает", async () => {
    mockFetch((url) =>
      url.endsWith("/auth/refresh")
        ? json(503, { error: "Service unavailable" })
        : json(401, { error: "Invalid token" }),
    );
    const { apiFetch, authToken, refreshToken } = await load();

    await expect(apiFetch("/habits")).rejects.toMatchObject({ status: 503 });

    expect(authToken.get()).toBe("expired");
    expect(refreshToken.get()).toBe("refresh-1");
  });

  it("401 на логине (auth: false) не запускает refresh", async () => {
    const fetchMock = mockFetch(() =>
      json(401, { error: "Invalid email or password" }),
    );
    const { apiFetch, authToken } = await load();

    await expect(
      apiFetch("/auth/login", { method: "POST", body: {}, auth: false }),
    ).rejects.toMatchObject({ status: 401 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(authToken.get()).toBe("expired");
  });
});
