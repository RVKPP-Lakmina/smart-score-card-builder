import * as React from "react";
import { PlusCircle, Save, X } from "lucide-react";
import { useModal } from "../../../hooks/useModal";
import { NoRecords } from "../../ui/DataNotFound";
import { Button } from "../../ui/Button";

interface ScoreCardItem {
  id: string;
  label: string;
  score: number;
}

interface ScoreCardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialItems?: ScoreCardItem[];
  onSave?: (items: ScoreCardItem[]) => void;
}

export default function ScoreCardEditorModal({
  initialItems = [],
  onSave,
}: ScoreCardEditorModalProps) {
  const [items, setItems] = React.useState<ScoreCardItem[]>([]);
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const { closeModal: onClose } = useModal();

  const generateId = () => {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const addItem = (index: number) => {
    const newItem: ScoreCardItem = {
      id: generateId(),
      label: "",
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
    field: keyof ScoreCardItem,
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
    onClose();
  };

  return (
    <div>
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        {items.length ? (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Score"
                />

                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <NoRecords
            variant="centered"
            action={
              <Button
                onClick={() => addItem(items.length)}
                className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Record
              </Button>
            }
          />
        )}
      </div>
      <div className="flex justify-end p-4 border-t border-gray-700">
        <Button
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
