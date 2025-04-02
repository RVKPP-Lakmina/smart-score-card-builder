import { Edit, Copy } from "lucide-react";

interface TemplateCardProps {
  template: {
    name: string;
    lastEdited: string;
  };
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">{template.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Last edited: {template.lastEdited}
        </p>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md">
            <Edit size={18} />
          </button>
          <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-gray-700 rounded-md">
            <Copy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard as React.FC<TemplateCardProps>;
