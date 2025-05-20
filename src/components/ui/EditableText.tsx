import { useEffect, useState } from "react";
import { cn } from "../../lib/util";

interface EditableTextProps {
  label: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  label,
  onValueChange,
  disabled = false,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(label);

  useEffect(() => {
    if (label.toString() !== text.toString()) {
      setText(label);
    }
  }, [label, text]);

  const handleDoubleClick = () => {
    if (disabled) {
      return;
    }

    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing) {
        setIsEditing(false);
      }
      if (event.key === "Escape" && isEditing) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (input === "") {
      setText("");
      onValueChange("");
      return;
    }

    if (!/^\d{0,3}$/.test(input)) {
      return;
    }

    const number = Number(input);

    if (number < 0 || number > 100) {
      return;
    }

    setText(input);
    onValueChange(input);
  };

  const handleBlur = () => {
    onValueChange(text);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "text-btn",
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      )}
    >
      {isEditing && (
        <div
          className={cn(
            "flex items-center space-x-1",
            "w-16 p-1 rounded-md dark:bg-gray-800 dark:text-white text-right",
            "border border-sky-500 dark:border-sky-500",
            "focus:border-sky-500 focus:outline focus:outline-sky-500"
          )}
        >
          <input
            value={text}
            onChange={handleChange}
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            onBlur={handleBlur}
            className="w-full bg-transparent text-right focus:outline-none"
          />
          <span className="text-gray-700 dark:text-white">%</span>
        </div>
      )}

      {!isEditing && (
        <span className={cn("text-gray-400")} onDoubleClick={handleDoubleClick}>
          {text}%
        </span>
      )}
    </div>
  );
};

export default EditableText;
