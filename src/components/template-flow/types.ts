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

export interface Rule {
  name: string;
  lastEdited: string;
  createdAt: string;
  createdBy: string;
  lastEditedBy: string;
  parentSectionId: string;
  parentTemplateId: string;
  parentRuleId: string;
  properties: string[];
}
