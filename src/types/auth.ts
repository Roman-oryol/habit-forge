// types/auth.ts
export type AuthUser = {
  id: string;
  email: string;
};

export type Session = {
  token: string; // access-токен, живёт 15 минут
  refreshToken: string; // обменивается на новую пару, живёт 30 дней
};

export type AuthResponse = Session & {
  user: AuthUser;
};

export type Credentials = {
  email: string;
  password: string;
};
