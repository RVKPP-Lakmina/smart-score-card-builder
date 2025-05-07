import { RiskBox } from "./ui/RiskBox";
import { useModal } from "../hooks/useModal";
import useSectionStore from "../hooks/useSectionStore";
import { TemplateSectionProps } from "../types/responseTypes";

interface SectionCardProps {
  section: TemplateSectionProps;
  title: string;
  onChange?: (value: string) => void;
  value?: string;
  id: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  title,
  section,
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

  return (
    <RiskBox
      title={title}
      value={Number(value || "0.00") as number}
      onAdd={addNewRule}
      overallWeight={section.rules.length ? section.overallWeight : 0}
      sectionWeight={section.rules.length ? section.sectionWeight : 0}
      saveButtonVisible={true}
    />
  );
};

export default SectionCard;
