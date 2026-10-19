import { authToken, refreshToken } from "@/lib/auth-token";
import type { Session } from "@/types/auth";

// Refresh пишем первым: когда сработает подписка на access-токен
// (редирект, запросы), refresh-токен уже на месте
export function startSession(session: Session) {
  refreshToken.set(session.refreshToken);
  authToken.set(session.token);
}

export function endSession() {
  refreshToken.clear();
  authToken.clear();
}
