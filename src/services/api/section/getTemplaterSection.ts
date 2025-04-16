import { TemplateSections } from "../../../types/responseTypes";

export const getTemplateSections = async (sectionIds: string[]) => {
  try {
    const selectedSections: TemplateSections = {};
    const notFoundSections: string[] = [];

    const response = localStorage.getItem("templateSections");
    const sectionsList = response ? JSON.parse(response) : {};

    sectionIds.forEach((sectionId: string) => {
      if (Object.hasOwn(sectionsList, sectionId)) {
        selectedSections[sectionId] = sectionsList[sectionId];
      } else {
        notFoundSections.push(sectionId);
      }
    });

    if (sectionIds.length && sectionIds.length === notFoundSections.length) {
      throw new Error("No sections found");
    }

    return {
      status: 1,
      data: selectedSections,
    } as {
      status: number;
      data: TemplateSections;
    };
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

export const getTemplateSectionById = async (sectionId: string) => {
  try {
    const response = localStorage.getItem("templateSections");
    const sectionsList = response ? JSON.parse(response) : {};
    const section = sectionsList[sectionId];

    if (!section) {
      throw new Error("Section not found");
    }

    return {
      status: 1,
      data: section,
    } as {
      status: number;
      data: TemplateSections[string];
    };
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
