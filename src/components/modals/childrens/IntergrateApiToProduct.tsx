import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Button } from "../../ui/Button";
import { SelectableList } from "../../ui/SeletableList";
import Spinner from "../../ui/Loader";
import { arraysAreEqualAsSets } from "../../../lib/util";

interface IntergrateApiToProductProps {
  availableApis: { id: string; name: string; type: string; status: string }[];
  selectedProduct: {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
    lastEdited?: string;
    lastEditedBy?: string;
    createdBy?: string;
    countOfEdits?: number;
  } | null;
  handleAddApis: (selectedApiIds: string[]) => void;
  selectedIds: string[];
}

const IntergrateApiToProduct: React.FC<IntergrateApiToProductProps> = ({
  selectedProduct,
  availableApis,
  selectedIds,
  handleAddApis,
}: IntergrateApiToProductProps) => {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApiIds, setSelectedApiIds] = useState<string[]>([]);

  useEffect(() => {
    if (
      selectedIds &&
      selectedIds.length > 0 &&
      arraysAreEqualAsSets(selectedIds, selectedApiIds)
    ) {
      setSelectedApiIds(selectedIds);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Select APIs to integrate with{" "}
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {selectedProduct?.name}
        </span>
      </p>

      <SelectableList
        items={availableApis.map((api) => ({
          id: api.id,
          name: `${api.name} (${api.type}) - ${api.status}`,
        }))}
        selectedIds={selectedApiIds}
        onChange={setSelectedApiIds}
        variant="default"
      />

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleAddApis(selectedApiIds);
            closeModal();
          }}
          disabled={selectedApiIds.length === 0}
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500"
        >
          Add Selected APIs
        </Button>
      </div>
    </div>
  );
};

export default IntergrateApiToProduct;
