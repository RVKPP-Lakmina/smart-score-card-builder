import generateUniqueId from "../../../lib/generateUniqueId";
import {
  Sections,
  TemplateSections,
  TemplatesPropsWithId,
} from "../../../types/responseTypes";
import templateSections from "../../configs/template-sections";
import { getTemplateById, updateTemplate } from "../templateApis";
import { createSection } from "./createSection";
import { getSectionById } from "./getSections";

export const createTemplateSection = async (
  templateId: string,
  section: {
    id?: string;
    name?: string;
    newSection?: boolean;
  }
) => {
  try {
    const template = await getTemplateById(templateId);

    if (template.status !== 1 || !template.data) {
      throw new Error("Template not found");
    }

    if (!section?.id && !section?.name) {
      throw new Error("Section ID or name is required");
    }

    if (section?.id) {
      return await mapExisitingSectionToTemplate({
        section: { id: section.id },
        template: template.data,
      });
    } else if (section?.newSection) {
      if (!section.name) {
        throw new Error("Section name is required");
      }

      const response = await createSection(section.name);

      if (response.status !== 1 || !("data" in response && response.data)) {
        throw new Error("Error creating section");
      }

      const { data }: { data: Sections[string] } = response;

      return await mapExisitingSectionToTemplate({
        section: { id: data.id },
        template: template.data,
      });
    }
  } catch (error) {
    return {
      status: -1,
      message: (error as Error).message,
    } as {
      status: number;
      message: string;
    };
  }
};

type MapExisitingSectionToTemplateProps = {
  template: TemplatesPropsWithId;
  section: {
    id: string;
  };
};

const mapExisitingSectionToTemplate = async ({
  section,
  template,
}: MapExisitingSectionToTemplateProps) => {
  const data: TemplatesPropsWithId = template as TemplatesPropsWithId;

  const sectionItem: {
    status: number;
    data?: Sections[string];
  } = await getSectionById(section.id);

  if (sectionItem.status !== 1 || !sectionItem.data) {
    throw new Error("Section not found");
  }

  const id: string = generateUniqueId();
  templateSections[id] = {
    id,
    parentId: template.id,
    name: sectionItem.data.name,
    description: "",
    overallWeight: 0,
    sectionWeight: 0,
    createdAt: new Date().toISOString(),
    lastEdited: "",
    createdBy: "admin",
    lastEditedBy: "admin",
    countOfEdits: 0,
    rules: [],
  };

  data.sectionIds = [...(data.sectionIds || []), id];

  const response = await updateTemplate(data);

  if (response.status !== 1) {
    throw new Error("Error updating template sections");
  }

  return {
    status: 1,
    data: templateSections[id],
  } as {
    status: number;
    data: TemplateSections[string];
  };
};
