import { Plus } from "lucide-react";

interface RuleEditorHeaderProps {
  items: { id: string; label: string; score: number }[];
  addItem: (index: number) => void;
}

const RuleEditorHeader: React.FC<RuleEditorHeaderProps> = ({
  items,
  addItem,
}: RuleEditorHeaderProps) => {
  return (
    <button
      onClick={() => addItem(items.length - 1)}
      className="p-1 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
      aria-label="Add item"
    >
      <Plus size={18} />
    </button>
  );
};

export default RuleEditorHeader;
