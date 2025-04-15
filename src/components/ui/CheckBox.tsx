import { Check } from "lucide-react";
import { cn } from "../../lib/util";
import React from "react";

interface SelectableItem {
  title: string;
  checked: boolean;
  variant?: "default" | "card" | "compact";
  handleToggle: () => void;
  disabled?: boolean;
  className?: CSSModuleClasses | string;
}

export const CheckButton: React.FC<SelectableItem> = ({
  title,
  variant = "default",
  handleToggle,
  checked,
  disabled = false,
  className,
}: SelectableItem) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked((prev) => !prev);
    handleToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full text-left flex items-center",
        variant === "compact" ? "px-3 py-2" : "px-4 py-3",
        className,
        isChecked
          ? "bg-blue-50 dark:bg-blue-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-750",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border mr-3 flex items-center justify-center",
          className,
          isChecked
            ? "bg-gradient-to-r from-blue-500 to-green-400 border-transparent"
            : "border-gray-300 dark:border-gray-600"
        )}
      >
        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
        {title}
      </span>
    </button>
  );
};

export const CheckBox: React.FC<SelectableItem> = ({
  title,
  variant = "default",
  handleToggle,
  checked,
  disabled = false,
  className,
}: SelectableItem) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked((prev) => !prev);
    handleToggle();
  };

  return (
    <div
      className={cn(
        "w-full text-left flex items-center",
        variant === "compact" ? "px-3 py-2" : "px-4 py-3",
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div
        onClick={handleClick}
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded border mr-3 cursor-pointer flex items-center justify-center",
          className,
          isChecked
            ? "bg-gradient-to-r from-blue-500 to-green-400 border-transparent"
            : "border-gray-300 dark:border-gray-600"
        )}
      >
        {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
        {title}
      </span>
    </div>
  );
};
