import { CircleCheckBig, Plus } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
import NewTemplateCard from "../../../components/NewTemplateCard";
import React, { useEffect, useMemo } from "react";
import SectionStoreProvider from "../../../providers/SectionStoreProvider";
import useSectionStore from "../../../hooks/useSectionStore";
import {
  TemplateSections,
  TemplateSectionsPropsWithId,
} from "../../../types/responseTypes";
import { Search } from "../../../components/ui/SearchBox";
import { EmptySearch } from "../../../components/ui/DataNotFound";
import { CustomizableGridLayout } from "../../../components/ui/CustomizableGridLayout";
import InfoComponents from "../../../components/InfoComponents";
import { TotalWeightIndicator } from "../../../components/TotalWeightIndicator";
// import { TotalWeightIndicator } from "../../../components/TotalWeightIndicator";

interface SectionsProps {
  handlePageChange?: (page: string) => void;
  paramRef: React.RefObject<Record<string, unknown>>;
}

// eslint-disable-next-line react-refresh/only-export-components
const SectionsPage = () => {
  const {
    sections,
    templateId,
    createTemplte,
    changePageToRules,
    onSaveOverallWeight,
  } = useSectionStore();
  const [list, setList] = React.useState({} as TemplateSections);
  const sectionsLen = Object.keys(sections).length;
  const [changedData, setChangedData] = React.useState<TemplateSections>(
    {} as TemplateSections
  );

  useEffect(() => {
    setList(sections as TemplateSections);
  }, [sections]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let filteredItems: TemplateSections = { ...sections };

    if (value) {
      const filteredSections: TemplateSections = {};
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

  const onOverallWeightChange = (
    section: TemplateSectionsPropsWithId,
    overallWeight: string
  ) => {
    const newData: TemplateSections = {
      ...changedData,
      [section.id]: {
        ...section,
        overallWeight: Number(overallWeight),
      },
    };

    setChangedData(newData);
  };

  const onSubmit = async () => {
    await Promise.all(
      Object.values(changedData).map((value: TemplateSectionsPropsWithId) =>
        onSaveOverallWeight(value, Number(value.overallWeight))
      )
    );

    setChangedData({} as TemplateSections);
  };

  const overallWeights: number[] = useMemo(() => {
    const scores: number[] = [];

    Object.entries(sections).forEach(([key, value]) => {
      if (changedData[key]) {
        scores.push(Number(changedData[key].overallWeight));
      } else {
        scores.push(Number(value.overallWeight));
      }
    });

    return scores;
  }, [changedData, sections]);

  const isChanged = useMemo(() => {
    return Object.keys(changedData).length > 0;
  }, [changedData]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">Sections Configuration</h3>
          <InfoComponents templateId={templateId} />
        </div>
        {Boolean(sectionsLen) && (
          <div className="flex items-center gap-2">
            {!isChanged && (
              <div className="flex-2 flex items-center justify-end">
                <Search size="md" onChange={onSearch} onClear={onClear} />
              </div>
            )}
            <button
              onClick={isChanged ? onSubmit : createTemplte}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
            >
              {isChanged ? (
                <>
                  <CircleCheckBig size={18} className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus size={18} className="mr-2" />
                  New Section
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isChanged && <TotalWeightIndicator weights={overallWeights} size="sm" />}
      <div>
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
              onOverallWeightChange={(overallWeight) => {
                onOverallWeightChange(
                  value as TemplateSectionsPropsWithId,
                  overallWeight
                );
              }}
              onPageChange={() =>
                changePageToRules(value as TemplateSectionsPropsWithId)
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
