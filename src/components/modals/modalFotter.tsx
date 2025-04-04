import React from "react";
import {} from "../ui/modal/types/types";

//@ts-expect-error: Suppressing type error due to dynamic import of footer components
const modalFooterMap = new Map<
  string,
  React.LazyExoticComponent<React.FC<unknown>>
>([
  [
    "sampleDelete",
    React.lazy(() => import("./footers/DeleteConfirmatiolFooter")),
  ],
]);

export default modalFooterMap;
