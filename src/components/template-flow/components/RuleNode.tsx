"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { FileText, Calendar, Eye } from "lucide-react";
import { formatedDate } from "../../../lib/util";
import moment from "moment";
import { RuleWithId } from "../../../types/rules";

interface RuleNodeProps {
  data: RuleWithId;
  isConnectable: boolean;
}

export const RuleNode = memo(({ data, isConnectable }: RuleNodeProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-purple-500 p-3 w-72">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 !bg-purple-500"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1 justify-between w-full">
          <FileText className="text-purple-500 mr-2" size={16} />
          <h3 className="font-medium text-gray-900 dark:text-white">
            {data.name}
          </h3>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
            Score: {data?.score || "0.00"}
          </span>
          <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
            <Eye size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-2 mb-2">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded">
          <ul
            style={{
              cursor: "pointer",
              maxHeight: "100px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {data.properties.map((property) => (
              <li
                key={property.id}
                className="grid grid-cols-3 gap-2 items-center mb-1 border border-blue-200 dark:border-blue-700 rounded p-2"
              >
                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium col-span-2">
                  {property.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs font-medium col-span-1 text-right">
                  {property.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          {data.lastEdited || formatedDate(moment())}
        </div>
      </div>
    </div>
  );
});

RuleNode.displayName = "RuleNode";
