import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/util";
import { CheckBox } from "./CheckBox";
import { Search } from "./SearchBox";

export interface SelectableItem {
  id: string;
  name: string;
}

interface SelectableListProps {
  items: SelectableItem[];
  selectedIds?: string[];
  onChange?: (selectedIds: string[]) => void;
  className?: CSSModuleClasses;
  variant?: "default" | "card" | "compact";
  maxHeight?: string;
  disabled?: boolean;
}

export function SelectableList({
  items,
  selectedIds = [],
  onChange,
  className,
  variant = "default",
  maxHeight = "max-h-[300px]",
  disabled = false,
}: SelectableListProps) {
  const [selected, setSelected] = React.useState<string[]>(selectedIds || []);
  const [list, setList] = React.useState<SelectableItem[]>(items || []);

  React.useEffect(() => {
    setList(items);
  }, [items]);

  // Update internal state when selectedIds prop changes
  React.useEffect(() => {
    setSelected(selectedIds);
  }, [selectedIds]);

  const handleToggle = (id: string) => {
    if (disabled) return;

    const newSelected = selected.includes(id)
      ? selected.filter((itemId) => itemId !== id)
      : [...selected, id];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const isSelected = (id: string) => selected.includes(id);

  const handleSeclectAll = () => {
    if (disabled || !items.length) return;

    let newSelected: string[] = [];

    if (items.length !== selected.length) {
      newSelected = items.map((item) => item.id);
    }

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let filteredItems = items;

    if (!disabled || value) {
      filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setList(filteredItems);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex-1 flex items-center justify-center">
          <CheckBox
            title={"Select All"}
            checked={Boolean(items.length && items.length === selected.length)}
            handleToggle={handleSeclectAll}
          />
        </div>

        <div className="flex-2 flex items-center justify-center">
          <Search size="sm" onChange={onSearch} />
        </div>

        {Boolean(selectedIds.length || selected.length) && (
          <span className="flex-1 flex justify-end text-right font-medium text-gray-900 dark:text-gray-100">
            Seleted: {selectedIds.length || selected.length} of {items.length}
          </span>
        )}
      </div>
      <div
        className={cn(
          "overflow-y-auto",
          maxHeight,
          "rounded-md border border-gray-200 dark:border-gray-700",
          "bg-white dark:bg-gray-800",
          className
        )}
      >
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.length === 0 ? (
            <li className="p-4 text-center text-gray-500 dark:text-gray-400">
              No items available
            </li>
          ) : (
            <>
              {list.map((item) => {
                return (
                  <li key={item.id}>
                    <CheckBox
                      title={item.name}
                      variant={variant}
                      handleToggle={() => handleToggle(item.id)}
                      checked={isSelected(item.id)}
                      disabled={disabled}
                    />
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export function SelectableCardList({
  items,
  selectedIds,
  onChange,
  className,
  disabled,
}: Omit<SelectableListProps, "variant">) {
  const [selected, setSelected] = React.useState<string[]>(selectedIds || []);

  React.useEffect(() => {
    setSelected(selectedIds || []);
  }, [selectedIds]);

  const handleToggle = (id: string) => {
    if (disabled) return;

    const newSelected = selected.includes(id)
      ? selected.filter((itemId) => itemId !== id)
      : [...selected, id];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const isSelected = (id: string) => selected.includes(id);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",
        className
      )}
    >
      {items.length === 0 ? (
        <div className="col-span-full p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md">
          No items available
        </div>
      ) : (
        items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleToggle(item.id)}
            disabled={disabled}
            className={cn(
              "p-4 rounded-md border text-left transition-all",
              isSelected(item.id)
                ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded border mr-3 flex items-center justify-center",
                  isSelected(item.id)
                    ? "bg-gradient-to-r from-blue-500 to-green-400 border-transparent"
                    : "border-gray-300 dark:border-gray-600"
                )}
              >
                {isSelected(item.id) && (
                  <Check className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
                {item.name}
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
