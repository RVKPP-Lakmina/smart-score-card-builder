import { useEffect, useMemo, useState } from "react";
import { PropertiesEnhanced, RuleEnhancedWithId } from "../../types/rules";
import {
  ArrowLeft,
  CircleCheckBig,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { NoRecords } from "../ui/DataNotFound";
import { Button } from "../ui/Button";
import { cn } from "../../lib/util";

type Variable = RuleEnhancedWithId;

type AttributeConfigurationProps = {
  variable: Variable;
  onSave?: (variable: Variable, attributes: Variable[]) => void;
  onBack?: () => void;
};

const AttributeConfigurationMasterData: React.FC<
  AttributeConfigurationProps
> = ({ variable, onBack }: AttributeConfigurationProps) => {
  const [conditions, setConditions] = useState<
    Record<string, PropertiesEnhanced>
  >({} as Record<string, PropertiesEnhanced>);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (variable) {
      const initialConditions = variable.properties.reduce(
        (
          acc: Record<string, PropertiesEnhanced>,
          condition: PropertiesEnhanced
        ) => {
          acc[condition.id] = condition;
          return acc;
        },
        {}
      );
      setConditions(initialConditions);
    }
  }, [variable]);

  const lengthOfRanges: number = useMemo(() => {
    return Object.keys(conditions).length;
  }, [conditions]);

  const addCondition = () => {
    const newCondition: PropertiesEnhanced = {
      id: Date.now().toString(),
      label: "",
      value: "",
      score: 0,
      name: "",
    };
    setConditions((prevConditions) => ({
      ...prevConditions,
      [newCondition.id]: newCondition,
    }));
  };

  const removeCondition = (id: string) => {
    setConditions((prevConditions) => {
      const newConditions = { ...prevConditions };
      delete newConditions[id];
      return newConditions;
    });
  };

  const updateCondition = (
    id: string,
    dataKey: string,
    value: string | number
  ) => {
    setConditions((prevConditions) => ({
      ...prevConditions,
      [id]: {
        ...prevConditions[id],
        [dataKey]: value,
      },
    }));

    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const onSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className={cn("flex items-center  text-blue-500 ")}
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Conditions</h3>
        <button
          onClick={isEditing ? onSave : addCondition}
          className={cn(
            "flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all",
            lengthOfRanges > 0 &&
              "opacity-100 transition-opacity ease-in-out duration-75 ",
            lengthOfRanges === 0 && "opacity-0 cursor-not-allowed"
          )}
        >
          {isEditing ? (
            <>
              <CircleCheckBig size={18} className="mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Plus size={18} className="mr-2" />
              New Condition
            </>
          )}
        </button>
      </div>

      {lengthOfRanges === 0 ? (
        <NoRecords
          className={cn(lengthOfRanges !== 0 ? "hidden" : "visible")}
          variant="centered"
          action={
            <Button
              onClick={addCondition}
              className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add Your First Condition
            </Button>
          }
        />
      ) : (
        <div
          className="space-y-4"
          style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
        >
          {Object.values(conditions).map((condition) => (
            <div
              key={condition.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Condition</h4>
                <button
                  onClick={() => removeCondition(condition.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={condition.label}
                    onChange={(e) =>
                      updateCondition(condition.id, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    placeholder="Display label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(condition.id, "value", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    placeholder="Actual value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    value={condition.score}
                    onChange={(e) =>
                      updateCondition(
                        condition.id,
                        "score",
                        Number(e.target.value)
                      )
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
  );
};

export default AttributeConfigurationMasterData;
