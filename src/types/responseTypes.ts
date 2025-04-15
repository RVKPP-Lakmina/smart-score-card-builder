export type Sections = {
  [key: string]: {
    id: string;
    name: string;
    createdAt?: string;
    lastEdited?: string;
    lastEditedBy?: string;
    createdBy?: string;
  };
};

export interface TemplateSectionProps {
  name: string;
  description?: string;
  overallWeight?: number;
  sectionWeight?: number;
  createdAt?: string;
  lastEdited?: string;
  lastEditedBy?: string;
  createdBy?: string;
  countOfEdits?: number;
  rules: string[];
}

export interface TemplateSectionsPropsWithId extends TemplateSectionProps {
  id: string;
  parentSectionId: string;
  parentTemplateId: string;
}

export type TemplateSections = {
  [key: string]: TemplateSectionsPropsWithId;
};

export interface TemplatesProps {
  id?: string;
  name: string;
  score: number;
  lastEdited: string;
  description?: string;
  createdAt?: string;
  countOfEdits?: number;
  createdBy?: string;
  sections?: string;
  lastEditedBy?: string;
  sectionIds?: string[];
}

export interface TemplatesPropsWithId extends TemplatesProps {
  id: string;
}

export interface Templates {
  [key: string]: TemplatesPropsWithId;
}
