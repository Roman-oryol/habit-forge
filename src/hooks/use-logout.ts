import { logout } from "@/api/auth";
import { endSession } from "@/lib/auth-session";
import { refreshToken } from "@/lib/auth-token";

export function useLogout() {
  return () => {
    const stored = refreshToken.get();
    // Сначала выходим локально: интерфейс реагирует сразу, не ждёт сервер
    endSession();
    // Потом сообщаем серверу, чтобы он погасил refresh-токен. Не вышло: не страшно,
    // токен всё равно истечёт сам
    if (stored) logout(stored).catch(() => {});
  };
}
