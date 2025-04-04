import { Plus } from "lucide-react";
import React from "react";

interface NewTemplateCardProps {
  onClick: () => void;
  title?: string;
  description?: string;
}

function NewTemplateCard({
  onClick,
  title,
  description,
}: NewTemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center p-6 h-full cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:to-green-900/30 transition-all"
    >
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center mb-3">
          <Plus size={24} className="text-white" />
        </div>
        <h4 className="text-lg font-semibold">
          {title || "Create New Template"}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description || "Start from scratch"}
        </p>
      </div>
    </div>
  );
}

export default NewTemplateCard as React.FC<NewTemplateCardProps>;
