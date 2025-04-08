import { useContext } from "react";
import TemplaterStoreContext from "../context/TemplateStoreContext";

const useTemplateStore = () => {
  const context = useContext(TemplaterStoreContext);

  if (!context) {
    throw new Error(
      "useTemplateStore must be used within a TemplaterStoreProvider"
    );
  }
  return context;
};

export default useTemplateStore;
