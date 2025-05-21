import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { cn } from "../../lib/util";

type Variable = {
  id: string;
  name: string;
  description: string;
  sectionWeight: number;
  modelWeight: number;
};

type AttributeCondition = {
  id: string;
  label: string;
  value: string;
  score: number;
};

type AttributeRange = {
  id: string;
  min: string;
  max: string;
  label: string;
  score: number;
};

type AttributeType = "masterData" | "numericRange" | "singleValue";

type Attribute = {
  id: string;
  name: string;
  type: AttributeType;
  description: string;
  dataSourcePath?: string;
  conditions?: AttributeCondition[];
  ranges?: AttributeRange[];
  validation?: {
    regex?: string;
    min?: number;
    max?: number;
  };
};

type AttributeConfigurationProps = {
  variable: Variable;
  onSave: (variable: Variable, attributes: Attribute[]) => void;
  onBack: () => void;
  existingAttributes?: Attribute[];
};

export function AttributeConfiguration({
  variable,
  onSave,
  onBack,
  existingAttributes = [],
}: AttributeConfigurationProps) {
  const [attributes, setAttributes] = useState<Attribute[]>(existingAttributes);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize with a new attribute if none exist
  useEffect(() => {
    if (attributes.length === 0 && !currentAttribute) {
      handleAddAttribute();
    }
  }, [attributes, currentAttribute]);

  const validateAttribute = (attribute: Attribute): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!attribute.name.trim()) {
      newErrors.name = "Attribute name is required";
    }

    if (attribute.type === "masterData") {
      if (!attribute.conditions || attribute.conditions.length === 0) {
        newErrors.conditions = "At least one condition is required";
      } else {
        const hasInvalidCondition = attribute.conditions.some(
          (condition) => !condition.label.trim() || condition.score < 0
        );
        if (hasInvalidCondition) {
          newErrors.conditions =
            "All conditions must have a label and valid score";
        }
      }
    } else if (attribute.type === "numericRange") {
      if (!attribute.ranges || attribute.ranges.length === 0) {
        newErrors.ranges = "At least one range is required";
      } else {
        const hasInvalidRange = attribute.ranges.some(
          (range) => !range.label.trim() || range.score < 0
        );
        if (hasInvalidRange) {
          newErrors.ranges = "All ranges must have a label and valid score";
        }
      }
    }

    return newErrors;
  };

  const handleAddAttribute = () => {
    const newAttribute: Attribute = {
      id: Date.now().toString(),
      name: "",
      type: "masterData",
      description: "",
      conditions: [
        {
          id: Date.now().toString() + "-1",
          label: "",
          value: "",
          score: 0,
        },
      ],
    };

    setCurrentAttribute(newAttribute);
    setIsEditing(true);
    setErrors({});
  };

  const handleEditAttribute = (attribute: Attribute) => {
    setCurrentAttribute({ ...attribute });
    setIsEditing(true);
    setErrors({});
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
    if (currentAttribute?.id === id) {
      setCurrentAttribute(null);
      setIsEditing(false);
    }
  };

  const handleSaveAttribute = () => {
    if (!currentAttribute) return;

    const validationErrors = validateAttribute(currentAttribute);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const attributeIndex = attributes.findIndex(
      (attr) => attr.id === currentAttribute.id
    );

    if (attributeIndex >= 0) {
      // Update existing attribute
      const updatedAttributes = [...attributes];
      updatedAttributes[attributeIndex] = currentAttribute;
      setAttributes(updatedAttributes);
    } else {
      // Add new attribute
      setAttributes([...attributes, currentAttribute]);
    }

    setCurrentAttribute(null);
    setIsEditing(false);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setCurrentAttribute(null);
    setIsEditing(false);
    setErrors({});
  };

  const handleAttributeTypeChange = (type: AttributeType) => {
    if (!currentAttribute) return;

    const updatedAttribute: Attribute = {
      ...currentAttribute,
      type,
    };

    // Initialize appropriate fields based on type
    if (type === "masterData") {
      updatedAttribute.conditions = [
        {
          id: Date.now().toString(),
          label: "",
          value: "",
          score: 0,
        },
      ];
      delete updatedAttribute.ranges;
      delete updatedAttribute.validation;
    } else if (type === "numericRange") {
      updatedAttribute.ranges = [
        {
          id: Date.now().toString(),
          min: "",
          max: "",
          label: "",
          score: 0,
        },
      ];
      delete updatedAttribute.conditions;
      delete updatedAttribute.validation;
    } else if (type === "singleValue") {
      updatedAttribute.validation = {
        min: undefined,
        max: undefined,
        regex: undefined,
      };
      delete updatedAttribute.conditions;
      delete updatedAttribute.ranges;
    }

    setCurrentAttribute(updatedAttribute);
  };

  const handleAddCondition = () => {
    if (!currentAttribute || !currentAttribute.conditions) return;

    setCurrentAttribute({
      ...currentAttribute,
      conditions: [
        ...currentAttribute.conditions,
        {
          id: Date.now().toString(),
          label: "",
          value: "",
          score: 0,
        },
      ],
    });
  };

  const handleUpdateCondition = (
    id: string,
    field: keyof AttributeCondition,
    value: string | number
  ) => {
    if (!currentAttribute || !currentAttribute.conditions) return;

    const updatedConditions = currentAttribute.conditions.map((condition) =>
      condition.id === id ? { ...condition, [field]: value } : condition
    );

    setCurrentAttribute({
      ...currentAttribute,
      conditions: updatedConditions,
    });
  };

  const handleDeleteCondition = (id: string) => {
    if (!currentAttribute || !currentAttribute.conditions) return;

    setCurrentAttribute({
      ...currentAttribute,
      conditions: currentAttribute.conditions.filter(
        (condition) => condition.id !== id
      ),
    });
  };

  const handleAddRange = () => {
    if (!currentAttribute || !currentAttribute.ranges) return;

    setCurrentAttribute({
      ...currentAttribute,
      ranges: [
        ...currentAttribute.ranges,
        {
          id: Date.now().toString(),
          min: "",
          max: "",
          label: "",
          score: 0,
        },
      ],
    });
  };

  const handleUpdateRange = (
    id: string,
    field: keyof AttributeRange,
    value: string | number
  ) => {
    if (!currentAttribute || !currentAttribute.ranges) return;

    const updatedRanges = currentAttribute.ranges.map((range) =>
      range.id === id ? { ...range, [field]: value } : range
    );

    setCurrentAttribute({
      ...currentAttribute,
      ranges: updatedRanges,
    });
  };

  const handleDeleteRange = (id: string) => {
    if (!currentAttribute || !currentAttribute.ranges) return;

    setCurrentAttribute({
      ...currentAttribute,
      ranges: currentAttribute.ranges.filter((range) => range.id !== id),
    });
  };

  const handleUpdateValidation = (
    field: keyof NonNullable<Attribute["validation"]>,
    value: string | number | undefined
  ) => {
    if (!currentAttribute) return;

    setCurrentAttribute({
      ...currentAttribute,
      validation: {
        ...currentAttribute.validation,
        [field]: value,
      },
    });
  };

  const handleFinalSave = () => {
    onSave(variable, attributes);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Step 2: Attribute Configuration
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Configure attributes for:{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {variable.name}
              </span>
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onBack}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>
            <button
              onClick={handleFinalSave}
              disabled={attributes.length === 0}
              className={cn(
                "px-4 py-2 rounded-md flex items-center",
                attributes.length > 0
                  ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              )}
            >
              <Save size={16} className="mr-1" />
              Save All
            </button>
          </div>
        </div>

        {/* Attribute List */}
        {!isEditing && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Attributes
              </h3>
              <button
                onClick={handleAddAttribute}
                className="px-3 py-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white rounded-md flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Attribute
              </button>
            </div>

            {attributes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <p>
                  No attributes defined yet. Click "Add Attribute" to get
                  started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {attributes.map((attribute) => (
                  <div
                    key={attribute.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {attribute.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Type:{" "}
                          {attribute.type === "masterData"
                            ? "Master Data"
                            : attribute.type === "numericRange"
                            ? "Numeric Ranges"
                            : "Single Value"}
                        </p>
                        {attribute.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {attribute.description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditAttribute(attribute)}
                          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAttribute(attribute.id)}
                          className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Preview of conditions/ranges */}
                    {attribute.type === "masterData" &&
                      attribute.conditions && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Conditions:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {attribute.conditions.map((condition) => (
                              <div
                                key={condition.id}
                                className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded"
                              >
                                {condition.label}: {condition.score} points
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {attribute.type === "numericRange" && attribute.ranges && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Ranges:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {attribute.ranges.map((range) => (
                            <div
                              key={range.id}
                              className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded"
                            >
                              {range.label} ({range.min} - {range.max}):{" "}
                              {range.score} points
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Attribute Editor */}
        {isEditing && currentAttribute && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {currentAttribute.id ? "Edit Attribute" : "New Attribute"}
            </h3>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="attributeName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Attribute Name*
                </label>
                <input
                  type="text"
                  id="attributeName"
                  value={currentAttribute.name}
                  onChange={(e) =>
                    setCurrentAttribute({
                      ...currentAttribute,
                      name: e.target.value,
                    })
                  }
                  className={cn(
                    "w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  placeholder="e.g., Age, Education Level, Income"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="attributeType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Attribute Type*
                </label>
                <select
                  id="attributeType"
                  value={currentAttribute.type}
                  onChange={(e) =>
                    handleAttributeTypeChange(e.target.value as AttributeType)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="masterData">Master Data (Dropdown)</option>
                  <option value="numericRange">Numeric Ranges</option>
                  <option value="singleValue">Single Value Input</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="attributeDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description
              </label>
              <textarea
                id="attributeDescription"
                value={currentAttribute.description}
                onChange={(e) =>
                  setCurrentAttribute({
                    ...currentAttribute,
                    description: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe this attribute and how it's used in scoring..."
              />
            </div>

            {/* Type-specific fields */}
            {currentAttribute.type === "masterData" && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dropdown Options*
                  </label>
                  <div className="flex space-x-2">
                    <div>
                      <label
                        htmlFor="dataSourcePath"
                        className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                      >
                        Data Source (Optional)
                      </label>
                      <input
                        type="text"
                        id="dataSourcePath"
                        value={currentAttribute.dataSourcePath || ""}
                        onChange={(e) =>
                          setCurrentAttribute({
                            ...currentAttribute,
                            dataSourcePath: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md"
                        placeholder="API path or file location"
                      />
                    </div>
                    <button
                      onClick={handleAddCondition}
                      className="px-2 py-1 h-8 mt-auto bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center text-xs"
                    >
                      <Plus size={14} className="mr-1" />
                      Add Option
                    </button>
                  </div>
                </div>

                {errors.conditions && (
                  <p className="mt-1 mb-2 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.conditions}
                  </p>
                )}

                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Label
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentAttribute.conditions?.map((condition) => (
                        <tr key={condition.id}>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={condition.label}
                              onChange={(e) =>
                                handleUpdateCondition(
                                  condition.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                              placeholder="e.g., Professional Qualification"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={condition.value}
                              onChange={(e) =>
                                handleUpdateCondition(
                                  condition.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                              placeholder="e.g., prof_qual"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={condition.score}
                              onChange={(e) =>
                                handleUpdateCondition(
                                  condition.id,
                                  "score",
                                  Number(e.target.value)
                                )
                              }
                              min="0"
                              max="100"
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() =>
                                handleDeleteCondition(condition.id)
                              }
                              disabled={
                                currentAttribute.conditions?.length === 1
                              }
                              className={cn(
                                "p-1 rounded-md",
                                currentAttribute.conditions?.length === 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                              )}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentAttribute.type === "numericRange" && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Numeric Ranges*
                  </label>
                  <button
                    onClick={handleAddRange}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center text-xs"
                  >
                    <Plus size={14} className="mr-1" />
                    Add Range
                  </button>
                </div>

                {errors.ranges && (
                  <p className="mt-1 mb-2 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.ranges}
                  </p>
                )}

                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Label
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Min Value
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Max Value
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {currentAttribute.ranges?.map((range) => (
                        <tr key={range.id}>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={range.label}
                              onChange={(e) =>
                                handleUpdateRange(
                                  range.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                              placeholder="e.g., 25-35 years"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={range.min}
                              onChange={(e) =>
                                handleUpdateRange(
                                  range.id,
                                  "min",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                              placeholder="e.g., 25"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={range.max}
                              onChange={(e) =>
                                handleUpdateRange(
                                  range.id,
                                  "max",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                              placeholder="e.g., 35"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={range.score}
                              onChange={(e) =>
                                handleUpdateRange(
                                  range.id,
                                  "score",
                                  Number(e.target.value)
                                )
                              }
                              min="0"
                              max="100"
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => handleDeleteRange(range.id)}
                              disabled={currentAttribute.ranges?.length === 1}
                              className={cn(
                                "p-1 rounded-md",
                                currentAttribute.ranges?.length === 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
                              )}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentAttribute.type === "singleValue" && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Validation Rules (Optional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="validationRegex"
                      className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >
                      Regex Pattern
                    </label>
                    <input
                      type="text"
                      id="validationRegex"
                      value={currentAttribute.validation?.regex || ""}
                      onChange={(e) =>
                        handleUpdateValidation("regex", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="e.g., ^[A-Za-z0-9]+$"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="validationMin"
                      className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >
                      Minimum Value
                    </label>
                    <input
                      type="number"
                      id="validationMin"
                      value={currentAttribute.validation?.min || ""}
                      onChange={(e) =>
                        handleUpdateValidation(
                          "min",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="e.g., 0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="validationMax"
                      className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >
                      Maximum Value
                    </label>
                    <input
                      type="number"
                      id="validationMax"
                      value={currentAttribute.validation?.max || ""}
                      onChange={(e) =>
                        handleUpdateValidation(
                          "max",
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAttribute}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white rounded-md"
              >
                Save Attribute
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
