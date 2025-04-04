import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/util";

interface ToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: "default" | "blue-green";
  size?: "sm" | "md" | "lg";
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked = false,
      onCheckedChange,
      disabled = false,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleClick = () => {
      if (disabled) return;

      const newValue = !isChecked;
      setIsChecked(newValue);
      onCheckedChange?.(newValue);
    };

    const sizeClasses = {
      sm: "w-8 h-4",
      md: "w-12 h-6",
      lg: "w-16 h-8",
    };

    const thumbSizeClasses = {
      sm: "w-3 h-3",
      md: "w-5 h-5",
      lg: "w-7 h-7",
    };

    const iconSizeClasses = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
    };

    const variantClasses = {
      default: "bg-indigo-600",
      "blue-green": "bg-gradient-to-r from-blue-500 to-green-400",
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={handleClick}
        ref={ref}
        className={cn(
          "relative inline-flex items-center shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          isChecked ? variantClasses[variant] : "bg-gray-200 dark:bg-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            thumbSizeClasses[size],
            isChecked
              ? "translate-x-9 flex items-center justify-center"
              : "translate-x-0"
          )}
        >
          {isChecked && (
            <Check className={cn("text-indigo-600", iconSizeClasses[size])} />
          )}
        </span>
      </button>
    );
  }
);

Toggle.displayName = "Toggle";
