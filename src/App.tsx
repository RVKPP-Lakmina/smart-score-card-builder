import NavigationProvider from "./providers/NavigationProvider";
import AppLayout from "./AppLayout";
import { useEffect } from "react";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";
import { sectionRules } from "./lib/sectionRules";
import { products } from "./lib/products";

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("templates")) {
      localStorage.setItem("templates", JSON.stringify(templates));
    }

    if (!localStorage.getItem("templateSections")) {
      localStorage.setItem(
        "templateSections",
        JSON.stringify(templateSections)
      );
    }
    if (!localStorage.getItem("rules")) {
      localStorage.setItem("rules", JSON.stringify(rules));
    }
    if (!localStorage.getItem("sectionsRules")) {
      localStorage.setItem("sectionsRules", JSON.stringify(sectionRules));
    }

    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, []);

  return (
    <NavigationProvider>
      <AppLayout />
    </NavigationProvider>
  );
};

export default App;
