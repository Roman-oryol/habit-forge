import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/auth";
import { startSession } from "@/lib/auth-session";
import type { Credentials } from "@/types/auth";

export function useRegister() {
  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      await register(credentials);
      return login(credentials);
    },
    meta: { silentError: true },
    onSuccess: ({ token, refreshToken }) => {
      startSession({ token, refreshToken });
    },
  });
}
