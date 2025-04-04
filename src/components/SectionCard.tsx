import EditableText from "./ui/EditableText";
import { RiskBox } from "./ui/RiskBox";

interface SectionCardProps {
  title: string;
  onChange?: (value: string) => void;
  value?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  value,
}: SectionCardProps) => {
  return (
    <RiskBox title={title} value={Number(value || "0.00") as number}>
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
            className="p-2 cursor-pointer m-2 border rounded-lg border-gray-200 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            <h5 className=" flex-2 font-semibold w-32">{item}</h5>

            <button className="flex-1 max-w-20 rounded-full bg-green-400 dark:bg-blue-400 text-white px-5 py-1 hover:bg-green-600 dark:hover:bg-blue-600 transition duration-200">
              Edit
            </button>

            <EditableText label={"0.00"} onValueChange={() => {}} />
          </li>
        ))}
      </ul>
    </RiskBox>
  );
};

export default SectionCard;
