"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

interface IAuthContext {
  isLoggedIn: boolean;
  role?: string;
  checkToken: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | any>({});

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<string>("");

  const checkToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    role && setRole(role);
    setIsLoggedIn(!!Boolean(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    setRole("");
    setIsLoggedIn(false);
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, checkToken, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext<IAuthContext>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within the AppProvider");
  }

  return context;
}
