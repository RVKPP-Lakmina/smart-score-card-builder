import { ItemsDD } from "./anyTypes";
import { Sections, TemplatesPropsWithId } from "./responseTypes";
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
  sections: Sections;
  createTemplte: () => void;
  rawSections: ItemsDD[];
  useCreateNewSections: () => UseCreateNewSectionsProps;
  sectionRules: Record<string, RuleWithId[]>;
  rawRules: ItemsDD[];
  templateId: string;
  saveSectionBulkRules: (sectionId: string, ruleIds: string[]) => Promise<void>;
  handleDeleteRuleItem: (rule: RuleWithId) => Promise<void>;
  changePageToRules: (section: TemplatesPropsWithId) => void;
}
