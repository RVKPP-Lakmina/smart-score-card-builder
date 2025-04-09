import { createContext } from "react";
import { SectionStoreContextType } from "../types/section";

const SectionStoreContext = createContext<SectionStoreContextType | undefined>(
  undefined
);

export default SectionStoreContext;
