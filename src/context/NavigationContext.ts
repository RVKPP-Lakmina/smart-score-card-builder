import { createContext } from "react";
import { NavigationContextProps } from "../types/navgation";

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export default NavigationContext;
