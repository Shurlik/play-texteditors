export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  Gender?: "Female" | "Male";
}