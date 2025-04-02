import React from "react";
import { cn } from "../lib/util";
import useTheme from "../hooks/useTheme";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
