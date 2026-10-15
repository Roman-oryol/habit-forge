import { useSyncExternalStore } from "react";
import { authToken } from "@/lib/auth-token";

export function useAuthToken() {
  return useSyncExternalStore(authToken.subscribe, authToken.getSnapshot);
}
