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
      value={{ currentPage, navigateTo, navigationPanel }}
    >
      <div>{children}</div>
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
