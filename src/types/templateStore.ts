import { Templates } from "./responseTypes";

export interface TemplaterStoreContextType {
  templates: Templates;
  createTemplte: () => void;
  handleDelete: (templateId: string) => void;
  cloneTemplate: (templateId: string) => void;
}
