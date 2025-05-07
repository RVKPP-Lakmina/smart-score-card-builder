import axios from "axios";
import { ItemsDD } from "../types/anyTypes";
import { templateParams } from "../types/requests";
import {
  ExportLine,
  Section,
  Templates,
  TemplateSections,
  TemplatesProps,
  TemplatesPropsWithId,
} from "../types/responseTypes";
import { RuleWithId } from "../types/rules";
import { exportFullLine } from "./api/export/getFullLine";
import { createRules } from "./api/rules/createRules";
import { getRules } from "./api/rules/getRules";
import { getSectionRules } from "./api/rules/getSectionRules";
import { createTemplateSection } from "./api/section/createTemplateSection";
import { getTemplateSections } from "./api/section/getTemplaterSection";
import {
  cloneTemplate,
  deleteTemplate,
  getAllTemplates,
  saveTemplate,
} from "./api/templateApis";
import {
  CreateNewProduct,
  Products,
  ProductWithId,
} from "../types/product.type";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllProducts = async () => {
  try {
    // const response = await api.get("/products");
    const res = localStorage.getItem("products");

    const response = {
      status: 1,
      data: res ? JSON.parse(res) : {},
    };

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as Products;
    } else {
      alert("Error fetching all products:");
    }
  } catch (error) {
    alert("Error getting all products:" + (error as Error).message);
  }
};

export const updateProduct = async (id: string, product: CreateNewProduct) => {
  try {
    // const response = await api.put(`/products/${id}`, product);

    const res: string | null = localStorage.getItem("products");
    const products: Products = res ? JSON.parse(res) : {};

    if (products[id]) {
      products[id] = {
        ...products[id],
        ...product,
        lastEdited: new Date().toISOString(),
        lastEditedBy: "user",
        countOfEdits: products[id].countOfEdits + 1,
      };
      localStorage.setItem("products", JSON.stringify(products));
    }

    const response = {
      status: 1,
      data: products[id],
    };

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as ProductWithId;
    } else {
      alert("Error updating product:");
    }
  } catch (error) {
    alert("Error updating product:" + (error as Error).message);
  }
};

export const createProduct = async (product: CreateNewProduct) => {
  try {
    // const response = await api.post("/products", product);

    const data: ProductWithId = {
      id: product.name.replace(/\s+/g, "-").toUpperCase(),
      name: product.name,
      description: product.description,
      createdAt: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      lastEditedBy: "user",
      createdBy: "user",
      countOfEdits: 0,
      apis: {},
      templateIds: [],
      status: "active",
    };

    const res: string | null = localStorage.getItem("products");
    const products: Products = res ? JSON.parse(res) : {};
    products[data.id] = data;

    localStorage.setItem("products", JSON.stringify(products));

    const response = {
      status: 1,
      data: data,
    };

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as ProductWithId;
    } else {
      alert("Error creating product:");
    }
  } catch (error) {
    alert("Error creating product:" + (error as Error).message);
  }
};

export const fetchTemplates = async () => {
  try {
    const response = await getAllTemplates();

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as Templates;
    } else {
      alert("Error fetching templates:");
    }
  } catch (error) {
    alert("Error fetching templates:" + (error as Error).message);
  }
};

export const createTemplate = async (template: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await saveTemplate(template as TemplatesProps);

    if (response?.status === 1 && "data" in response && response.data) {
      alert("Template created successfully:");
      return response.data;
    } else {
      alert("Error creating template:");
    }
  } catch (error) {
    alert("Error creating template:" + (error as Error).message);
  }
};

export const removeTemplate = async (id: string) => {
  try {
    const response = await deleteTemplate(id);

    if (response.status === 1) {
      alert("Template deleted successfully:");
    } else {
      alert("Error deleting template:");
    }
    return response.status;
  } catch (error) {
    alert("Error deleting template:" + (error as Error).message);
    return -1;
  }
};

export const cloneTemplateFrom = async (
  templateId: string,
  newTemplate: templateParams
) => {
  try {
    const response = await cloneTemplate(templateId, newTemplate);

    if (response.status === 1 && "data" in response && response.data) {
      alert("Template cloned successfully:");
      return response.data as TemplatesPropsWithId;
    } else {
      alert("Error cloning template:");
    }
  } catch (error) {
    alert("Error cloning template:" + (error as Error).message);
  }
};

export const getSelectedSections = async (sectionIds: string[]) => {
  try {
    const response = await getTemplateSections(sectionIds);

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as TemplateSections;
    } else {
      alert("Error fetching selected sections:");
    }
  } catch (error) {
    alert("Error getting selected sections:" + (error as Error).message);
  }
};

export const getAllSections = async () => {
  try {
    const response = await api.get("/sections");

    console.log("Response:", response);

    if (response.status === 200 && "data" in response && response.data) {
      return response.data as Section[];
    } else {
      alert("Error fetching all sections:");
    }
  } catch (error) {
    alert("Error getting all sections:" + (error as Error).message);
  }
};

export const addNewTemplateSection = async (
  templateId: string,
  sectionIds: string[]
) => {
  try {
    const response = await api.post(`/templates-sections/${templateId}`, {
      sectionIds,
    });

    if (response.status === 1 && "data" in response && response.data) {
      alert("Template section added successfully:");
      return response.data as TemplateSections[string][];
    } else {
      alert("Error adding new template section:");
    }
  } catch (error) {
    alert("Error adding new template section:" + (error as Error).message);
  }
};

export const addNewSectionToTemplate = async (
  templateId: string,
  section: { id?: string; name?: string; newSection?: boolean }
) => {
  try {
    const response = await createTemplateSection(templateId, section);

    if (response.status === 1 && "data" in response && response.data) {
      alert("Template section added successfully:");
      return response.data as TemplateSections[string][];
    } else {
      alert("Error adding new template section:");
    }
  } catch (error) {
    alert("Error adding new template section:" + (error as Error).message);
  }
};

export const getRawRules = async () => {
  try {
    const response = await getRules();

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as ItemsDD[];
    } else {
      alert("Error fetching all Rules:");
    }
  } catch (error) {
    alert("Error getting all Rules:" + (error as Error).message);
  }
};

export const createSectionRules = async (
  sectionId: string,
  ruleIds: string[]
) => {
  try {
    const response = await createRules(sectionId, ruleIds);

    if (response?.status === 1 && "data" in response && response.data) {
      alert("Rules created successfully:");
      return (response.data as RuleWithId[]) || [];
    } else {
      alert("Error creating rules:");
    }
  } catch (error) {
    alert("Error getting all sections:" + (error as Error).message);
  }
};

export const fetchSectionRules = async (sectionId: string) => {
  try {
    const response = await getSectionRules(sectionId);

    if (response?.status === 1 && "data" in response && response.data) {
      return response.data as RuleWithId[];
    } else {
      alert("Error fetching section rules:");
    }
  } catch (error) {
    alert("Error fetching section rules:" + (error as Error).message);
  }
};

export const exportLine = async (templateId: string) => {
  try {
    const response = await exportFullLine(templateId);

    if (response?.status === 1 && "data" in response && response.data) {
      return response.data as ExportLine;
    }
  } catch (error) {
    alert("Error exporting full line:" + (error as Error).message);
  }
};
