// api/auth.ts
import type { AuthResponse, AuthUser, Credentials } from "@/types/auth";
import { apiFetch } from "./client";

export function register(credentials: Credentials): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/register", {
    method: "POST",
    body: credentials,
    auth: false,
  });
}

export function login(credentials: Credentials): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: credentials,
    auth: false,
  });
}

export function getMe(): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me");
}

export function logout(refreshToken: string): Promise<void> {
  return apiFetch<void>("/auth/logout", {
    method: "POST",
    body: { refreshToken },
    auth: false,
  });
}

export function forgotPassword(email: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: { email },
    auth: false,
  });
}

export function resetPassword(input: {
  token: string;
  password: string;
}): Promise<void> {
  return apiFetch<void>("/auth/reset-password", {
    method: "POST",
    body: input,
    auth: false,
  });
}
