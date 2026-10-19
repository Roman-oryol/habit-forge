import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    meta: {
      successMessage: "Password updated. Log in with the new one.",
      silentError: true,
    },
  });
}
