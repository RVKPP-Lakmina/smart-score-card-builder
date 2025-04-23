import generateUniqueId from "../../../lib/generateUniqueId";
import {
  TemplateSections,
  TemplatesPropsWithId,
} from "../../../types/responseTypes";
import { getTemplateById, updateTemplate } from "../templateApis";
import { createSection } from "./createSection";
import { getSectionById, getSections } from "./getSections";

export const createTemplateSection = async (
  templateId: string,
  section?: { id?: string; name?: string; newSection?: boolean },
  sectionIds?: string[]
) => {
  try {
    if (!templateId) throw new Error("Template not found");
    if (!section?.id && !section?.name && !sectionIds?.length)
      throw new Error("Section or sectionIds is required");

    const [templateResponse, sectionsResponse] = await Promise.all([
      getTemplateById(templateId),
      getSections(),
    ]);

    if (templateResponse.status !== 1 || !templateResponse.data)
      throw new Error("Template not found");

    if (sectionsResponse.status !== 1 || !sectionsResponse.data)
      throw new Error("Sections not found");

    const template = templateResponse.data;

    if (sectionIds?.length) {
      const mappedSections = await Promise.all(
        sectionIds.map((id) =>
          mapExistingSectionToTemplate({ section: { id }, template })
        )
      );

      const validSections = mappedSections.filter((res) => res.status !== -1);

      return {
        status: 1,
        data: validSections.map((res) => res.data),
      };
    }

    if (section?.id) {
      return mapExistingSectionToTemplate({
        section: { id: section.id },
        template,
      });
    }

    if (section?.name) {
      const createResponse = await createSection(section.name);

      if (
        createResponse.status !== 1 ||
        !("data" in createResponse && createResponse.data)
      )
        throw new Error("Error creating section");

      return mapExistingSectionToTemplate({
        section: { id: createResponse.data.id },
        template,
      });
    }

    throw new Error("Invalid section input");
  } catch (error) {
    return {
      status: -1,
      message: (error as Error).message,
    };
  }
};

type MapExistingSectionToTemplateProps = {
  template: TemplatesPropsWithId;
  section: { id: string };
};

const mapExistingSectionToTemplate = async ({
  section,
  template,
}: MapExistingSectionToTemplateProps) => {
  const sectionResponse = await getSectionById(section.id);

  if (
    sectionResponse.status !== 1 ||
    !("data" in sectionResponse) ||
    !sectionResponse.data
  )
    throw new Error("Section not found");

  const sectionData = sectionResponse.data;
  const id = generateUniqueId();

  const newTemplateSection: TemplateSections[string] = {
    id,
    parentSectionId: section.id,
    parentTemplateId: template.id,
    name: sectionData.name,
    description: "",
    overallWeight: Number((Math.random() * 10).toFixed(2)),
    sectionWeight: Number((Math.random() * 10).toFixed(2)),
    createdAt: new Date().toISOString(),
    lastEdited: "",
    createdBy: "admin",
    lastEditedBy: "admin",
    countOfEdits: 0,
    rules: [],
  };

  const response = localStorage.getItem("templateSections");

  const templateSections: TemplateSections = response
    ? (JSON.parse(response) as TemplateSections)
    : {};

  templateSections[id] = newTemplateSection;

  localStorage.setItem("templateSections", JSON.stringify(templateSections));

  template.sectionIds = [...(template.sectionIds || []), id];

  const updateResponse = await updateTemplate(template);

  if (updateResponse.status !== 1)
    throw new Error("Error updating template sections");

  return {
    status: 1,
    data: newTemplateSection,
  };
};
