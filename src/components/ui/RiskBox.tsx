import { Plus } from "lucide-react";
import EditableText from "./EditableText";

interface RiskBoxProps {
  title: string;
  value: number;
  count?: number;
  onAdd?: () => void;
  className?: string;
  saveButtonVisible?: boolean;
  overallWeight?: number;
  sectionWeight?: number;
}

export function RiskBox({
  title,
  onAdd,
  saveButtonVisible,
  overallWeight,
  sectionWeight,
}: RiskBoxProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="transition-all delay-300 text-blue-500 dark:text-white hover:text-blue-600 rounded-full bg-green-400/20 p-2 hover:bg-green-600/20 duration-200 ease-in-out"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 py-[1px] flex justify-end items-center">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 p-1">
            Overall Weight:
            <EditableText
              label={sectionWeight?.toString() || "0.00"}
              onValueChange={() => {}}
            />
          </span>
        </div>
      </div>
      {saveButtonVisible && (
        <div className="flex justify-end space-x-2 p-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all">
            View Rules
          </button>
        </div>
      )}
    </div>
  );
}
