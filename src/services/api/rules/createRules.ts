import generateUniqueId from "../../../lib/generateUniqueId";
import { TemplateSectionsPropsWithId } from "../../../types/responseTypes";
import { ReqRule, RuleWithId } from "../../../types/rules";
import rulesList from "../../configs/sampleRules";
import rules from "../../configs/section-Rules";
import { getTemplateSectionById } from "../section/getTemplaterSection";
import { updateSection } from "../section/updateSection";

export const createRules = async (
  sectionId: string,
  ruleIds?: string[],
  rule?: ReqRule
) => {
  try {
    if (!sectionId) {
      throw new Error("Section ID is required");
    }

    if (!ruleIds && !rule) {
      throw new Error("Rule ID or Rule data is required");
    }

    const section = await getTemplateSectionById(sectionId);

    if (section.status !== 1 || !("data" in section)) {
      throw new Error("Section not found");
    }

    if (ruleIds) {
      const addedRulesList = ruleIds.map((ruleId) =>
        MapRulesToSection(section.data, ruleId)
      );
      const addedRules = await Promise.all(addedRulesList);

      return {
        status: 1,
        data: addedRules.map((rule) => rule.data),
      } as {
        status: number;
        data: RuleWithId[];
      };
    }

    if (rule) {
      if (!rule.name) {
        throw new Error("Rule name is required");
      }

      const id: string = rule.name.toUpperCase().replace(/\s+/g, "_");

      rulesList[id] = {
        id,
        name: rule.name,
        description: rule?.description || "",
        type: "number",
        min: 0,
        max: 100,
        score: 0,
        seleted: false,
        required: true,
        properties: [],
      };

      return await MapRulesToSection(section.data, id);
    }
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

const MapRulesToSection = async (
  section: TemplateSectionsPropsWithId,
  ruleId: string
) => {
  try {
    const rule = rulesList[ruleId];

    if (!rule) {
      throw new Error("Rule not found");
    }

    const item = section.rules.find((item) => item === ruleId);

    if (item) {
      return {
        status: 1,
        data: item,
      } as {
        status: number;
        data: string;
      };
    }

    const id = generateUniqueId();

    const data: RuleWithId = {
      id,
      name: rule.name,
      lastEdited: "",
      createdAt: new Date().toISOString(),
      createdBy: "system",
      lastEditedBy: "",
      parentSectionId: section.id,
      parentTemplateId: section.parentTemplateId,
      parentRuleId: ruleId,
      properties: [],
    };

    rules[id] = data;

    localStorage.setItem("rules", JSON.stringify(rules));

    section.rules.push(id);

    await updateSection(section.id, section);

    return {
      status: 1,
      data: {
        ...data,
        id,
      },
    } as {
      status: number;
      data: RuleWithId;
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
