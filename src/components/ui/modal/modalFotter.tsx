import React from "react";

const modalFooterMap = new Map<
  string,
  React.LazyExoticComponent<React.FC<unknown>>
>([
  [
    "sampleDelete",
    React.lazy(() => import("../../modals/footers/DeleteConfirmatiolFooter")),
  ],
]);

export default modalFooterMap;
