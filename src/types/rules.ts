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
