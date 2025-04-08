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
  const [text] = useState(label);

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
    const value = Number(event.target.value || 0.0);
    if (value > 1) event.target.value = "1.00";
    if (value < 0) event.target.value = "0.00";
    onValueChange(event.target.value);
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
          onBlur={handleBlur}
          className={cn(
            "w-16 p-1 rounded-md dark:bg-gray-800 dark:text-white text-right",
            "focus:outline-none",
            "border-none"
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
