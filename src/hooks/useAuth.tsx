import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AuthContextProps } from "../types/auth";

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
