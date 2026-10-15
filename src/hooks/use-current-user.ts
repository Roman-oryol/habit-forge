import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth";
import { useAuthToken } from "./use-auth-token";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useCurrentUser() {
  const token = useAuthToken();

  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });
}
