import React from "react";
import NewTemplateCard from "../../components/NewTemplateCard";
import TemplateCard from "../../components/TemplateCard";
import { Plus } from "lucide-react";
import Layout from "./Layout";
import Sections from "./sections/Page";
import TemplateStoreProvider from "../../providers/TemplateStoreProvider";
import useTemplateStore from "../../hooks/useTemplateStore";

function TemplatePage({
  handlePageChange,
}: {
  handlePageChange: (page: string) => void;
}) {
  const { createTemplte, templates } = useTemplateStore();
  const templateLen = Object.keys(templates).length;

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Templates</h3>
        {Boolean(templateLen) && (
          <button
            onClick={createTemplte}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
          >
            <Plus size={18} className="mr-2" />
            New Template
          </button>
        )}
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
        {Boolean(!templateLen) && <NewTemplateCard onClick={createTemplte} />}
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
    <TemplateStoreProvider>
      <Layout currPage={currPage} handlePageChange={handlePageChange}>
        {React.createElement(Build(currPage as string), {
          handlePageChange,
        })}
      </Layout>
    </TemplateStoreProvider>
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
