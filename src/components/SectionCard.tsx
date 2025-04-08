import { Trash2 } from "lucide-react";
import EditableText from "./ui/EditableText";
import { RiskBox } from "./ui/RiskBox";
import { useModal } from "../hooks/useModal";

interface SectionCardProps {
  title: string;
  onChange?: (value: string) => void;
  value?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  value,
}: SectionCardProps) => {
  const { openModal } = useModal();
  const addNewRule = () => {
    openModal({
      title: "Select Rules",
      childrenkey: "selectRules",
      size: "lg",
      closeOnOutsideClick: true,
      props: {},
    });
  };

  return (
    <RiskBox
      title={title}
      value={Number(value || "0.00") as number}
      onAdd={addNewRule}
    >
      <ul>
        {[
          "Age",
          "Education level",
          "Residence type",
          "Employment status",
          "No of experience in employment",
          "Employment Type",
          "Dependent Income",
          "Loan installment income percentage",
          "Debt handling capacity",
          "No of loan cycles",
        ].map((item) => (
          <li
            key={item}
            className="p-2 cursor-pointer 
            m-2 border rounded-lg border-gray-200 
            flex items-center justify-between hover:bg-gray-200 
            dark:hover:bg-gray-700 transition duration-200 delay-100 ease-in-out"
          >
            <h5 className=" flex-2 font-semibold w-32">{item}</h5>

            <div className="flex space-x-2 items-center">
              <EditableText label={"0.00"} onValueChange={() => {}} />

              <Trash2
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-all duration-300 ease-in-out"
                size={20}
              />
            </div>
          </li>
        ))}
      </ul>
    </RiskBox>
  );
};

export default SectionCard;
