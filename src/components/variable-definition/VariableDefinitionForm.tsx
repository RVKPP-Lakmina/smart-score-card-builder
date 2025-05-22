import React, { useState, useEffect, useMemo } from "react";
import { Search, AlertCircle, Info, Eraser } from "lucide-react";
import { cn } from "../../lib/util";
import { TotalWeightIndicator } from "../TotalWeightIndicator";
import { DataNotFound } from "../ui/DataNotFound";
import { RuleEnhanced, RuleEnhancedWithId } from "../../types/rules";

type Variable = RuleEnhancedWithId;

const defaultVariable: RuleEnhanced = {
  name: "",
  description: "",
  sectionWeight: 0,
  modelWeight: 0,
  createdBy: "",
  lastEditedBy: "",
  parentSectionId: "",
  parentTemplateId: "",
  parentRuleId: "",
  properties: [],
  lastEdited: "",
  type: "singleValue",
  createdAt: "",
};

type VariableDefinitionFormProps = {
  onSave: (variable: Omit<RuleEnhanced, "id">) => void;
  existingVariables: Variable[];
  onProceedToStep2: (variable: Variable | RuleEnhanced) => void;
};

export function VariableDefinitionForm({
  onSave,
  existingVariables,
  onProceedToStep2,
}: VariableDefinitionFormProps) {
  // const [error, setError] = useState({
  //   isValid: true,
  //   name: "",
  //   description: "",
  //   sectionWeight: "",
  //   modelWeight: "",
  // } as {
  //   isValid: boolean;
  //   name: string;
  //   description: string;
  //   sectionWeight: string;
  //   modelWeight: string;
  // });
  const [nameError, setNameError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [matchedVariable, setMatchedVariable] = useState<Variable | null>(null);
  const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
  const [searchResults, setSearchResults] = useState<Variable[]>([]);
  const [selectedVariableForEdit, setSelectedVariableForEdit] =
    useState<Variable | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionWeight, setSectionWeight] = useState<number | null>(null);
  const [modelWeight, setModelWeight] = useState<number | null>(null);
  const [type, setType] = useState<RuleEnhanced["type"]>("singleValue");
  const [dataSourcePath, setDataSourcePath] = useState("");
  const [dataSourceKey, setDataSourceKey] = useState("");

  useEffect(() => {
    if (isEditing) {
      return;
    }

    if (name.trim().length > 2) {
      const results = existingVariables.filter((variable) =>
        variable.name.toLowerCase().includes(name.toLowerCase())
      );
      setSearchResults(results);

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
  }, [name, existingVariables, isEditing]);

  useEffect(() => {
    const isDuplicateName = existingVariables.some(
      (variable) => variable.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName && !isEditing) {
      // setError((prev) => ({
      //   ...prev,
      //   name: "Variable name already exists.",
      // }));

      setNameError("Variable name already exists.");
    } else {
      setNameError("");
    }

    setIsFormValid(
      name.trim() !== "" &&
        description.trim() !== "" &&
        typeof sectionWeight === "number" &&
        sectionWeight > 0 &&
        typeof modelWeight === "number" &&
        modelWeight > 0 &&
        (!isDuplicateName || isEditing)
    );
  }, [
    name,
    description,
    sectionWeight,
    modelWeight,
    existingVariables,
    isEditing,
  ]);

  const setData = (variable: Variable, isEditing: boolean = false) => {
    setName(variable.name);
    setDescription(variable.description);
    setSectionWeight(variable?.sectionWeight || 0);
    setModelWeight(variable?.modelWeight || 0);
    setType(variable.type);

    if (isEditing) {
      setSelectedVariableForEdit(variable);
    }
  };

  const handleAutoFill = () => {
    if (matchedVariable) {
      setData(matchedVariable);
      setNameError("");
      setShowAutoFillPrompt(false);
    }
  };

  const handleEditAnyway = () => {
    setShowAutoFillPrompt(false);
  };

  const handleSave = () => {
    if (isFormValid) {
      const newVariable = isEditing
        ? selectedVariableForEdit
        : JSON.parse(JSON.stringify(defaultVariable));

      onSave({
        ...newVariable,
        name,
        description,
        sectionWeight,
        modelWeight,
        type,
      });

      setName("");
      setDescription("");
      setSectionWeight(null);
      setModelWeight(null);
      setType("singleValue");
      setIsEditing(false);
      setSelectedVariableForEdit(null);
    }
  };

  const handleProceedToStep2 = () => {
    if (matchedVariable) {
      onProceedToStep2(matchedVariable);
    } else if (isFormValid) {
      let newVariable = isEditing
        ? selectedVariableForEdit
        : JSON.parse(JSON.stringify(defaultVariable));

      newVariable = {
        ...newVariable,
        name,
        description,
        sectionWeight,
        modelWeight,
        type,
      };

      onSave(newVariable);
      onProceedToStep2(newVariable);
    }
  };

  const clearAll = () => {
    setName("");
    setDescription("");
    setSectionWeight(null);
    setModelWeight(null);
    setType("singleValue");
    setDataSourcePath("");
    setDataSourceKey("");
    setSearchResults([]);
    setShowAutoFillPrompt(false);
    setMatchedVariable(null);
    setNameError("");
    setIsFormValid(false);
  };

  return (
    <div className="flex w-full  gap-4 items-stretch">
      <div className="flex-3 w-3/5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Step 1: Variable Definition
            </h2>
            <button
              onClick={clearAll}
              className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Eraser size={16} className="mr-1" />
              Clear All
            </button>
          </div>

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

            {showAutoFillPrompt && matchedVariable && (
              <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="flex items-start">
                  <Info
                    className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      This variable already exists. Do you want to auto-fill
                      with previous data?
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

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Variable Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as RuleEnhanced["type"])}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="singleValue">Single Value</option>
              <option value="masterData">Master Data (Conditions)</option>
              <option value="numericRange">Numeric Range</option>
            </select>
          </div>

          {type === "masterData" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="mb-4">
                <label
                  htmlFor="dataSourcePath"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Master DateKey (Optional)
                </label>
                <input
                  type="text"
                  id="dataSourcePath"
                  value={dataSourceKey}
                  onChange={(e) => setDataSourceKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder=" Master DateKey (Condition Key)"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dataSourcePath"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Data Source Path (Optional)
                </label>
                <input
                  type="text"
                  id="dataSourcePath"
                  value={dataSourcePath}
                  onChange={(e) => setDataSourcePath(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="API endpoint or data source path"
                />
              </div>
            </div>
          )}
          {/* {type === "masterData" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Value (Optional)
                </label>
                <input
                  type="number"
                  value={validation.min || ""}
                  onChange={(e) =>
                    updateValidation("min", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Minimum allowed value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum Value (Optional)
                </label>
                <input
                  type="number"
                  value={validation.max || ""}
                  onChange={(e) =>
                    updateValidation("max", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="Maximum allowed value"
                />
              </div>
            </div>
          )} */}

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
                value={sectionWeight || ""}
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
                value={modelWeight || ""}
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
      </div>
      <div className="flex-2 w-2/5">
        <ExistingVariables
          existingVariables={existingVariables}
          setData={setData}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
}

interface ExistingVariablesProps {
  existingVariables: Variable[];
  setData: (variable: Variable, isEditing: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const ExistingVariables: React.FC<ExistingVariablesProps> = React.memo(
  ({ existingVariables, setData, setIsEditing }: ExistingVariablesProps) => {
    const totals = useMemo(() => {
      const data = {
        totalModelWeight: 0,
        totalSectionWeight: 0,
      };

      if (!existingVariables.length) {
        return data;
      }

      existingVariables.forEach(({ sectionWeight = 0, modelWeight = 0 }) => {
        data.totalModelWeight += modelWeight;
        data.totalSectionWeight += sectionWeight;
      });

      return data;
    }, [existingVariables]);

    return (
      <div className="bg-white h-full dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div
          className={cn(
            "mb-6 flex flex-col md:flex-row gap-4",
            existingVariables.length === 0 ? "hidden" : "visible"
          )}
        >
          <TotalWeightIndicator
            total={totals.totalSectionWeight}
            target={100}
            label="Total Section Weight"
            className="flex-1"
          />
          <TotalWeightIndicator
            total={totals.totalModelWeight}
            target={100}
            label="Total Model Weight"
            className="flex-1"
          />
        </div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Existing Variables
        </h3>

        {existingVariables.length === 0 ? (
          <DataNotFound
            title="No Existing Variables"
            message="No existing variables found. Please create a new variable."
          />
        ) : (
          <div className="flex-grow overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-white dark:bg-gray-800">
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Variable Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Section Weight
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Model Weight
                  </th>
                </tr>
              </thead>
            </table>

            <div className="overflow-y-auto max-h-[calc(100% - 300px)]">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {existingVariables.map((variable) => (
                    <tr
                      key={variable.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setData(variable, true);
                        setIsEditing(true);
                      }}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {variable.name}
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
          </div>
        )}
      </div>
    );
  },
  (prev, next) => prev.existingVariables === next.existingVariables
);
