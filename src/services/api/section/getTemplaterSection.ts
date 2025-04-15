import { TemplateSections } from "../../../types/responseTypes";
import sectionsList from "../../configs/template-sections";

export const getTemplateSections = async (sectionIds: string[]) => {
  try {
    const selectedSections: TemplateSections = {};
    const notFoundSections: string[] = [];

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
