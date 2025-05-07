import React, { useMemo } from "react";
import NavigationContext from "../context/NavigationContext";
import {
  NavigationPanelProps,
  NavigationProviderProps,
} from "../types/navgation";

const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}: NavigationProviderProps) => {
  const [currentPage, setCurrentPage] = React.useState<string>("dashboard");
  const [isNavOpen, setIsNavOpen] = React.useState<boolean>(true);
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") ?? "{}")
    : {};

  const userName = user.name ? user.name : "User";
  // const userEmail = user.email ? user.email : "user@xgengroup.com.au";

  const navigationPanel: NavigationPanelProps = useMemo(() => {
    return {
      isNavOpen,
      openNav: () => setIsNavOpen(true),
      closeNav: () => setIsNavOpen(false),
      toggleNav: () => setIsNavOpen((prev) => !prev),
      navigateTo: (page: string) => setCurrentPage(page),
    };
  }, [isNavOpen]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateTo,
        navigationPanel,
        userDetails: { userName },
      }}
    >
      <div>{children}</div>
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
