import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Button } from "../../ui/Button";

interface CreateNewProductProps {
  handleCreateProduct: (params: {
    name: string;
    description: string;
  }) => Promise<void>;
}

const CreateNewProduct: React.FC<CreateNewProductProps> = ({
  handleCreateProduct,
}: CreateNewProductProps) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
  });
  const { closeModal } = useModal();

  const handleSaveProduct = async () => {
    await handleCreateProduct(newProduct);
    closeModal();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          placeholder="Enter product name"
        />
      </div>
      <div>
        <label
          htmlFor="productDescription"
          className="block text-sm font-medium mb-1"
        >
          Description
        </label>
        <textarea
          id="productDescription"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          rows={3}
          placeholder="Enter product description"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveProduct}
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500"
        >
          Create Product
        </Button>
      </div>
    </div>
  );
};

export default CreateNewProduct;
