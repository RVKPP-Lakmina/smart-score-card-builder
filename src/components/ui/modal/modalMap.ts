import React from "react";

const modalMap = new Map<string, React.LazyExoticComponent<React.FC<unknown>>>([
  [
    "sampleDelete",
    React.lazy(() => import("../../modals/DeleteConfirmationModal")),
  ],
]);

export default modalMap;
