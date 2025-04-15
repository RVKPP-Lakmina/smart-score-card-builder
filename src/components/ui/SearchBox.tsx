import * as React from "react";
import { SearchIcon, X } from "lucide-react";
import { cn } from "../../lib/util";

interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  showClearButton?: boolean;
  variant?: "default" | "minimal" | "filled";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      containerClassName,
      iconClassName,
      onSearch,
      onClear,
      showClearButton = true,
      variant = "default",
      size = "md",
      loading = false,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState<string>(
      (value as string) || ""
    );
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(ref, inputRef);

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value as string);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInputValue(newValue);
      }

      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(inputValue);
      }
    };

    const handleClear = () => {
      if (value === undefined) {
        setInputValue("");
      }
      onClear?.();
      inputRef.current?.focus();
    };

    const containerClasses = cn(
      "relative flex items-center w-full",
      {
        "border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden":
          variant === "default",
        "bg-gray-100 dark:bg-gray-800 rounded-md": variant === "filled",
        "border-b border-gray-300 dark:border-gray-700 rounded-none":
          variant === "minimal",

        "h-8": size === "sm",
        "h-10": size === "md",
        "h-12": size === "lg",
      },
      containerClassName
    );

    const inputClasses = cn(
      "flex-1 bg-transparent outline-none",
      {
        "px-3": variant === "default" || variant === "filled",
        "pl-0 pr-3": variant === "minimal",

        "text-sm": size === "sm",
        "text-base": size === "md",
        "text-lg": size === "lg",
      },
      "placeholder:text-gray-500 dark:placeholder:text-gray-400",
      "text-gray-900 dark:text-gray-100",
      "focus:outline-none",
      className
    );

    const iconContainerClasses = cn(
      "flex items-center justify-center flex-shrink-0",
      {
        "px-3": variant === "default" || variant === "filled",
        "pr-3": variant === "minimal",

        "w-8": size === "sm",
        "w-10": size === "md",
        "w-12": size === "lg",
      },
      iconClassName
    );

    return (
      <div className={containerClasses}>
        <div className={iconContainerClasses}>
          <SearchIcon
            className={cn("text-gray-500 dark:text-gray-400", {
              "w-3.5 h-3.5": size === "sm",
              "w-4 h-4": size === "md",
              "w-5 h-5": size === "lg",
            })}
          />
        </div>
        <input
          ref={mergedRef}
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={inputClasses}
          {...props}
        />
        {showClearButton && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "flex items-center justify-center flex-shrink-0",
              "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
              "rounded-full",
              {
                "p-0.5 mr-1.5": size === "sm",
                "p-1 mr-2": size === "md",
                "p-1 mr-3": size === "lg",
              }
            )}
            aria-label="Clear search"
          >
            <X
              className={cn({
                "w-3 h-3": size === "sm",
                "w-4 h-4": size === "md",
                "w-5 h-5": size === "lg",
              })}
            />
          </button>
        )}
        {loading && (
          <div
            className={cn("flex-shrink-0", {
              "mr-1.5": size === "sm",
              "mr-2": size === "md",
              "mr-3": size === "lg",
            })}
          >
            <div
              className={cn(
                "animate-spin rounded-full border-2 border-gray-300 border-t-blue-500",
                {
                  "w-3 h-3": size === "sm",
                  "w-4 h-4": size === "md",
                  "w-5 h-5": size === "lg",
                }
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

Search.displayName = "Search";

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  return React.useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as React.RefObject<T>).current = value;
        }
      });
    },
    [refs]
  );
}
