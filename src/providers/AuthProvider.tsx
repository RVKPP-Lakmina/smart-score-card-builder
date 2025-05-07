import React, { useState, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import { AuthContextProps, AuthProviderProps } from "../types/auth";

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem("accessToken")
  );

  const login = (token: string, user: string) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("user", user);
    setAccessToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    setAccessToken(null);
  };

  const value: AuthContextProps = useMemo(
    () => ({
      accessToken,
      login,
      logout,
    }),
    [accessToken]
  );

  return (
    <AuthContext.Provider value={value}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
