import { useContext } from "react";
import RuleContext from "../context/RuleContext";

export function useRuleStore() {
  const context = useContext(RuleContext);

  if (!context) {
    throw new Error("useRuleStore must be used within a RuleProvider");
  }

  return context;
}
