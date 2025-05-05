import { useEffect, lazy, Suspense, useState } from "react";
import NavigationProvider from "./providers/NavigationProvider";
import AppLayout from "./AppLayout";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";
import Spinner from "./components/ui/Loader";
import useAuth from "./hooks/useAuth";

const LoginPage = lazy(() => import("./pages/login/page"));

const App = () => {
  const [isLoading, setIsLoading]: any = useState(false);
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
  }, []);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      {!accessToken ? (
        <div className="min-h-screen flex">
          <div className="w-1/2 "></div>
          <div className="w-1/2 flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md px-6">
              <LoginPage setIsLoading={setIsLoading} />
            </div>
          </div>
        </div>
      ) : (
        <NavigationProvider>
          <AppLayout />
        </NavigationProvider>
      )}
    </>
  );
};

export default App;
