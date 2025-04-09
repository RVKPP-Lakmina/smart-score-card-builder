import * as React from "react";
import { FileSearch, AlertCircle, Database } from "lucide-react";
import { cn } from "../../lib/util";

interface DataNotFoundProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "compact" | "centered";
  action?: React.ReactNode;
}

export function DataNotFound({
  title = "No Data Found",
  message = "We couldn't find any data matching your criteria.",
  icon,
  className,
  variant = "default",
  action,
}: DataNotFoundProps) {
  const IconComponent = icon || (
    <FileSearch className="w-12 h-12 text-gray-400 dark:text-gray-500" />
  );

  return (
    <div
      className={cn(
        "rounded-lg border",
        variant === "compact" ? "p-4" : "p-8",
        variant === "centered"
          ? "flex flex-col items-center justify-center text-center"
          : "",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          variant === "centered"
            ? "flex-col items-center"
            : variant === "compact"
            ? "items-center"
            : "items-start",
          variant === "default" ? "space-x-4" : "space-y-2"
        )}
      >
        {variant === "default" ? (
          <>
            <div className="flex-shrink-0">{IconComponent}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {message}
              </p>
              {action && <div className="mt-4">{action}</div>}
            </div>
          </>
        ) : (
          <>
            <div className="flex-shrink-0">{IconComponent}</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
            {action && <div className="mt-4">{action}</div>}
          </>
        )}
      </div>
    </div>
  );
}

export function EmptySearch(
  props: Omit<DataNotFoundProps, "icon" | "title" | "message">
) {
  return (
    <DataNotFound
      icon={
        <FileSearch className="w-12 h-12 text-gray-400 dark:text-gray-500" />
      }
      title="No Search Results"
      message="We couldn't find any results matching your search criteria. Try adjusting your search terms."
      {...props}
    />
  );
}

export function NoRecords(
  props: Omit<DataNotFoundProps, "icon" | "title" | "message">
) {
  return (
    <DataNotFound
      icon={<Database className="w-12 h-12 text-gray-400 dark:text-gray-500" />}
      title="No Records Found"
      message="There are no records available in this section yet."
      {...props}
    />
  );
}

export function ErrorState(
  props: Omit<DataNotFoundProps, "icon" | "title" | "message">
) {
  return (
    <DataNotFound
      icon={
        <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
      }
      title="Error Loading Data"
      message="There was a problem loading the data. Please try again later."
      {...props}
    />
  );
}
