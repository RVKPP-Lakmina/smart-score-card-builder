import { createContext } from "react";
import { RuleContextProps } from "../types/ruleStore";

const RuleContext = createContext<RuleContextProps | undefined>(undefined);

export default RuleContext;
