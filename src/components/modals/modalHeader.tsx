import React from "react";

//@ts-expect-error: Suppressing type error due to dynamic import of footer components
const modalHeaderMap = new Map<
  string,
  React.LazyExoticComponent<React.FC<unknown>>
>([["ruleEditor", React.lazy(() => import("./headers/RuleEditorHeader"))]]);

export default modalHeaderMap;
