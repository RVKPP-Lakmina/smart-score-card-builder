import {
  Templates,
  TemplatesProps,
  TemplatesPropsWithId,
} from "../../types/responseTypes";
import templates from "../configs/templates";

const getCurrentTemplate = async (
  id: string
): Promise<TemplatesPropsWithId> => {
  const templatesList: Templates = await getAllTemplates();
  const thisTemplate: TemplatesPropsWithId = templatesList[id];

  if (!thisTemplate) {
    throw new Error("Template not found");
  }

  return thisTemplate;
};

export const getAllTemplates = async (): Promise<Templates> => {
  const response: Templates = templates;

  return response;
};

export const getTemplateById = async (id: string) => {
  try {
    const template: TemplatesPropsWithId = await getCurrentTemplate(id);
    return {
      status: 1,
      message: "Templates fetched successfully",
      data: template,
    } as {
      status: number;
      message: string;
      data: TemplatesPropsWithId;
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

export const saveTemplate = async (template: TemplatesProps) => {
  try {
    if (!template.name) {
      throw new Error("Template name is required");
    }

    const id: string = template.name.toUpperCase().replace(/\s+/g, "_");

    const templatesList: Templates = await getAllTemplates();

    if (Object.hasOwn(templatesList, id)) {
      throw new Error("Template already exists");
    }

    template.createdAt = new Date().toISOString();

    templates[id] = {
      id,
      ...template,
    };

    return {
      status: 1,
      message: "Template created successfully",
      data: templates[id],
    } as {
      status: number;
      message: string;
      data: TemplatesPropsWithId;
    };
  } catch (error) {
    return {
      status: -1,
      message: (error as Error).message,
    };
  }
};

export const updateTemplate = async (template: TemplatesPropsWithId) => {
  try {
    const thisTemplate: TemplatesPropsWithId = await getCurrentTemplate(
      template.id
    );

    if (!thisTemplate) {
      throw new Error("Template not found");
    }

    delete (template as Partial<TemplatesPropsWithId>).id;

    const changedKeys: string[] = Object.keys(
      template as TemplatesProps
    ).filter((key: string) => {
      if (
        !Object.hasOwn(thisTemplate, key) ||
        template[key as keyof TemplatesProps] !==
          thisTemplate[key as keyof TemplatesProps]
      ) {
        return key;
      }
    });

    if (!changedKeys.length) {
      return {
        status: 0,
        message: "No changes made",
      } as {
        status: number;
        message: string;
      };
    }

    const updatedTemplate: TemplatesPropsWithId = {
      ...thisTemplate,
      ...template,
      lastEdited: new Date().toISOString(),
      countOfEdits: thisTemplate.countOfEdits
        ? thisTemplate.countOfEdits + 1
        : 1,
    };

    templates[template.id] = updatedTemplate;

    return {
      status: 1,
      message: "Template updated successfully",
      data: updatedTemplate,
    } as {
      status: number;
      message: string;
      data: TemplatesPropsWithId;
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

export const deleteTemplate = async (id: string) => {
  try {
    const templatesList: Templates = await getAllTemplates();

    if (!Object.hasOwn(templatesList, id)) {
      throw new Error("Template not found");
    }

    delete templates[id];

    return {
      status: 1,
      message: "Template deleted successfully",
    } as {
      status: number;
      message: string;
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

export const cloneTemplate = async (
  cloneFromId: string,
  newItem: { name: string; description?: string }
) => {
  try {
    if (!cloneFromId) {
      throw new Error("Template id is required to clone template");
    }

    if (!newItem.name) {
      throw new Error("Template name is required");
    }

    const thisTemplate: TemplatesPropsWithId = await getCurrentTemplate(
      cloneFromId
    );

    const { name: newItemName, description = "" } = newItem;

    const id: string = newItemName.toUpperCase().replace(/\s+/g, "_");

    const newTemplate: TemplatesPropsWithId = {
      ...thisTemplate,
      id,
      name: newItemName,
      description,
      createdAt: new Date().toISOString(),
      lastEdited: "",
      countOfEdits: 0,
      score: 0,
      createdBy: "user",
    };

    templates[id] = newTemplate;

    return {
      status: 1,
      message: "Template cloned successfully",
      data: newTemplate,
    } as {
      status: number;
      message: string;
      data: TemplatesPropsWithId;
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
