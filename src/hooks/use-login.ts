import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { authToken } from "@/lib/auth-token";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    meta: { silentError: true },
    onSuccess: ({ token }) => {
      authToken.set(token);
    },
  });
}
