import { Plus } from "lucide-react";
import NewTemplateCard from "../../../../components/NewTemplateCard";
import { CustomizableGridLayout } from "../../../../components/ui/CustomizableGridLayout";
import { EmptySearch } from "../../../../components/ui/DataNotFound";
import { Search } from "../../../../components/ui/SearchBox";
import InfoComponents from "../../../../components/InfoComponents";
import React from "react";
import { TemplateSections } from "../../../../types/responseTypes";
import RuleStoreProvider from "../../../../providers/RuleStoreProvider";
import { useRuleStore } from "../../../../hooks/useRuleStore";
import RuleCard from "../../../../components/Rules/RuleCard";

interface SectionsProps {
  handlePageChange: (page: string) => void;
  paramRef: React.RefObject<{
    section?: TemplateSections[string];
    templateId?: string;
  }>;
}

const SectionOverviewPage = () => {
  const { templateId, rules } = useRuleStore();
  const [list, setList] = React.useState(rules);

  React.useEffect(() => {
    setList(rules);
  }, [rules]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let filteredItems = rules;

    if (value) {
      filteredItems = rules.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setList(filteredItems);
  };

  const onClear = () => {};

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <h3 className="text-xl font-bold">Characteristics Configuration</h3>
          <InfoComponents templateId={templateId} />
        </div>
        {Boolean(list.length) && (
          <div className="flex items-center gap-2">
            <div className="flex-2 flex items-center justify-end">
              <Search size="md" onChange={onSearch} onClear={onClear} />
            </div>
            <button
              onClick={() => {}}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
            >
              <Plus size={18} className="mr-2" />
              New Characteristic
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
          <RuleCard key={key} rule={value} id={value.id} title={value.name} />
        ))}

        {Boolean(list.length) && (
          <div className="flex justify-center items-center">
            {Boolean(Object.keys(list).length === 0) && <EmptySearch />}
          </div>
        )}

        {Boolean(!list.length) && (
          <NewTemplateCard
            title={"Create New Characteristic"}
            onClick={() => {}}
          />
        )}
      </CustomizableGridLayout>
    </div>
  );
};

const RulePageWrapper = React.memo(
  (props: SectionsProps) => {
    const {
      paramRef: { current: data },
    } = props;

    return (
      <RuleStoreProvider
        templateId={data.templateId as string}
        section={data?.section || ({} as TemplateSections[string])}
      >
        <SectionOverviewPage />
      </RuleStoreProvider>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.paramRef.current?.section !==
      nextProps.paramRef.current?.section
    );
  }
);

export default RulePageWrapper;
