const DeleteConfirmationModal = () => {
  return (
    <div className="text-center py-4">
      <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      <p className="mb-2">Are you sure you want to delete this template?</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This action cannot be undone.
      </p>
    </div>
  );
};

export default DeleteConfirmationModal;
