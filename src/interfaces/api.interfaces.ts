export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

