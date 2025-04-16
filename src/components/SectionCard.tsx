import { PlusCircle, Trash2 } from "lucide-react";
import EditableText from "./ui/EditableText";
import { RiskBox } from "./ui/RiskBox";
import { useModal } from "../hooks/useModal";
import useSectionStore from "../hooks/useSectionStore";
import { NoRecords } from "./ui/DataNotFound";
import { Button } from "./ui/Button";

interface SectionCardProps {
  title: string;
  onChange?: (value: string) => void;
  value?: string;
  id: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  value,
}: SectionCardProps) => {
  const { sectionRules, rawRules, saveSectionBulkRules } = useSectionStore();
  const { openModal } = useModal();

  const addNewRule = () => {
    openModal({
      title: "Select Rules",
      childrenkey: "selectRules",
      size: "lg",
      closeOnOutsideClick: true,
      props: {
        variables: rawRules,
        selectedVariables: sectionRules?.[id]?.map((item) => item.parentRuleId),
        onVariableToggle: async (selected: string[]) => {
          await saveSectionBulkRules(id, selected);
        },
      },
    });
  };

  const addEditNewProperties = (lable: string) => {
    openModal({
      title: lable,
      childrenkey: "ruleEditor",
      size: "lg",
      closeOnOutsideClick: true,
      props: {},
      headerProps: {
        items: [],
        addItem: (index: number) => {
          console.log("Add item at index:", index);
        },
      },
    });
  };

  return (
    <RiskBox
      title={title}
      value={Number(value || "0.00") as number}
      onAdd={addNewRule}
    >
      <ul>
        {(sectionRules?.[id] || []).length ? (
          <>
            {(sectionRules?.[id] || []).map((item) => (
              <li
                onClick={() => addEditNewProperties(item.name)}
                key={item.id}
                className="p-2 cursor-pointer 
  m-2 border rounded-lg border-gray-200 
  flex items-center justify-between hover:bg-gray-200 
  dark:hover:bg-gray-700 transition duration-200 delay-100 ease-in-out"
              >
                <h5 className=" flex-2 font-semibold w-32">{item.name}</h5>

                <div className="flex space-x-2 items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="focus:outline-none"
                  >
                    <EditableText label={"0.00"} onValueChange={() => {}} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-all duration-300 ease-in-out p-0 bg-transparent border-none focus:outline-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </>
        ) : (
          <NoRecords
            variant="centered"
            action={
              <Button
                onClick={addNewRule}
                className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Record
              </Button>
            }
          />
        )}
      </ul>
    </RiskBox>
  );
};

export default SectionCard;
