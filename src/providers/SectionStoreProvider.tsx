import React, { useCallback, useEffect, useMemo } from "react";
import SectionStoreContext from "../context/SectionStoreContext";
import { Templates, TemplateSections } from "../types/responseTypes";
import {
  addNewTemplateSection,
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
}: {
  children: React.ReactNode;
  templateId: string;
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
  const selectedVariablesRef = React.useRef<string[]>([]);
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
        selectedVariablesRef.current = idMap;
        setChangeDetect((prev) => prev + 1);
      }
    }

    closeModal();
  }, [closeModal, templateId]);

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
      selectedVariablesRef.current = ids.map((id) => id);
      createNewSectionDataRef.current.ids = ids;
    }, []);

    return {
      selectedVariablesRef,
      onCheckedChange,
      toggleNewSection,
    };
  };

  return (
    <SectionStoreContext.Provider
      value={{
        sections,
        createTemplte,
        rawSections,
        useCreateNewSections,
        sectionRules,
        rawRules,
      }}
    >
      {children}
    </SectionStoreContext.Provider>
  );
};

export default SectionStoreProvider;
