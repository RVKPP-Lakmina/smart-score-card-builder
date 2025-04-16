import React, { useCallback } from "react";
import { SelectableList } from "../../ui/SeletableList";
import { useModal } from "../../../hooks/useModal";

interface VariableOption {
  id: string;
  name: string;
}

interface VariableSelectionProps {
  description?: string;
  variables: VariableOption[];
  selectedVariables?: string[];
  onVariableToggle?: (selected: string[]) => void;
}

export default function VariableSelection({
  description = "Select variables are used to calculate the score in this section. They can be used in the formula and in the description.",
  variables = [],
  selectedVariables = [],
  onVariableToggle,
}: VariableSelectionProps) {
  const [selected, setSelected] = React.useState<string[]>(selectedVariables);
  const { closeModal } = useModal();

  React.useEffect(() => {
    setSelected(selectedVariables);
  }, [selectedVariables]);

  const handleVariableToggle = useCallback((ids: string[]) => {
    setSelected(ids);
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Variables
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {description}
      </p>
      <SelectableList
        items={variables}
        selectedIds={selected}
        onChange={handleVariableToggle}
        maxHeight="max-h-[250px]"
        className={"min-h-[250px]"}
      />
      <div className="flex justify-end space-x-2 py-3">
        <button
          onClick={closeModal}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onVariableToggle?.(selected);
            closeModal();
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
}
