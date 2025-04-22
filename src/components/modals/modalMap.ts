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
  ["selectRules", React.lazy(() => import("./childrens/VariableSelector"))],
  ["ruleEditor", React.lazy(() => import("./childrens/RuleEditorModal"))],
  ["templateFlow", React.lazy(() => import("../template-flow/TemplateFlow"))],
  [
    "createNewProduct",
    React.lazy(() => import("./childrens/CreateNewProduct")),
  ],
  [
    "mapTemplateToProduct",
    React.lazy(() => import("./childrens/MapTemplateToProduct")),
  ],

  [
    "addApiToProduct",
    React.lazy(() => import("./childrens/IntergrateApiToProduct.tsx")),
  ],
]);

export default modalMap;
