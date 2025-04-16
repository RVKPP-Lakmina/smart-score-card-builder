"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FileText, Calendar, Eye } from "lucide-react";

interface RuleNodeProps {
  data: {
    name: string;
    lastEdited: string;
  };
  isConnectable: boolean;
}

export const RuleNode = memo(({ data, isConnectable }: RuleNodeProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-purple-500 p-3 w-56">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-purple-500"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <FileText className="text-purple-500 mr-2" size={16} />
          <h3 className="font-medium text-gray-900 dark:text-white">
            {data.name}
          </h3>
        </div>
        <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
          <Eye size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {data.lastEdited}
        </div>
      </div>
    </div>
  );
});

RuleNode.displayName = "RuleNode";
