import { useState } from "react";

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
  // const [isFocused, setIsFocused] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

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
      {isEditing ? (
        <input
          value={text || "0.00"}
          type="number"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            if (value > 1) e.target.value = "1.00";
            if (value < 0) e.target.value = "0.00";
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span className="text-gray-400" onDoubleClick={handleDoubleClick}>
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableText;
