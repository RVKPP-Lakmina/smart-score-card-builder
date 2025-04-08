import { templateParams } from "../types/requests";
import { TemplatesProps, TemplatesPropsWithId } from "../types/responseTypes";
import {
  cloneTemplate,
  deleteTemplate,
  saveTemplate,
} from "./api/templateApis";

export const createTemplate = async (template: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await saveTemplate(template as TemplatesProps);

    if (response.status === 1 && "data" in response && response.data) {
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
