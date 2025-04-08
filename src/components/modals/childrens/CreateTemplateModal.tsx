import React, { useEffect } from "react";
import { useModal } from "../../../hooks/useModal";

interface TemplateData {
  name: string;
  description: string;
}

interface CreateTemplateModalProps {
  hanldeSave: (templateData: TemplateData) => Promise<void>;
  exisitingTemplate?: TemplateData;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  hanldeSave,
}: CreateTemplateModalProps) => {
  const { closeModal } = useModal();
  const [formData, setFormData] = React.useState<TemplateData>({
    name: "",
    description: "",
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Template Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            placeholder="Enter template name"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            rows={3}
            placeholder="Enter template description"
          />
        </div>
      </div>
      <div className="p-4 border-t dark:border-gray-700 rounded-b-xl bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await hanldeSave(formData);
              closeModal();
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all"
          >
            Save Template
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTemplateModal;
