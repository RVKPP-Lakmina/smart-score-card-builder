import { useState, useEffect } from "react";
import { Search, AlertCircle, Info } from "lucide-react";
import { cn } from "../../lib/util";

type Variable = {
  id: string;
  name: string;
  description: string;
  sectionWeight: number;
  modelWeight: number;
};

type VariableDefinitionFormProps = {
  onSave: (variable: Omit<Variable, "id">) => void;
  existingVariables: Variable[];
  onProceedToStep2: (variable: Variable) => void;
};

export function VariableDefinitionForm({
  onSave,
  existingVariables,
  onProceedToStep2,
}: VariableDefinitionFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionWeight, setSectionWeight] = useState<number>(0);
  const [modelWeight, setModelWeight] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<Variable[]>([]);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [matchedVariable, setMatchedVariable] = useState<Variable | null>(null);
  const [nameError, setNameError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Search for existing variables as user types
  useEffect(() => {
    if (name.trim().length > 2) {
      const results = existingVariables.filter((variable) =>
        variable.name.toLowerCase().includes(name.toLowerCase())
      );
      setSearchResults(results);

      // If exact match found
      const exactMatch = results.find(
        (variable) => variable.name.toLowerCase() === name.toLowerCase()
      );
      if (exactMatch) {
        setMatchedVariable(exactMatch);
        setShowAutoFillPrompt(true);
      } else {
        setShowAutoFillPrompt(false);
        setMatchedVariable(null);
      }
    } else {
      setSearchResults([]);
      setShowAutoFillPrompt(false);
      setMatchedVariable(null);
    }
  }, [name, existingVariables]);

  // Validate form
  useEffect(() => {
    const isDuplicateName = existingVariables.some(
      (variable) => variable.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      setNameError("This variable name already exists");
    } else if (name.trim() === "") {
      setNameError("Variable name is required");
    } else {
      setNameError("");
    }

    setIsFormValid(
      name.trim() !== "" &&
        description.trim() !== "" &&
        sectionWeight > 0 &&
        modelWeight > 0 &&
        !isDuplicateName
    );
  }, [name, description, sectionWeight, modelWeight, existingVariables]);

  const handleAutoFill = () => {
    if (matchedVariable) {
      setName(matchedVariable.name);
      setDescription(matchedVariable.description);
      setSectionWeight(matchedVariable.sectionWeight);
      setModelWeight(matchedVariable.modelWeight);
      setShowAutoFillPrompt(false);
    }
  };

  const handleEditAnyway = () => {
    setShowAutoFillPrompt(false);
  };

  const handleSave = () => {
    if (isFormValid) {
      onSave({
        name,
        description,
        sectionWeight,
        modelWeight,
      });

      // Reset form
      setName("");
      setDescription("");
      setSectionWeight(0);
      setModelWeight(0);
    }
  };

  const handleProceedToStep2 = () => {
    if (matchedVariable) {
      onProceedToStep2(matchedVariable);
    } else if (isFormValid) {
      const newVariable = {
        id: Date.now().toString(),
        name,
        description,
        sectionWeight,
        modelWeight,
      };
      onSave(newVariable);
      onProceedToStep2(newVariable);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Step 1: Variable Definition
        </h2>

        {/* Search and auto-fill prompt */}
        <div className="relative mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Variable Name"
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                nameError
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              )}
            />
          </div>

          {nameError && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {nameError}
            </p>
          )}

          {/* Search results dropdown */}
          {searchResults.length > 0 && !showAutoFillPrompt && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((variable) => (
                <div
                  key={variable.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setMatchedVariable(variable);
                    setShowAutoFillPrompt(true);
                  }}
                >
                  <div className="font-medium">{variable.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {variable.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Auto-fill prompt */}
          {showAutoFillPrompt && matchedVariable && (
            <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-start">
                <Info
                  className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    This variable already exists. Do you want to auto-fill with
                    previous data?
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={handleAutoFill}
                      className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Auto-fill
                    </button>
                    <button
                      onClick={handleEditAnyway}
                      className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
                    >
                      Edit Anyway
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a detailed description of this variable..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="sectionWeight"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Section Weight (%)
            </label>
            <input
              type="number"
              id="sectionWeight"
              value={sectionWeight}
              onChange={(e) => setSectionWeight(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="modelWeight"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Model Weight (%)
            </label>
            <input
              type="number"
              id="modelWeight"
              value={modelWeight}
              onChange={(e) => setModelWeight(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={cn(
              "px-4 py-2 rounded-md",
              isFormValid
                ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            )}
          >
            Save Variable
          </button>
          <button
            onClick={handleProceedToStep2}
            disabled={!isFormValid && !matchedVariable}
            className={cn(
              "px-4 py-2 rounded-md",
              isFormValid || matchedVariable
                ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            )}
          >
            Proceed to Step 2
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Existing Variables
        </h3>

        {existingVariables.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No variables defined yet. Create your first variable above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Variable Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Section Weight
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Model Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {existingVariables.map((variable) => (
                  <tr
                    key={variable.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setMatchedVariable(variable);
                      setShowAutoFillPrompt(true);
                    }}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {variable.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {variable.description.length > 100
                        ? `${variable.description.substring(0, 100)}...`
                        : variable.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {variable.sectionWeight}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {variable.modelWeight}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
