import { useState, useEffect, useMemo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { PropertiesEnhanced, RuleEnhancedWithId } from "../../types/rules";
import { cn } from "../../lib/util";
import { Button } from "../ui/Button";
import { NoRecords } from "../ui/DataNotFound";

type Variable = RuleEnhancedWithId;

type AttributeConfigurationProps = {
  variable: Variable;
  onSave?: (variable: Variable, attributes: Variable[]) => void;
  onBack?: () => void;
};

const defaultRange: PropertiesEnhanced = {
  id: Date.now().toString(),
  name: "",
  label: "",
  min: 0,
  max: 0,
  score: 0,
};

export function AttributeConfiguration({
  variable,
}: // onSave,
AttributeConfigurationProps) {
  const [ranges, setRanges] = useState<Record<string, PropertiesEnhanced>>(
    {} as Record<string, PropertiesEnhanced>
  );
  // const [isEditing, setIsEditing] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string>>({});

  const lengthOfRanges: number = useMemo(() => {
    return Object.keys(ranges).length;
  }, [ranges]);

  useEffect(() => {
    if (variable) {
      const initialRanges = variable.properties.reduce(
        (
          acc: Record<string, PropertiesEnhanced>,
          range: PropertiesEnhanced
        ) => {
          acc[range.id] = range;
          return acc;
        },
        {}
      );
      setRanges(initialRanges);
    }
  }, [variable]);

  const updateRange = (id: string, dataKey: string, value: string | number) => {
    setRanges((prevRanges) => ({
      ...prevRanges,
      [id]: {
        ...prevRanges[id],
        [dataKey]: value,
      },
    }));
  };

  const removeRange = (id: string) => {
    setRanges((prevRanges) => {
      const newRanges = { ...prevRanges };
      delete newRanges[id];
      return newRanges;
    });
  };

  const addRange = () => {
    const newRange = { ...defaultRange, id: Date.now().toString() };
    setRanges((prevRanges) => ({
      ...prevRanges,
      [newRange.id]: newRange,
    }));
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
        </div>
        {lengthOfRanges === 0 ? (
          <NoRecords
            className={cn(lengthOfRanges !== 0 ? "hidden" : "visible")}
            variant="centered"
            action={
              <Button
                onClick={addRange}
                className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Your First Range
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {Object.values(ranges).map((range) => (
              <div
                key={range.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Range</h4>
                  <button
                    onClick={() => removeRange(range.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Min Value
                    </label>
                    <input
                      type="text"
                      value={range.min}
                      onChange={(e) =>
                        updateRange(range.id, "min", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Minimum value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Max Value
                    </label>
                    <input
                      type="text"
                      value={range.max}
                      onChange={(e) =>
                        updateRange(range.id, "max", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Maximum value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={range.label}
                      onChange={(e) =>
                        updateRange(range.id, "label", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Display label"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Score
                    </label>
                    <input
                      type="number"
                      value={range.score}
                      onChange={(e) =>
                        updateRange(range.id, "score", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      placeholder="Score value"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
