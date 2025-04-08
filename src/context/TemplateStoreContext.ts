import { createContext } from "react";
import { TemplaterStoreContextType } from "../types/templateStore";

const TemplaterStoreContext = createContext<
  TemplaterStoreContextType | undefined
>(undefined);

export default TemplaterStoreContext;
