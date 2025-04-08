import { Edit, Copy, Info, Trash2 } from "lucide-react";
import React from "react";
import { formatedDate } from "../lib/util";
import { TemplatesPropsWithId } from "../types/responseTypes";
import useTemplateStore from "../hooks/useTemplateStore";

interface TemplateCardProps {
  onClickLable: () => void;
  template: TemplatesPropsWithId;
}

function TemplateCard({ template, onClickLable }: TemplateCardProps) {
  const { handleDelete, cloneTemplate } = useTemplateStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center mb-4 gap-5">
            <h4
              onClick={onClickLable}
              className="text-lg font-semibold cursor-pointer hover:border-b-2 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 ease-in-out group-hover:scale-105"
            >
              {template.name}
            </h4>
            <Info
              className="ml-2 opacity-0 text-green-500 dark:text-green-400
              cursor-pointer
              group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 ease-in-out
            "
              size={16}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {template.description || ""}
          </p>
          {Boolean(template.lastEdited) && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Last edited: {formatedDate(template?.lastEdited)}
            </p>
          )}
          {Boolean(template?.countOfEdits) && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Edited: {template?.countOfEdits} times
            </p>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Created At: {formatedDate(template?.createdAt)}
          </p>
        </div>

        <div className="flex flex-col space-y-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out justify-between">
          <button className="p-2 text-blue-500 hover:bg-blue-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md">
            <Edit size={18} />
          </button>
          <button
            onClick={() => cloneTemplate(template.id)}
            className="p-2 text-green-500 hover:bg-green-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() => handleDelete(template.id)}
            className=" p-2 text-red-500 hover:bg-green-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard as React.FC<TemplateCardProps>;
