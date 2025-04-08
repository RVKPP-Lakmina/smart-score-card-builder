import { Sections } from "../../../types/responseTypes";
import sections from "../../configs/sections";

export const createSection = async (section: string) => {
  try {
    const configSections: Sections = sections as Sections;

    if (!section) {
      throw new Error("Section name is required");
    }

    const sectionId = section.toLowerCase().replace(/\s+/g, "-");

    if (Object.hasOwn(configSections, sectionId)) {
      throw new Error("Section already exists");
    }

    const data = {
      id: sectionId,
      name: section,
      createdAt: new Date().toISOString(),
      lastEdited: "",
      createdBy: "admin",
      lastEditedBy: "admin",
    } as Sections[string];

    configSections[sectionId] = data;

    return {
      status: 1,
      data: data,
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
