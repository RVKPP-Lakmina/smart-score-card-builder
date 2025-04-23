import NavigationProvider from "./providers/NavigationProvider";
import AppLayout from "./AppLayout";
import { useEffect } from "react";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";

const App = () => {
  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
    localStorage.setItem("templateSections", JSON.stringify(templateSections));
    localStorage.setItem("rules", JSON.stringify(rules));
  }, []);

  return (
    <NavigationProvider>
      <AppLayout />
    </NavigationProvider>
  );
};

export default App;
