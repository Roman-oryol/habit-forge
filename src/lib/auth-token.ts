const STORAGE_KEY = "habitforge:token";
const listeners = new Set<() => void>();

function read(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

let currentToken = read();

function notify() {
  listeners.forEach((listener) => listener());
}

export const authToken = {
  get: (): string | null => currentToken,

  // Актуальное значение из localStorage: токен мог обновить другая вкладка
  sync() {
    const stored = read();
    if (stored === currentToken) return;
    currentToken = stored;
    notify();
  },

  set(token: string) {
    currentToken = token;
    localStorage.setItem(STORAGE_KEY, token);
    notify();
  },

  clear() {
    currentToken = null;
    localStorage.removeItem(STORAGE_KEY);
    notify();
  },

  subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  getSnapshot: (): string | null => currentToken,
};

// Выход или вход в другой вкладке: подтягиваем изменение сюда
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    currentToken = read();
    notify();
  }
});

const REFRESH_KEY = "habitforge:refresh-token";

// Refresh-токен долгоживущий и в UI не участвует, поэтому без подписок:
// читаем прямо из localStorage, так вкладки всегда видят одно значение
export const refreshToken = {
  get(): string | null {
    try {
      return localStorage.getItem(REFRESH_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    localStorage.setItem(REFRESH_KEY, token);
  },
  clear() {
    localStorage.removeItem(REFRESH_KEY);
  },
};
