import { createContext } from "react";
import { ModalContextType } from "../types/types";

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
