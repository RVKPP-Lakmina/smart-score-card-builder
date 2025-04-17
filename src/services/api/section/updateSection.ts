import { TemplateSections } from "../../../types/responseTypes";
import { getTemplateSectionById } from "./getTemplaterSection";

export const updateSection = async (
  sectionId: string,
  updatedSection: TemplateSections[string]
) => {
  try {
    const response = await getTemplateSectionById(sectionId);

    if (response.status !== 1 || !("data" in response)) {
      throw new Error("Section not found");
    }

    let sectionData: TemplateSections[string] =
      response.data as TemplateSections[string];

    sectionData = {
      ...sectionData,
      ...updatedSection,
      lastEdited: new Date().toISOString(),
      lastEditedBy: "user",
      countOfEdits: (sectionData?.countOfEdits || 0) + 1,
    } as TemplateSections[string];

    const sectionsList = localStorage.getItem("templateSections");
    const parsedSectionsList = sectionsList ? JSON.parse(sectionsList) : {};
    parsedSectionsList[sectionId] = sectionData;
    localStorage.setItem(
      "templateSections",
      JSON.stringify(parsedSectionsList)
    );
    return {
      status: 1,
      data: sectionData,
    } as {
      status: number;
      data: TemplateSections[string];
    };
  } catch (error) {
    return {
      status: -1,
      message: (error as Error).message,
      data: undefined,
    } as {
      status: number;
      message: string;
      data: undefined;
    };
  }
};
