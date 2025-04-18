import { RuleWithId } from "../../../types/rules";
import { getTemplateSectionById } from "../section/getTemplaterSection";

export const getSectionRules = async (sectionId: string) => {
  try {
    const section = await getTemplateSectionById(sectionId);

    if (section.status !== 1 || !("data" in section)) {
      throw new Error("Section not found");
    }

    const rulesData = section.data.rules;

    if (!rulesData || rulesData.length === 0) {
      return {
        status: 1,
        data: [] as RuleWithId[],
      } as {
        status: number;
        data: RuleWithId[];
      };
    }

    const res: string | null = localStorage.getItem("rules");

    let response = res ? JSON.parse(res) : undefined;

    response = response ? response : {};

    if (!response) {
      throw new Error("Rules not found");
    }

    const rulesList: RuleWithId[] = [];

    rulesData.forEach((ruleId: string) => {
      const rule = response[ruleId];

      if (rule) {
        rulesList.push({
          ...rule,
          id: ruleId,
        });
      }
    });

    return {
      status: 1,
      data: rulesList,
    } as {
      status: number;
      data: RuleWithId[];
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

export const getSectionRuleById = async (ruleId: string) => {
  try {
    const res: string | null = localStorage.getItem("rules");

    const response = res ? JSON.parse(res) : ({} as Record<string, RuleWithId>);

    const rule = response[ruleId];

    if (!rule) {
      throw new Error("Rule not found");
    }

    return {
      status: 1,
      data: {
        ...rule,
        id: ruleId,
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
