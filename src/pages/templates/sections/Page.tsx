import { Plus } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
import NewTemplateCard from "../../../components/NewTemplateCard";
import React from "react";
import SectionStoreProvider from "../../../providers/SectionStoreProvider";
import useSectionStore from "../../../hooks/useSectionStore";

interface SectionsProps {
  handlePageChange?: (page: string) => void;
  paramRef: React.RefObject<Record<string, unknown>>;
}

const Sections = () => {
  const { sections, createTemplte } = useSectionStore();
  const sectionsLen = Object.keys(sections).length;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Sections Configuration</h3>
        {Boolean(sectionsLen) && (
          <button
            onClick={createTemplte}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
          >
            <Plus size={18} className="mr-2" />
            New Section
          </button>
        )}
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6 min-h-52 py-5 pr-5"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {Object.entries(sections).map(([key, value]) => (
          <SectionCard key={key} title={value.name} id={value.id} />
        ))}

        {Boolean(!sectionsLen) && (
          <NewTemplateCard
            title={"Create New Section"}
            onClick={createTemplte}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(
  (props: SectionsProps) => {
    return (
      <SectionStoreProvider
        templateId={props.paramRef.current?.templateId as string}
      >
        <Sections />
      </SectionStoreProvider>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.paramRef.current !== nextProps.paramRef.current;
  }
);
