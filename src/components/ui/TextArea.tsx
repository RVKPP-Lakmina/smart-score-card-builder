interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  required?: boolean;
}

const TextArea: React.FC<TextFieldProps> = ({
  label,
  required = false,
  ...rest
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
      <textarea
        id={id}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
        placeholder={`Enter ${label.toLowerCase()}`}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
