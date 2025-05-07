import { useState } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { cn } from "../../lib/util";
import useNavigation from "../../hooks/useNavigation";
import useAuth from "../../hooks/useAuth";

interface UserNavigationProps {
  username?: string;
  userEmail?: string;
  avatarUrl?: string;
}

export function UserNavigation({
  username = "Xgen admin",
  userEmail = "",
  avatarUrl,
}: UserNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateTo } = useNavigation();
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center">
          {avatarUrl ? (
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={username}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-400 dark:from-blue-600 dark:to-green-500 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(username)}
            </div>
          )}
          <span className="hidden md:block ml-2 text-sm font-medium">
            {username}
          </span>
          <ChevronDown
            size={16}
            className="ml-1 text-gray-500 dark:text-gray-400"
          />
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={cn(
              "absolute right-0 mt-2 w-56 rounded-md shadow-lg z-20",
              "bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 border border-gray-200 dark:border-gray-700",
              "divide-y divide-gray-100 dark:divide-gray-700"
            )}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {username}
                </p>
                {Boolean(userEmail) && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {userEmail}
                  </p>
                )}
              </div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                role="menuitem"
              >
                <User
                  size={16}
                  className="mr-2 text-gray-500 dark:text-gray-400"
                />
                Your Profile
              </a>
              <div
                onClick={() => {
                  navigateTo("settings");
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings
                  size={16}
                  className="mr-2 text-gray-500 dark:text-gray-400"
                />
                Settings
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                role="menuitem"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
