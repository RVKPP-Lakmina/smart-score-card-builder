import {
  ExportLine,
  TemplateSectionsPropsWithId,
} from "../../../types/responseTypes";
import { RuleWithId } from "../../../types/rules";
import { getSectionRules } from "../rules/getSectionRules";
import { getTemplateSections } from "../section/getTemplaterSection";
import { getTemplateById } from "../templateApis";

export const exportFullLine = async (templateId: string) => {
  try {
    const template = await getTemplateById(templateId);

    if (template.status !== 1 || !("data" in template) || !template.data) {
      throw new Error("Template not found");
    }

    const sections = await getTemplateSections(template.data.sectionIds || []);

    if (sections.status !== 1 || !("data" in sections) || !sections.data) {
      throw new Error("Sections not found");
    }

    const rulesList = await Promise.all(
      Object.keys(sections.data).map((key) => getSectionRules(key))
    );

    const sectionRules: Record<string, RuleWithId[]> = {};

    rulesList.forEach((rule, index) => {
      if (rule.status !== 1 || !("data" in rule) || !rule.data) {
        throw new Error(`Rules not found for section ${index}`);
      }

      if (rule.data.length) {
        sectionRules[rule.data[0].parentSectionId] = rule.data;
      }
    });

    const data = {
      [templateId]: {
        ...template.data,
        sections: Object.entries(sections.data).reduce(
          (
            acc,
            [key, section]
          ): Record<
            string,
            TemplateSectionsPropsWithId & { ruleEntries: RuleWithId[] }
          > => {
            acc[key] = {
              ...section,
              ruleEntries: sectionRules[key] ?? [],
            };
            return acc;
          },
          {} as Record<
            string,
            TemplateSectionsPropsWithId & { ruleEntries: RuleWithId[] }
          >
        ),
      },
    };

    return {
      status: 1,
      data: data as ExportLine,
    } as {
      status: number;
      data: ExportLine;
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
