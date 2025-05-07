import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  required = false,
  ...TextFieldProps
}: TextFieldProps) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
        {required && (
          <span className="text-red-500" title="This field is required">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type="text"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        placeholder={`Enter ${label.toLowerCase()}`}
        {...TextFieldProps}
      />
    </div>
  );
};

export default TextField;
