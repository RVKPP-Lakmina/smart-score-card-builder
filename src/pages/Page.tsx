import { useState } from "react";
import Navigations from "../components/navigation/Navigations";
import useNavigation from "../hooks/useNavigation";
import { cn } from "../lib/util";
import { Menu, Sun, Moon } from "lucide-react";
import React from "react";
import route from "../routes/route";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    currentPage,
    navigationPanel: { isNavOpen, toggleNav },
  } = useNavigation();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Navigations />
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isNavOpen ? "ml-64" : "ml-0"
        )}
      >
        <header
          className={cn(
            "flex items-center justify-between p-4 border-b",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}
        >
          <div className="flex items-center">
            {!isNavOpen && (
              <button
                onClick={toggleNav}
                className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu size={20} />
              </button>
            )}
            <h2 className="text-xl font-semibold">
              {route.get(currentPage)?.title || ""}
            </h2>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="p-6">
          {/* Content for each tab can be conditionally rendered here */}

          <React.Suspense fallback={<div>Loading...</div>}>
            {/* Dynamically render the component based on the active tab */}

            {React.createElement(getComponent(currentPage))}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default Page;

const getComponent = (
  page: string
):
  | React.LazyExoticComponent<React.ComponentType<unknown>>
  | typeof React.Fragment => {
  if (route.has(page)) {
    return route.get(page)?.component || React.Fragment;
  }

  return React.Fragment;
};
