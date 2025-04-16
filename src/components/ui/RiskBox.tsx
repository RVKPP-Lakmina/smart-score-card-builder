import type React from "react";
import { Plus } from "lucide-react";
import EditableText from "./EditableText";

interface RiskBoxProps {
  title: string;
  value: number;
  count?: number;
  onAdd?: () => void;
  className?: string;
  children?: React.ReactNode;
  saveButtonVisible?: boolean;
}

export function RiskBox({
  title,
  onAdd,
  children,
  saveButtonVisible,
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

      <div className="px-4 py-[1px] flex justify-end items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            Section Weight:
            <EditableText label={"0.00"} onValueChange={() => {}} />
          </span>
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            Overall Weight:
            <EditableText label={"0.00"} onValueChange={() => {}} />
          </span>
        </div>
      </div>

      <div className="border flex justify-between border-gray-200 dark:border-gray-700"></div>

      <div
        className="p-3"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 355px)",
          minHeight: "calc(100vh - 355px)",
        }}
      >
        {children}
      </div>

      {saveButtonVisible && (
        <div className="flex justify-end space-x-2 p-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
