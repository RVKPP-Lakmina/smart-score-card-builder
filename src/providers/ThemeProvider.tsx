import { useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { ThemeProviderProps } from "../types/themes";

/*
    The ThemeProvider component is a React functional component that provides the theme context to its children.
    It uses the ThemeContext.Provider to wrap its children and provide the theme context value.
    The ThemeProviderProps interface defines the props that the ThemeProvider component accepts.
    In this case, it accepts a single prop called children, which is of type React.ReactNode.
    @params {ThemeProviderProps} props - The props for the ThemeProvider component.
    @returns {JSX.Element} - The ThemeProvider component that wraps its children with the ThemeContext.Provider.
*/
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  // The useState hook is used to manage the state of the theme.
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const isDarkModeActive: boolean = !isDarkMode; // This line seems to be a typo. It should be removed or corrected.
    setIsDarkMode(isDarkModeActive);
    return isDarkModeActive; // This line seems to be a typo. It should be removed or corrected.
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {/* The ThemeContext.Provider is used to provide the theme context to the children components.
    The value prop is currently an empty object, but it should be replaced with the actual theme context value. */}
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
