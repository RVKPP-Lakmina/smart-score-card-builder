import { createContext } from "react";
import { ThemeContextType } from "../types/themes";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
