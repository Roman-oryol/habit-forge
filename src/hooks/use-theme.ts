import { useSyncExternalStore } from "react";
import { themeStore } from "@/lib/theme";

export function useTheme() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
  );

  return {
    theme,
    toggleTheme: () => themeStore.setTheme(theme === "dark" ? "light" : "dark"),
  };
}
