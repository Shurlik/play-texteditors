// src/api/authService.ts
import { toast } from "react-toastify";

import { RegisterData, LoginResponse, User } from "@/interfaces/api.interfaces";

import api from "../config/axiosInstance";

const authService = {
  async register(data: RegisterData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/auth/register", data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data.errorCode === "USERNAME_EXISTS") {
        throw new Error("User exists");
      }
      throw error;
    }
  },

  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });
      const { accessToken, user } = response.data;
      if (accessToken) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
      }
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Wrong username or password");
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch {
      toast.error("Something went wrong during logout");
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }
  },

  async refreshToken(): Promise<string> {
    try {
      const response = await api.post<{ accessToken: string }>("/auth/token");
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await this.logout();
      console.error(error);
      throw new Error("Please log in");
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await api.get<User>("/users/profile");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateProfile(data: any, id: any) {
    try {
      const response = id
        ? await api.put(`/users/profile/${id}`, { data })
        : await api.put("/users/profile", { data });
      return response.data;
    } catch (e) {
      console.log("error: ", e);
    }
  },
};

export default authService;
