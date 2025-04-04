import React, { useCallback } from "react";
import NewTemplateCard from "../../components/NewTemplateCard";
import TemplateCard from "../../components/TemplateCard";
import templates from "../../services/configs/templates";
import { Plus } from "lucide-react";
import moment from "moment";
import { useModal } from "../../hooks/useModal";
import Layout from "./Layout";
import Sections from "./sections/Page";

function TemplatePage({
  handlePageChange,
}: {
  handlePageChange: (page: string) => void;
}) {
  const { openModal } = useModal();

  const hanldeSave = useCallback(
    async (templateData: { name: string; description: string }) => {
      if (!templateData.name) {
        return alert("Please enter a name for the template.");
      }

      const data = {
        id: Math.floor(Math.random() * 10000),
        name: templateData.name,
        description: templateData.description,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        lastEdited: "",
        countOfEdits: 0,
        createdBy: "User",
      };

      templates[data.id] = data;
      new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Template created successfully!");
    },
    []
  );

  const createTemplte = useCallback(() => {
    openModal({
      title: "Create New Template",
      childrenkey: "createTemplate",
      props: {
        hanldeSave,
      },
    });
  }, [hanldeSave, openModal]);
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Templates</h3>
        <button
          onClick={createTemplte}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
        >
          <Plus size={18} className="mr-2" />
          New Template
        </button>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-52 py-5 pr-5"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {Object.entries(templates).map(([key, template]) => (
          <TemplateCard
            key={key}
            template={template}
            onClickLable={() => handlePageChange("sections")}
          />
        ))}

        <NewTemplateCard onClick={createTemplte} />
      </div>
    </>
  );
}

export default React.memo(() => {
  const [currPage, setCurrPage] = React.useState<string | undefined>(undefined);

  const handlePageChange = (page: string) => {
    setCurrPage(page);
  };

  return (
    <Layout currPage={currPage} handlePageChange={handlePageChange}>
      {React.createElement(Build(currPage as string), {
        handlePageChange,
      })}
    </Layout>
  );
});

const Build = (page: string) => {
  switch (page) {
    case "sections":
      return Sections;
    case "templates":
      return TemplatePage;
    default:
      return TemplatePage;
  }
};
