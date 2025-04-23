import { Plus } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
import NewTemplateCard from "../../../components/NewTemplateCard";
import React, { useEffect } from "react";
import SectionStoreProvider from "../../../providers/SectionStoreProvider";
import useSectionStore from "../../../hooks/useSectionStore";
import { Sections, TemplateSections } from "../../../types/responseTypes";
import { Search } from "../../../components/ui/SearchBox";
import { EmptySearch } from "../../../components/ui/DataNotFound";

interface SectionsProps {
  handlePageChange?: (page: string) => void;
  paramRef: React.RefObject<Record<string, unknown>>;
}

const SectionsPage = () => {
  const { sections, createTemplte } = useSectionStore();
  const [list, setList] = React.useState({} as TemplateSections);
  const sectionsLen = Object.keys(sections).length;

  useEffect(() => {
    setList(sections as TemplateSections);
  }, [sections]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let filteredItems = { ...sections };

    if (value) {
      const filteredSections: Sections = {};
      Object.entries(sections).forEach(([key, section]) => {
        if (section.name.toLowerCase().includes(value.toLowerCase())) {
          filteredSections[key] = section;
        }
      });

      filteredItems = { ...filteredSections };
    }

    setList(filteredItems as TemplateSections);
  };

  const onClear = () => {
    setList(sections as TemplateSections);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Sections Configuration</h3>
        {Boolean(sectionsLen) && (
          <div className="flex items-center gap-2">
            <div className="flex-2 flex items-center justify-end">
              <Search size="md" onChange={onSearch} onClear={onClear} />
            </div>
            <button
              onClick={createTemplte}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
            >
              <Plus size={18} className="mr-2" />
              New Section
            </button>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6 min-h-52 py-5 pr-5"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {Object.entries(list).map(([key, value]) => (
          <SectionCard
            key={key}
            section={value}
            title={value.name}
            id={value.id}
          />
        ))}

        {Boolean(sectionsLen) && (
          <div className="flex justify-center items-center">
            {Boolean(Object.keys(list).length === 0) && <EmptySearch />}
          </div>
        )}

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
        <SectionsPage />
      </SectionStoreProvider>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.paramRef.current !== nextProps.paramRef.current;
  }
);
