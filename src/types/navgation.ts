import { LucideProps } from "lucide-react";

export type ReactIconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type Route = {
  Icon: ReactIconType | null;
  title: string;
  // Uncomment the following line if you want to include the component in the type
  component: React.LazyExoticComponent<React.FC>;
};

export type Routes = Map<string, Route>;

export interface NavigationContextProps {
  currentPage: string;
  navigateTo: (page: string) => void;
  navigationPanel: NavigationPanelProps;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
}

export interface NavigationPanelProps {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
  navigateTo: (page: string) => void;
}
