"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FileText, Calendar, Edit } from "lucide-react";

export const TemplateNode = memo(({ data, isConnectable }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-blue-500 p-4 w-64">
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-blue-500"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <FileText className="text-blue-500 mr-2" size={20} />
          <h3 className="font-bold text-gray-900 dark:text-white">
            {data.name}
          </h3>
        </div>
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
          Score: {data.score}
        </span>
      </div>

      {data.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {data.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {data.lastEdited}
        </div>
        <div className="flex items-center">
          <Edit size={12} className="mr-1" />
          {data.countOfEdits || 0} edits
        </div>
      </div>
    </div>
  );
});

TemplateNode.displayName = "TemplateNode";
