import { Check } from "lucide-react";
import { useModal } from "../../../hooks/useModal";
import { Button } from "../../ui/Button";
import { useEffect, useState } from "react";
import { ItemsDDWithDescription } from "../../../types/anyTypes";
import Spinner from "../../ui/Loader";

interface MapTemplateToProductProps {
  templates: ItemsDDWithDescription[];
  handleMapTemplate: (selectedTemplateId: string) => void;
  selectedProduct: {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    lastEdited?: string;
    lastEditedBy?: string;
    createdBy?: string;
    countOfEdits?: number;
    templateId?: string;
  } | null;
}

const MapTemplateToProduct = ({
  templates,
  handleMapTemplate,
  selectedProduct,
}: MapTemplateToProductProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    setSelectedTemplateId(selectedProduct?.templateId || null);

    setIsLoading(false);
  }, [selectedProduct?.templateId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Select a template to map to{" "}
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {selectedProduct?.name}
        </span>
      </p>

      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 cursor-pointer ${
              selectedTemplateId === template.id
                ? "bg-blue-50 dark:bg-blue-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-750"
            }`}
            onClick={() => setSelectedTemplateId(template.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                  selectedTemplateId === template.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {selectedTemplateId === template.id && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {template.name}
                </h4>
                {Boolean(template?.description) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {template.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleMapTemplate(selectedTemplateId || "");
            closeModal();
          }}
          disabled={!selectedTemplateId}
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500"
        >
          Map Template
        </Button>
      </div>
    </div>
  );
};

export default MapTemplateToProduct;
