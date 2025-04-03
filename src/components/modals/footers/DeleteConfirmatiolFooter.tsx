import React from "react";
import { useModal } from "../../../hooks/useModal";

interface DeleteConfirmatiolFooterProps {
  handleDelete: () => Promise<void>;
}

const DeleteConfirmatiolFooter: React.FC<DeleteConfirmatiolFooterProps> = ({
  handleDelete,
}: DeleteConfirmatiolFooterProps) => {
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    try {
      await handleDelete();
    } catch (error) {
      console.error("Error deleting template.", error);
    }

    setIsDeleting(false);
    closeModal();
  };

  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={closeModal}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
        disabled={isDeleting}
      >
        Cancel
      </button>
      <button
        onClick={handleDeleteClick}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition-all disabled:opacity-50"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteConfirmatiolFooter;
