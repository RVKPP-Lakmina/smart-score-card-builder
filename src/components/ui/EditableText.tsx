import { useEffect, useState } from "react";
import { cn } from "../../lib/util";

interface EditableTextProps {
  label: string;
  onValueChange: (value: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  label,
  onValueChange,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(label);

  const handleDoubleClick = () => {
    setIsEditing(true);
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

    if (!input) {
      setText("");
      onValueChange("");
      return;
    }

    // Convert to decimal: input 5 becomes 0.5
    const number = Number(`0.${input.replace(".", "")}`);

    if (isNaN(number)) {
      setText("");
      onValueChange("");
      return;
    }

    const formattedValue = number.toFixed(3);

    setText(formattedValue);
    onValueChange(formattedValue);
  };

  const handleBlur = () => {
    onValueChange(text);
    setIsEditing(false);
  };

  return (
    <div className="text-btn">
      {isEditing && (
        <input
          type="number"
          onChange={handleChange}
          min={0}
          max={1}
          step={0.001}
          onBlur={handleBlur}
          className={cn(
            "w-16 p-1 rounded-md dark:bg-gray-800 dark:text-white text-right",
            "border border-sky-500 dark:border-sky-500",
            "focus:border-sky-500 focus:outline focus:outline-sky-500"
          )}
        />
      )}

      {!isEditing && (
        <span className={cn("text-gray-400")} onDoubleClick={handleDoubleClick}>
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableText;
