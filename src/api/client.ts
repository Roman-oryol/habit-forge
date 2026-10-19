import { authToken, refreshToken } from "@/lib/auth-token";
import { endSession, startSession } from "@/lib/auth-session";
import type { Session } from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean; // false для login/register: токен не отправляем
};

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.error === "string") return data.error;
    // ошибки Zod с бэкенда приходят массивом issues
    if (Array.isArray(data?.error)) {
      return data.error
        .map((issue: { message: string }) => issue.message)
        .join(", ");
    }
  } catch {
    // тело не JSON, используем текст по умолчанию
  }
  return `Request failed with status ${res.status}`;
}

function send(
  path: string,
  { body, headers, ...init }: Omit<RequestOptions, "auth">,
  token: string | null,
): Promise<Response> {
  const requestHeaders = new Headers(headers);
  if (body !== undefined)
    requestHeaders.set("Content-Type", "application/json");
  if (token) requestHeaders.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

const REFRESH_LOCK = "habitforge:refresh";

// Замок на все вкладки: refresh-токен одноразовый, и два параллельных
// обмена одного токена дали бы второму 401 и лишний выход
function withRefreshLock<T>(fn: () => Promise<T>): Promise<T> {
  return navigator.locks ? navigator.locks.request(REFRESH_LOCK, fn) : fn();
}

// true: у нас свежий access-токен, запрос можно повторить.
// false: сессия закончена (refresh-токена нет или сервер его не принял).
// Сетевая ошибка и 5xx пробрасываются: сервер недоступен (например, Render
// просыпается), а это не повод разлогинивать пользователя.
function refreshSession(failedToken: string): Promise<boolean> {
  return withRefreshLock(async () => {
    // Пока ждали замок, другой запрос или вкладка могли уже обновить токены
    authToken.sync();
    const current = authToken.get();
    if (current !== failedToken) return current !== null;

    const stored = refreshToken.get();
    if (!stored) return false;

    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: stored }),
    });

    if (res.status === 400 || res.status === 401) {
      endSession();
      return false;
    }
    if (!res.ok) throw new ApiError(res.status, await readErrorMessage(res));

    startSession((await res.json()) as Session);
    return true;
  });
}

export async function apiFetch<T>(
  path: string,
  { auth = true, ...request }: RequestOptions = {},
): Promise<T> {
  const token = auth ? authToken.get() : null;

  let res = await send(path, request, token);

  // 401 на запрос С токеном: access-токен истёк (живёт 15 минут).
  // Тихо обновляем сессию и повторяем запрос один раз.
  // 401 на login (token = null): просто неверный пароль, сессию не трогаем.
  if (res.status === 401 && token && (await refreshSession(token))) {
    res = await send(path, request, authToken.get());
  }

  if (!res.ok) {
    // Обновление не помогло: сессия недействительна
    if (res.status === 401 && token) endSession();
    throw new ApiError(res.status, await readErrorMessage(res));
  }

  // 204 No Content: тела нет, res.json() упал бы
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
