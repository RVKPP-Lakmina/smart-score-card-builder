import { lazy, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import Spinner from "./components/ui/Loader";
import useAuth from "./hooks/useAuth";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";
import { sectionRules } from "./lib/sectionRules";
import { products } from "./lib/products";
import NavigationProvider from "./providers/NavigationProvider";

const Layout = lazy(() => import("./pages/login/auth/Layout"));

const App = () => {
  const [isLoading] = useState<boolean>(false);
  const { accessToken } = useAuth();
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

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      {!accessToken ? (
        <Layout />
      ) : (
        <NavigationProvider>
          <AppLayout />
        </NavigationProvider>
      )}
    </>
  );
};

export default App;
