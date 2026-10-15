// types/auth.ts
export type AuthUser = {
  id: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type Credentials = {
  email: string;
  password: string;
};
