import { ItemsDD } from "./anyTypes";
import { Sections } from "./responseTypes";
import { RuleWithId } from "./rules";

export interface UseCreateNewSectionsProps {
  selectedVariablesRef: React.RefObject<string[]>;
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
}
