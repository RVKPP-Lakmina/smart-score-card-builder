import { cn } from "../../../lib/util";

interface VariableOption {
  id: string;
  label: string;
}

interface VariableSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variables: VariableOption[];
  selectedVariables?: string[];
  onAddSelected?: () => void;
  onVariableToggle?: (id: string) => void;
}

export default function VariableSelectionModal({
  description = "Select variables are used to calculate the score in this section. They can be used in the formula and in the description.",
  variables = [],
  selectedVariables = [],
  onAddSelected,
  onVariableToggle,
}: VariableSelectionModalProps) {
  const handleVariableClick = (id: string) => {
    onVariableToggle?.(id);
  };

  return (
    <div>
      <div className="p-6">
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
        )}

        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-2">
          <div className="flex flex-wrap gap-2">
            {variables.map((variable) => (
              <button
                key={variable.id}
                onClick={() => handleVariableClick(variable.id)}
                className={cn(
                  "px-3 py-2 text-sm rounded-md border transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  selectedVariables.includes(variable.id)
                    ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300"
                    : "bg-white border-blue-300 text-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-gray-700"
                )}
              >
                {variable.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onAddSelected}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          ADD
        </button>
      </div>
    </div>
  );
}
