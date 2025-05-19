import { RuleWithId } from "./rules";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RuleContextProps {
  templateId: string;
  sectionId: string;
  rules: RuleWithId[];
  createRule: () => void;
  handleDelete: (ruleId: string) => void;
  cloneRule: (ruleId: string) => void;
  updateRule: (ruleId: string, updatedRule: any) => void;
}
