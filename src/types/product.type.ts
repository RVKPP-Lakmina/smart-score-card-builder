export type CreateNewProduct = {
  name: string;
  description: string;
};

export type API = {
  id: string;
  name: string;
  type: "active" | "inactive" | "draft";
  status: "connected" | "failed" | "pending";
  curl: string;
  associatedTemplateId: string;
  associateSectionId: string;
};

export type ProductStatus = "active" | "inactive" | "draft";

export interface Product extends CreateNewProduct {
  createdAt: string;
  apis?: {
    [key: string]: API;
  };
  lastEdited: string;
  lastEditedBy: string;
  createdBy: string;
  countOfEdits: number;
  templateIds: {
    [key: string]: CreateNewProduct;
  }[];
  status: ProductStatus;
}

export interface ProductWithId extends Product {
  id: string;
}

export type Products = { [key: string]: ProductWithId };
