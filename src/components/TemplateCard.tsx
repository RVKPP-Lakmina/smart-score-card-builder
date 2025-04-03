import { Edit, Copy, Info, Trash2 } from "lucide-react";
import moment from "moment";
import { useModal } from "../hooks/useModal";

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    lastEdited: string;
  };
}

function TemplateCard({ template }: TemplateCardProps) {
  const { openModal } = useModal();

  const handleDelete = () => {
    openModal({
      title: "Delete Template",
      childrenkey: "sampleDelete",
      footer: (
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
            // disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            // onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition-all disabled:opacity-50"
            // disabled={isDeleting}
          >
            Delete
            {/* {isDeleting ? "Deleting..." : "Delete"} */}
          </button>
        </div>
      ),
      size: "sm",
      closeOnOutsideClick: false,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center mb-4 gap-5">
            <h4 className="text-lg font-semibold">{template.name}</h4>
            <Info
              className="ml-2 opacity-0 text-green-500 dark:text-green-400
              cursor-pointer
              group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 ease-in-out
            "
              size={16}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last edited: {template.lastEdited}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Edited: 4 times
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Created At: {moment().fromNow()}
          </p>
        </div>

        <div className="flex flex-col space-y-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out justify-between">
          <button className="p-2 text-blue-500 hover:bg-blue-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md">
            <Edit size={18} />
          </button>
          <button className="p-2 text-green-500 hover:bg-green-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md">
            <Copy size={18} />
          </button>
          <button
            onClick={handleDelete}
            className=" p-2 text-red-500 hover:bg-green-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard as React.FC<TemplateCardProps>;
