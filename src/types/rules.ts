export interface ReqRule {
  name: string;
  description: string;
  score: number;
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
  properties: [];
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
