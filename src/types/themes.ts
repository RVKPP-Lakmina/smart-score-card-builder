export interface ThemeContextType {
  toggleTheme: () => boolean;
  isDarkMode: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: string;
}
