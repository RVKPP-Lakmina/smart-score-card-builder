import Navigations from "../components/navigation/Navigations";
import useNavigation from "../hooks/useNavigation";
import { cn } from "../lib/util";
import { Menu, Sun, Moon } from "lucide-react";
import React from "react";
import route from "../routes/route";
import useTheme from "../hooks/useTheme";
import { UserNavigation } from "../components/ui/UserNavigation";

const Page = () => {
  const { isDarkMode, toggleTheme: toggleDarkMode } = useTheme();
  const {
    currentPage,
    navigationPanel: { isNavOpen, toggleNav },
    userDetails: {
      userName,

      // , userEmail
    },
  } = useNavigation();

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

            <div className="mb-2">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {route.get(currentPage)?.title || ""}
              </h1>
              {Boolean(route.get(currentPage)?.description) && (
                <p className="text-gray-600 dark:text-gray-400">
                  {route.get(currentPage)?.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <UserNavigation
              username={userName}
              //  userEmail={userEmail}
            />
          </div>
        </header>

        <main className="p-6">
          <React.Suspense
            fallback={
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }
          >
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
