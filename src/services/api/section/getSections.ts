import { Sections } from "../../../types/responseTypes";
import sections from "../../configs/sections";

export const getSections = async () => {
  try {
    const configSections = sections as Sections;

    return {
      status: 1,
      data: configSections,
    } as {
      status: number;
      data: Sections;
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

export const getSectionById = async (sectionId: string) => {
  try {
    const configSections = sections as Sections;
    const section = configSections[sectionId];

    if (!section) {
      throw new Error("Section not found");
    }

    return {
      status: 1,
      data: section,
    } as {
      status: number;
      data: Sections[string];
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
