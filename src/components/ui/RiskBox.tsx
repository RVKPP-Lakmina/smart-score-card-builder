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
}

export function RiskBox({ title, onAdd, children }: RiskBoxProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <EditableText label={"0.00"} onValueChange={() => {}} />
          <button
            onClick={onAdd}
            className="transition-all delay-300 text-blue-500 dark:text-white hover:text-blue-600 rounded-full bg-green-400/20 p-2 hover:bg-green-600/20 duration-200 ease-in-out"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700"></div>

      <div
        className="p-3"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 355px)" }}
      >
        {children}
      </div>
    </div>
  );
}
