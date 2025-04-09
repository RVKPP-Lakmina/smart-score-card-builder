import { Sections } from "./responseTypes";

export interface SectionStoreContextType {
  sections: Sections;
  createTemplte: () => void;
}
