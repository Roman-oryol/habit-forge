import { authToken } from "@/lib/auth-token";

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

export async function apiFetch<T>(
  path: string,
  { body, auth = true, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const token = auth ? authToken.get() : null;

  const requestHeaders = new Headers(headers);
  if (body !== undefined)
    requestHeaders.set("Content-Type", "application/json");
  if (token) requestHeaders.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // 401 на запрос С токеном: сессия истекла или токен недействителен.
    // 401 на login (auth: false, токена нет): просто неверный пароль,
    // токен не трогаем.
    if (res.status === 401 && token) authToken.clear();
    throw new ApiError(res.status, await readErrorMessage(res));
  }

  // 204 No Content: тела нет, res.json() упал бы
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
