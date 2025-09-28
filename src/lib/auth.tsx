import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserMe } from "@/lib/api";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserMe()
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [token, navigate]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
