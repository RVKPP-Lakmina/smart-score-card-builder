import { PlusCircle } from "lucide-react";
import { RiskBox } from "./ui/RiskBox";
import { useModal } from "../hooks/useModal";
import useSectionStore from "../hooks/useSectionStore";
import { NoRecords } from "./ui/DataNotFound";
import { Button } from "./ui/Button";
import { TemplateSectionProps } from "../types/responseTypes";
import RuleItem from "./RuleItem";
import { RuleWithId } from "../types/rules";
interface SectionCardProps {
  section: TemplateSectionProps;
  title: string;
  onChange?: (value: string) => void;
  value?: string;
  id: string;
  onPageChange?: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  section,
  onPageChange,
  value,
}: SectionCardProps) => {
  const { sectionRules, rawRules, saveSectionBulkRules, handleDeleteRuleItem } =
    useSectionStore();
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

  const handleDeleteRule = async (rule: RuleWithId) => {
    await handleDeleteRuleItem(rule);
  };

  return (
    <RiskBox
      id={id}
      onPageChange={onPageChange}
      title={title}
      value={Number(value || "0.00") as number}
      onAdd={addNewRule}
      overallWeight={section?.rules?.length ? section.overallWeight : 0}
    >
      <ul>
        {(sectionRules?.[id] || []).length ? (
          <>
            {(sectionRules?.[id] || []).map((item) => (
              <RuleItem
                key={`SectionCard-RiskBox-ul-RuleItem-${item.id}`}
                item={item}
                onDelete={async () => {
                  handleDeleteRule(item);
                }}
              />
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
