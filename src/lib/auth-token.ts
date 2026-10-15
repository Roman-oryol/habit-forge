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
