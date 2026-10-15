import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/auth";
import { authToken } from "@/lib/auth-token";
import type { Credentials } from "@/types/auth";

export function useRegister() {
  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      await register(credentials);
      return login(credentials);
    },
    onSuccess: ({ token }) => {
      authToken.set(token);
    },
  });
}
