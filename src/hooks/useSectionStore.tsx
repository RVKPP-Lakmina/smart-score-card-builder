import React from "react";
import SectionStoreContext from "../context/SectionStoreContext";

const useSectionStore = () => {
  const context = React.useContext(SectionStoreContext);

  if (!context) {
    throw new Error(
      "useSectionStore must be used within a SectionStoreProvider"
    );
  }
  return context;
};

export default useSectionStore;
