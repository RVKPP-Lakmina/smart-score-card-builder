import { lazy, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import Spinner from "./components/ui/Loader";
import useAuth from "./hooks/useAuth";
import { rules } from "./lib/rules";
import { templateSections } from "./lib/templateSections";
import { templates } from "./lib/templates";
import NavigationProvider from "./providers/NavigationProvider";

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
        <div className="min-h-screen flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center p-6">
            <div className="w-full max-w-md text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                Smart Score Card
              </h1>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md">
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
