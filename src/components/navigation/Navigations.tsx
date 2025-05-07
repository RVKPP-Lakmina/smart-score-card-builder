import { Settings, X } from "lucide-react";
import { cn } from "../../lib/util";
import useNavigation from "../../hooks/useNavigation";
import route from "../../routes/route";
import NavigationListItem from "./NavigationListItem";
import { ReactIconType } from "../../types/navgation";

const Navigations = () => {
  const {
    currentPage,
    navigationPanel: { isNavOpen, toggleNav },
    navigateTo,
    userDetails: {
      userName,
      // , userEmail
    },
  } = useNavigation();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out",
        isNavOpen ? "translate-x-0" : "-translate-x-full",
        "bg-gradient-to-b from-blue-600 to-green-500 dark:from-blue-800 dark:to-green-700"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Smart Score Card</h1>
        <button
          onClick={toggleNav}
          className="p-1 text-white hover:bg-white/10 rounded-md"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {Array.from(route.keys()).map((key) => {
            const Icon = route.get(key)?.Icon as ReactIconType;
            return (
              <NavigationListItem
                key={`Navigations-nav-ul-${key}-NavigationListItem-${
                  route.get(key)?.title
                }`}
                Icon={Icon || null}
                title={route.get(key)?.title || ""}
                isActive={currentPage === key}
                onClick={() => navigateTo(key)}
              />
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-medium">
            {userName
              .split(" ")
              .map((n) => n[0].toUpperCase())
              .join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {userName}
            </p>
            {/* <p className="text-xs text-white/70 truncate">{userEmail}</p> */}
          </div>
          <button className="text-white/70 hover:text-white">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigations;
