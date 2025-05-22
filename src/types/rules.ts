export interface ReqRule {
  name: string;
  description: string;
  score: number;
}
export interface Properties {
  name: string;
  id: string;
  score: number;
}
export interface Rule {
  name: string;
  lastEdited: string;
  createdAt: string;
  score?: string;
  sectionWeight?: number;
  modelWeight?: number;
  createdBy: string;
  lastEditedBy: string;
  parentSectionId: string;
  parentTemplateId: string;
  parentRuleId: string;
  properties: Properties[];
}
export type RuleWithId = Rule & {
  id: string;
};
export interface Rules {
  [key: string]: Rule;
}
export interface RulesWithId {
  [key: string]: RuleWithId;
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface PropertiesEnhanced {
  id: string;
  name: string;
  label: string;
  min?: number;
  max?: number;
  score: number;
  value?: string;
}

export type PropertiesMap = {
  [key: string]: PropertiesEnhanced[];
};

export interface RuleEnhanced {
  name: string;
  description: string;
  lastEdited: string;
  createdAt: string;
  score?: string;
  sectionWeight?: number;
  modelWeight?: number;
  createdBy: string;
  lastEditedBy: string;
  parentSectionId: string;
  parentTemplateId: string;
  type: "numericRange" | "masterData" | "singleValue";
  parentRuleId: string;
  properties: PropertiesEnhanced[];
}

export interface RulesEnhaced {
  [key: string]: RuleEnhanced;
}

export type RuleEnhancedWithId = RuleEnhanced & {
  id: string;
};

export interface RulesWithIdEnhanced {
  [key: string]: RuleWithId;
}
