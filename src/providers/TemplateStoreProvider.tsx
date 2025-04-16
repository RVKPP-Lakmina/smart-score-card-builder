import { useCallback, useEffect, useState } from "react";
import TemplaterStoreContext from "../context/TemplateStoreContext";
import { Templates } from "../types/responseTypes";
import { useModal } from "../hooks/useModal";
import {
  cloneTemplateFrom,
  createTemplate,
  fetchTemplates,
  removeTemplate,
} from "../services/services";
import { templateParams } from "../types/requests";

const TemplateStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [templates, setTemplates] = useState<Templates>({} as Templates);
  const { openModal } = useModal();

  const getTemplates = useCallback(async () => {
    const response = await fetchTemplates();

    if (response) {
      setTemplates(response);
    }
  }, []);

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  const deleteTemplate = useCallback(async (templateId: string) => {
    const response = await removeTemplate(templateId);

    if (response === -1) return;

    setTemplates((prevTemplates) => {
      const newTemplates = { ...prevTemplates };
      delete newTemplates[templateId];
      return newTemplates;
    });
  }, []);

  const handleDelete = useCallback(
    (templateId: string) => {
      openModal({
        title: "Delete Template",
        childrenkey: "sampleDelete",
        footerProps: {
          handleDelete: async () => await deleteTemplate(templateId),
        },
        props: {
          message: "Are you sure you want to delete this template?",
          subMessage:
            "This action cannot be undone. Please confirm that you want to delete this.",
        },
      });
    },
    [deleteTemplate, openModal]
  );

  const hanldeSave = useCallback(async (templateData: templateParams) => {
    const response = await createTemplate(templateData);

    if (!response) return;

    setTemplates((prevTemplates) => ({
      ...prevTemplates,
      [response.id]: response,
    }));
  }, []);

  const createTemplte = useCallback(() => {
    openModal({
      title: "Create New Template",
      childrenkey: "createTemplate",
      props: {
        hanldeSave,
      },
    });
  }, [hanldeSave, openModal]);

  const handleCloneTemplate = useCallback(
    async (templateData: templateParams, templateId: string) => {
      const response = await cloneTemplateFrom(templateId, templateData);

      if (!response) return;

      setTemplates((prevTemplates) => ({
        ...prevTemplates,
        [response.id]: response,
      }));
    },
    []
  );

  const cloneTemplate = useCallback(
    (templateId: string) => {
      openModal({
        title: "Clone New Template From " + templates[templateId].name,
        childrenkey: "createTemplate",
        props: {
          hanldeSave: async (templateData: templateParams) =>
            await handleCloneTemplate(templateData, templateId),
        },
      });
    },
    [openModal, handleCloneTemplate, templates]
  );

  return (
    <TemplaterStoreContext.Provider
      value={{
        createTemplte,
        templates,
        handleDelete,
        cloneTemplate,
      }}
    >
      {children}
    </TemplaterStoreContext.Provider>
  );
};

export default TemplateStoreProvider;
