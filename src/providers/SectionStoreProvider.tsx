import React, { useCallback, useEffect, useMemo } from "react";
import SectionStoreContext from "../context/SectionStoreContext";
import {
  Templates,
  TemplateSections,
  TemplatesPropsWithId,
} from "../types/responseTypes";
import {
  addNewTemplateSection,
  createSectionRules,
  deleteRule,
  getAllSections,
  getRawRules,
  getSelectedSections,
} from "../services/services";
import useTemplateStore from "../hooks/useTemplateStore";
import { useModal } from "../hooks/useModal";
import { ItemsDD } from "../types/anyTypes";
import { UseCreateNewSectionsProps } from "../types/section";
import { getSectionRules } from "../services/api/rules/getSectionRules";
import { RuleWithId } from "../types/rules";

type CreateNewSectionProps = {
  newSectionVisible: boolean;
  ids: string[];
};

const SectionStoreProvider = ({
  children,
  templateId,
  handlePageChange,
  paramRef,
}: {
  children: React.ReactNode;
  templateId: string;
  handlePageChange?: (page: string) => void;
  paramRef: React.RefObject<Record<string, unknown>>;
}) => {
  const [sections, setSections] = React.useState<TemplateSections>(
    {} as TemplateSections
  );
  const [rawSections, setRawSections] = React.useState<ItemsDD[]>(
    [] as ItemsDD[]
  );
  const [rawRules, setRawRules] = React.useState<ItemsDD[]>([] as ItemsDD[]);
  const [sectionRules, setSectionRules] = React.useState<
    Record<string, RuleWithId[]>
  >({} as Record<string, RuleWithId[]>);
  const { templates } = useTemplateStore();
  const currTemplate: Templates[string] = React.useMemo(
    () => templates[templateId],
    [templates, templateId]
  );
  const { openModal, closeModal } = useModal();
  const createNewSectionDataRef = React.useRef<CreateNewSectionProps>(
    {} as CreateNewSectionProps
  );
  const [selectedVariables, setSelectedVariables] = React.useState<{
    current: string[];
  }>({
    current: [],
  });
  const [, setChangeDetect] = React.useState<number>(1);

  const getSections = async () => {
    const response = await getAllSections();

    if (response) {
      setRawSections(
        Object.entries(response).map(([key, value]) => ({
          id: key,
          name: value.name,
        }))
      );
    }
  };

  const getTemplateSections = useCallback(async () => {
    const response = await getSelectedSections(currTemplate?.sectionIds || []);
    if (response) {
      setSections(response as TemplateSections);

      const result = await Promise.allSettled(
        Object.entries(response).map(([, value]) => getSectionRules(value.id))
      ).then((results) => {
        return results.map((result) => {
          if (result.status === "fulfilled") {
            return result.value.data as RuleWithId[];
          } else {
            console.error("Error fetching section rules:", result.reason);
            return undefined;
          }
        });
      });

      const rules: Record<string, RuleWithId[]> = {};

      result.forEach((ruleList, index) => {
        if (ruleList) {
          const sectionId = Object.keys(response)[index];
          rules[sectionId] = ruleList as RuleWithId[];
        }
      });

      setSectionRules(rules as Record<string, RuleWithId[]>);
    }
  }, [currTemplate?.sectionIds]);

  const getSampleRules = useCallback(async () => {
    const getRules = await getRawRules();

    if (getRules) {
      setRawRules(getRules as ItemsDD[]);
    }
  }, []);

  const preInitializer = useCallback(async () => {
    await Promise.all([getSections(), getTemplateSections(), getSampleRules()]);
  }, [getTemplateSections, getSampleRules]);

  useEffect(() => {
    preInitializer();
  }, [preInitializer]);

  const hanldeSaveCreatedSection = useCallback(async () => {
    // if (!createNewSectionDataRef.current.newSectionVisible) {
    //   return;
    // }

    if (createNewSectionDataRef.current.ids) {
      const { ids } = createNewSectionDataRef.current;
      const selectedSections = await addNewTemplateSection(templateId, ids);

      if (selectedSections) {
        const idMap = selectedSections.map((item) => item.parentSectionId);
        setSelectedVariables({
          current: idMap,
        });
        setChangeDetect((prev) => prev + 1);
      }
    }

    closeModal();
  }, [closeModal, templateId]);

  const saveSectionBulkRules = useCallback(
    async (sectionId: string, ruleIds: string[]) => {
      const response: RuleWithId[] | undefined = await createSectionRules(
        sectionId,
        ruleIds
      );
      if (response) {
        const updatedRules = { ...sectionRules };
        updatedRules[sectionId] = response;
        setSectionRules(updatedRules);
      }
    },
    [sectionRules]
  );

  const createTemplte = useCallback(() => {
    openModal({
      title: "Create New Section",
      childrenkey: "createSection",
      size: "2xl",
      props: {
        onSave: hanldeSaveCreatedSection,
        useSectionStore: () => ({
          sections,
          createTemplte,
          rawSections,
          useCreateNewSections,
        }),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hanldeSaveCreatedSection, openModal, rawSections, sections]);

  const useCreateNewSections: () => UseCreateNewSectionsProps = () => {
    const [isNewSection, setIsNewSection] = React.useState<boolean>(false);

    useEffect(() => {
      if (isNewSection !== createNewSectionDataRef.current.newSectionVisible) {
        createNewSectionDataRef.current.newSectionVisible = isNewSection;
      }
    }, [isNewSection]);

    const toggleNewSection = useMemo(
      () => ({
        get: () => isNewSection,
        set: setIsNewSection,
      }),
      [isNewSection]
    );
    const onCheckedChange = useCallback((ids: string[]) => {
      setSelectedVariables({ current: ids.map((id) => id) });
      createNewSectionDataRef.current.ids = ids;
    }, []);

    return {
      selectedVariables,
      onCheckedChange,
      toggleNewSection,
    };
  };

  const handleDeleteRuleItem = useCallback(async (rule: RuleWithId) => {
    const res = await deleteRule(rule.id, rule.parentSectionId);

    if (res) {
      const { data } = res;

      setSectionRules((prevRules: Record<string, RuleWithId[]>) => {
        const updatedRules = { ...prevRules };
        const sectionId = rule.parentSectionId;
        const ruleIndex = updatedRules[sectionId]?.findIndex(
          (item) => item.id === rule.id
        );

        if (ruleIndex !== undefined && ruleIndex >= 0) {
          updatedRules[sectionId].splice(ruleIndex, 1);
        }
        return updatedRules;
      });

      setSections((prevSections: TemplateSections) => {
        if (prevSections[rule.parentSectionId]) {
          return {
            ...prevSections,
            [rule.parentSectionId]: data.templateSection,
          };
        }
        return prevSections;
      });
    }
  }, []);

  const changePageToRules = useCallback(
    (section: TemplatesPropsWithId) => {
      handlePageChange?.("characteristics");
      paramRef.current = {
        ...paramRef.current,
        section: section,
      };
      setChangeDetect((prev) => prev + 1);
    },
    [handlePageChange, paramRef]
  );

  return (
    <SectionStoreContext.Provider
      value={{
        sections,
        createTemplte,
        rawSections,
        useCreateNewSections,
        sectionRules,
        rawRules,
        saveSectionBulkRules,
        handleDeleteRuleItem,
        templateId,
        changePageToRules,
      }}
    >
      {children}
    </SectionStoreContext.Provider>
  );
};

export default SectionStoreProvider;
