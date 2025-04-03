import * as React from "react";
// import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/util";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
}

interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  isHome?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      className,
      // separator = <ChevronRight size={16} />,
      // showHomeIcon = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center flex-wrap", className)}
        aria-label="Breadcrumb"
        {...props}
      />
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("flex items-center flex-wrap gap-1.5", className)}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isHome?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className = false, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center", className)}
        {...props}
      />
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("mx-1 text-gray-400 dark:text-gray-500", className)}
      aria-hidden="true"
      {...props}
    />
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isHome?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, isHome = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "transition-colors hover:text-blue-500 dark:hover:text-blue-400",
          isHome
            ? "text-blue-500 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  isHome?: boolean;
  asChild?: boolean;
  isCurrentPage?: boolean;
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "font-medium text-gray-800 dark:text-gray-200",
          className
        )}
        aria-current="page"
        {...props}
      />
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
};
