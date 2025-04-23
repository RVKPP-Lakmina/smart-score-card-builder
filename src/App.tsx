import NavigationProvider from "./providers/NavigationProvider";
import AppLayout from "./AppLayout";
import { useEffect } from "react";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";

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
  }, []);

  return (
    <NavigationProvider>
      <AppLayout />
    </NavigationProvider>
  );
};

export default App;
