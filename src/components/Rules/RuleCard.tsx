import { PlusCircle, X } from "lucide-react";
import { Button } from "../ui/Button";
import { NoRecords } from "../ui/DataNotFound";
import { RuleBoxWrapper } from "./RuleWrapBox";
import { Properties, RuleWithId } from "../../types/rules";
import React, { useEffect } from "react";

const RuleCard = ({
  rule,
  id,
  title,
  onSave,
}: {
  rule: RuleWithId;
  id: string;
  title: string;
  onSave?: (items: Properties[]) => void;
}) => {
  const [items, setItems] = React.useState<Properties[]>([]);
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setItems(rule.properties || []);
  }, [rule.properties]);

  const addItem = (index: number) => {
    const newItem: Properties = {
      id: `item_${Date.now()}_${Math.random().toString(36)}`,
      name: "",
      score: 0,
    };

    const newItems = [...items];
    newItems.splice(index + 1, 0, newItem);
    setItems(newItems);
    setFocusIndex(index + 1);

    setTimeout(() => {
      inputRefs.current[index + 1]?.focus();
    }, 0);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateItem = (
    index: number,
    field: keyof Properties,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(index);
    }
  };

  const handleSave = () => {
    onSave?.(items);
  };

  return (
    <RuleBoxWrapper
      id={`${id}-RuleCard-RuleBoxWrapper`}
      title={title}
      value={0}
      sectionScore={rule.sectionWeight}
      modalScore={rule.modelWeight}
    >
      <ul className="flex flex-col gap-2 mt-1">
        {(rule.properties || []).length ? (
          <>
            {items.map((item, index) => (
              <li key={item.id} className="flex items-center space-x-2">
                <span className="text-gray-500">{index + 1}.</span>
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="flex-1 px-3 py-2  border border-gray-600 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter criteria"
                  autoFocus={focusIndex === index}
                />
                <input
                  type="number"
                  value={item.score}
                  onChange={(e) =>
                    updateItem(index, "score", Number(e.target.value))
                  }
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="w-20 px-3 py-2  border border-gray-600 rounded-md  text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Score"
                />

                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </>
        ) : (
          <NoRecords
            variant="centered"
            action={
              <Button
                // onClick={addNewRule}
                className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Record
              </Button>
            }
          />
        )}
      </ul>
    </RuleBoxWrapper>
  );
};

export default RuleCard;
