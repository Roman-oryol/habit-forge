import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { startSession } from "@/lib/auth-session";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    meta: { silentError: true },
    onSuccess: ({ token, refreshToken }) => {
      startSession({ token, refreshToken });
    },
  });
}
