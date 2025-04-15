import { ItemsDD } from "../../../types/anyTypes";
import rulesList from "../../configs/sampleRules";

export const getRules = async () => {
  try {
    const response = await rulesList;

    const list = Object.values(response).map((rule) => ({
      id: rule.id,
      name: rule.name,
    }));

    return {
      status: 1,
      data: list,
    } as {
      status: number;
      data: ItemsDD[];
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

export const getRuleById = async (ruleId: string) => {
  try {
    const response = await rulesList;
    const rule = response[ruleId];

    if (!rule) {
      throw new Error("Rule not found");
    }

    return {
      status: 1,
      data: rule,
    } as {
      status: number;
      data: (typeof rulesList)[string];
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
