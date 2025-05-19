import * as React from "react";
import { Sliders, Columns, Rows, Save, RotateCcw } from "lucide-react";
import { cn } from "../../lib/util";

interface CustomizableGridLayoutProps {
  children: React.ReactNode;
  defaultCols?: number;
  minCols?: number;
  maxCols?: number;
  className?: string;
  saveLayoutKey?: string;
}

export function CustomizableGridLayout({
  children,
  defaultCols = 3,
  minCols = 1,
  maxCols = 4,
  className,
  saveLayoutKey = "grid-layout-preferences",
}: CustomizableGridLayoutProps) {
  // Get saved preferences from localStorage if available
  const [cols, setCols] = React.useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(saveLayoutKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.cols || defaultCols;
        } catch {
          return defaultCols;
        }
      }
    }
    return defaultCols;
  });

  const [showControls, setShowControls] = React.useState(false);

  // Save preferences to localStorage
  const savePreferences = React.useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(saveLayoutKey, JSON.stringify({ cols }));
    }

    setShowControls(false);
  }, [cols, saveLayoutKey]);

  // Reset to defaults
  const resetToDefaults = React.useCallback(() => {
    setCols(defaultCols);
    if (typeof window !== "undefined") {
      localStorage.removeItem(saveLayoutKey);
    }
  }, [defaultCols, saveLayoutKey]);

  // Increase columns
  const increaseColumns = React.useCallback(() => {
    if (cols < maxCols) {
      setCols(cols + 1);
    }
  }, [cols, maxCols]);

  // Decrease columns
  const decreaseColumns = React.useCallback(() => {
    if (cols > minCols) {
      setCols(cols - 1);
    }
  }, [cols, minCols]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Sliders size={16} />
          {showControls ? "Hide Layout Controls" : "Customize Layout"}
        </button>

        {showControls && (
          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              title="Reset to default layout"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={savePreferences}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              title="Save layout preferences"
            >
              <Save size={14} />
              Save
            </button>
          </div>
        )}
      </div>

      {showControls && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Columns:
              </span>
              <div className="flex items-center">
                <button
                  onClick={decreaseColumns}
                  disabled={cols <= minCols}
                  className="p-1 rounded-l border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-3 py-1 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {cols}
                </span>
                <button
                  onClick={increaseColumns}
                  disabled={cols >= maxCols}
                  className="p-1 rounded-r border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Layout:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCols(1)}
                  className={cn(
                    "p-1 rounded border",
                    cols === 1
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                  title="Single column"
                >
                  <Rows size={16} />
                </button>
                <button
                  onClick={() => setCols(2)}
                  className={cn(
                    "p-1 rounded border",
                    cols === 2
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                  title="Two columns"
                >
                  <Columns size={16} />
                </button>
                <button
                  onClick={() => setCols(3)}
                  className={cn(
                    "p-1 rounded border",
                    cols === 3
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                  title="Three columns"
                >
                  <div className="flex">
                    <Columns size={16} />
                    <span className="text-xs">3</span>
                  </div>
                </button>
                {maxCols >= 4 && (
                  <button
                    onClick={() => setCols(4)}
                    className={cn(
                      "p-1 rounded border",
                      cols === 4
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                    title="Four columns"
                  >
                    <div className="flex">
                      <Columns size={16} />
                      <span className="text-xs">4</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid gap-6 min-h-52 py-5 pr-5",
          cols === 1 && "grid-cols-1",
          cols === 2 && "grid-cols-1 md:grid-cols-2",
          cols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          cols === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          className
        )}
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        {children}
      </div>
    </div>
  );
}
