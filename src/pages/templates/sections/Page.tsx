import { Plus } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
import NewTemplateCard from "../../../components/NewTemplateCard";
import { useCallback } from "react";
import { useModal } from "../../../hooks/useModal";

const Sections = () => {
  const { openModal } = useModal();

  const createTemplte = useCallback(() => {
    openModal({
      title: "Create New Section",
      childrenkey: "createSection",
      size: "lg",
    });
  }, [openModal]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Sections Configuration</h3>
        <button
          onClick={createTemplte}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
        >
          <Plus size={18} className="mr-2" />
          New Section
        </button>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6 min-h-52 py-5 pr-5"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <SectionCard title="Borrower Risk" />
        <SectionCard title="Financial Risk" />
        <SectionCard title="Transactional Risk" />
        <SectionCard title="Business Risk" />
        <SectionCard title="Environmental, Social and Governance" />
        <SectionCard title="Industry/Environmental Risk" />
        <SectionCard title="Cultivation Specific Risk" />

        <NewTemplateCard title={"Create New Section"} onClick={() => {}} />
      </div>
    </div>
  );
};

export default Sections;
