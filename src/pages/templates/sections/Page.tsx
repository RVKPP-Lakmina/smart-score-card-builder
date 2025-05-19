import { Plus } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
import NewTemplateCard from "../../../components/NewTemplateCard";
import React, { useEffect } from "react";
import SectionStoreProvider from "../../../providers/SectionStoreProvider";
import useSectionStore from "../../../hooks/useSectionStore";
import {
  Sections,
  TemplateSections,
  TemplatesPropsWithId,
} from "../../../types/responseTypes";
import { Search } from "../../../components/ui/SearchBox";
import { EmptySearch } from "../../../components/ui/DataNotFound";
import { CustomizableGridLayout } from "../../../components/ui/CustomizableGridLayout";
import InfoComponents from "../../../components/InfoComponents";

interface SectionsProps {
  handlePageChange?: (page: string) => void;
  paramRef: React.RefObject<Record<string, unknown>>;
}

// eslint-disable-next-line react-refresh/only-export-components
const SectionsPage = () => {
  const { sections, templateId, createTemplte, changePageToRules } =
    useSectionStore();
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
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <h3 className="text-xl font-bold">Sections Configuration</h3>
          <InfoComponents templateId={templateId} />
        </div>
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
      <CustomizableGridLayout
        defaultCols={3}
        minCols={1}
        maxCols={4}
        saveLayoutKey="section-layout-prefs"
      >
        {Object.entries(list).map(([key, value]) => (
          <SectionCard
            key={key}
            section={value}
            title={value.name}
            id={value.id}
            onPageChange={() =>
              changePageToRules(value as unknown as TemplatesPropsWithId)
            }
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
      </CustomizableGridLayout>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(
  (props: SectionsProps) => {
    return (
      <SectionStoreProvider
        templateId={props.paramRef.current?.templateId as string}
        handlePageChange={props.handlePageChange}
        paramRef={props.paramRef}
      >
        <SectionsPage />
      </SectionStoreProvider>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.paramRef.current !== nextProps.paramRef.current;
  }
);
