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
