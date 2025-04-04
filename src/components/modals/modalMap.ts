import React from "react";

//@ts-expect-error: Suppressing type error due to dynamic import of footer components
const modalMap = new Map<string, React.LazyExoticComponent<React.FC<unknown>>>([
  [
    "sampleDelete",
    React.lazy(() => import("./childrens/DeleteConfirmationModal")),
  ],
  [
    "createTemplate",
    React.lazy(() => import("./childrens/CreateTemplateModal")),
  ],

  ["createSection", React.lazy(() => import("./childrens/CreateNewSection"))],
]);

export default modalMap;
