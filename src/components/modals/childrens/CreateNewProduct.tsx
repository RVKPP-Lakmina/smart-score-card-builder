import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Button } from "../../ui/Button";
import TextField from "../../ui/TextField";
import TextArea from "../../ui/TextArea";

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
    if (!newProduct.name || !newProduct.description) {
      return alert("Please fill in all fields.");
    }

    await handleCreateProduct(newProduct);
    closeModal();
  };

  return (
    <div className="space-y-4">
      <TextField
        label="Product Name"
        required={true}
        value={newProduct.name as string}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Enter product name"
      />
      <TextArea
        label="Product Description"
        required={true}
        value={newProduct.description as string}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        rows={3}
        placeholder="Enter product description"
      />
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
