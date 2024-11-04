// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

import api from "@/api/config/axiosInstance";
import authService from "@/api/services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  Gender?: "Female" | "Male";
}

interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
  updateUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser({ ...currentUser });
        try {
          await updateUserData();
          await authService.refreshToken();
        } catch (error) {
          console.log(error);
          await logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await authService.refreshToken();
        await updateUserData();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const updateUserData = async () => {
    try {
      const fullUserData = await authService.getProfile();
      setUser(fullUserData?.response);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  const login = async (username: string, password: string) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    await updateUserData();
    return data;
  };

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    window.dispatchEvent(new Event("logout"));
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        try {
          await authService.refreshToken();
        } catch (error) {
          console.error("Failed to refresh token:", error);
          await logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [logout]);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log({ error });
        if (error.response && error.response.status === 401 && user) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
