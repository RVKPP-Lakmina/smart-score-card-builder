import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { Layers, Calendar, Edit, Eye, ChevronDown } from "lucide-react";
import { cn, formatedDate } from "../../../lib/util";

interface SectionNodeProps {
  data: {
    name: string;
    description?: string;
    sectionWeight?: number;
    overallWeight?: number;
    lastEdited: string;
    countOfEdits?: number;
    createdAt: string;
  };
  isConnectable: boolean;
}

export const SectionNode = memo(({ data, isConnectable }: SectionNodeProps) => {
  const [show, setShow] = useState(false);

  const subStringTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20) + "...";
    }
    return title;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-green-500 p-4 w-64">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-green-500"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Layers className="text-green-500 mr-2" size={20} />
          <h3 className="font-bold text-gray-900 dark:text-white text-wi">
            {subStringTitle(data.name)}
          </h3>
        </div>
        <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
          <Eye size={16} />
        </button>
        <button
          onClick={() => {
            setShow((prev) => !prev);
          }}
          className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-200 ease-in-out",
              show ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </div>

      {data.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {data.description}
        </p>
      )}

      {show && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Overall Weight
            </p>
            <p className="font-medium">{data.overallWeight || 0}%</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {formatedDate(data.createdAt) || "N/A"}
        </div>
        <div className="flex items-center">
          <Edit size={12} className="mr-1" />
          {data.countOfEdits || 0} edits
        </div>
      </div>
    </div>
  );
});

SectionNode.displayName = "SectionNode";
