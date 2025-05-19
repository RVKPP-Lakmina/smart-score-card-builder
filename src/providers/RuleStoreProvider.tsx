import React, { useEffect } from "react";
import RuleContext from "../context/RuleContext";
import { RuleContextProps } from "../types/ruleStore";
import { TemplateSections } from "../types/responseTypes";
import { RuleWithId } from "../types/rules";
import { fetchSectionRules } from "../services/services";
import Spinner from "../components/ui/Loader";

interface RuleStoreProviderProps {
  children: React.ReactNode;
  templateId: string;
  section: TemplateSections[string];
}

const RuleStoreProvider: React.FC<RuleStoreProviderProps> = ({
  children,
  section,
}: RuleStoreProviderProps) => {
  const [list, setList] = React.useState([] as RuleWithId[]);
  const [, setPrevList] = React.useState([] as RuleWithId[]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    (async () => {
      try {
        const responses = await fetchSectionRules(section.id);

        if (responses) {
          setList(responses);
          setPrevList(responses);
        }
      } catch (error) {
        console.error("Error fetching rules:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [section]);

  // const handleSaveRules = async (rules: RuleWithId[]) => {};

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <RuleContext.Provider
      value={
        {
          templateId: section.parentTemplateId,
          sectionId: section.id,
          rules: list,
        } as RuleContextProps
      }
    >
      {children}
    </RuleContext.Provider>
  );
};

export default RuleStoreProvider;
