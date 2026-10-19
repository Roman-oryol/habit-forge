import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      /** Заголовок success-тоста. Нет поля: тост не показываем. */
      successMessage?: string;
      /** Заголовок error-тоста. Нет поля: "Something went wrong". */
      errorMessage?: string;
      /** Ошибку показывает сама форма (логин, регистрация): тост не нужен. */
      silentError?: boolean;
    };
  }
}
