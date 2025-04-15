import { ItemsDD } from "../types/anyTypes";
import { templateParams } from "../types/requests";
import {
  Sections,
  TemplateSections,
  TemplatesProps,
  TemplatesPropsWithId,
} from "../types/responseTypes";
import { getRules } from "./api/rules/getRules";
import { createTemplateSection } from "./api/section/createTemplateSection";
import { getSections } from "./api/section/getSections";
import { getTemplateSections } from "./api/section/getTemplaterSection";
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
    const response = await getSections();

    if (response.status === 1 && "data" in response && response.data) {
      return response.data as Sections;
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
    const response = await createTemplateSection(templateId, {}, sectionIds);

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
