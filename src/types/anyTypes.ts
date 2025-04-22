export type ItemsDD = {
  id: string;
  name: string;
};

export type ItemsDDWithDescription = ItemsDD & {
  description?: string;
  createdAt?: string;
  lastEdited?: string;
  lastEditedBy?: string;
  createdBy?: string;
  countOfEdits?: number;
};
