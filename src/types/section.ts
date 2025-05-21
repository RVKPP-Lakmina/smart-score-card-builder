import { ItemsDD } from "./anyTypes";
import { TemplateSections, TemplateSectionsPropsWithId } from "./responseTypes";
import { RuleWithId } from "./rules";

export interface UseCreateNewSectionsProps {
  selectedVariables: { current: string[] };
  onCheckedChange: (ids: string[]) => void;
  toggleNewSection: {
    get: () => boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
export interface SectionStoreContextType {
  sections: TemplateSections;
  createTemplte: () => void;
  rawSections: ItemsDD[];
  useCreateNewSections: () => UseCreateNewSectionsProps;
  sectionRules: Record<string, RuleWithId[]>;
  rawRules: ItemsDD[];
  templateId: string;
  saveSectionBulkRules: (sectionId: string, ruleIds: string[]) => Promise<void>;
  handleDeleteRuleItem: (rule: RuleWithId) => Promise<void>;
  changePageToRules: (section: TemplateSectionsPropsWithId) => void;
  onSaveOverallWeight: (
    section: TemplateSectionsPropsWithId,
    overallWeight: number
  ) => Promise<void>;
}
