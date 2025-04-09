import React, { useCallback, useEffect } from "react";
import SectionStoreContext from "../context/SectionStoreContext";
import { Templates, TemplateSections } from "../types/responseTypes";
import { getSelectedSections } from "../services/services";
import useTemplateStore from "../hooks/useTemplateStore";
import { useModal } from "../hooks/useModal";

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
  const { templates } = useTemplateStore();
  const currTemplate: Templates[string] = React.useMemo(
    () => templates[templateId],
    [templates, templateId]
  );
  const { openModal } = useModal();

  const getSections = () => {};

  const getTemplateSections = useCallback(async () => {
    const response = await getSelectedSections(currTemplate?.sectionIds || []);
    if (response) {
      setSections(response as TemplateSections);
    }
  }, [currTemplate?.sectionIds]);

  const preInitializer = useCallback(async () => {
    await Promise.all([getSections(), getTemplateSections()]);
  }, [getTemplateSections]);

  useEffect(() => {
    preInitializer();
  }, [preInitializer]);

  const createTemplte = useCallback(() => {
    openModal({
      title: "Create New Section",
      childrenkey: "createSection",
      size: "xl",
    });
  }, [openModal]);

  return (
    <SectionStoreContext.Provider value={{ sections, createTemplte }}>
      {children}
    </SectionStoreContext.Provider>
  );
};

export default SectionStoreProvider;
