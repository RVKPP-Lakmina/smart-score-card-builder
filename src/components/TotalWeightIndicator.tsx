import { useState, useEffect, useMemo } from "react";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "../lib/util";

type TotalWeightIndicatorProps = {
  weights?: number[];
  total?: number;
  target?: number;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  position?: "fixed" | "sticky" | "inline";
  showDetails?: boolean;
};

const sizeClasses = {
  sm: "text-sm p-2",
  md: "text-base p-3",
  lg: "text-lg p-4",
};
const positionClasses = {
  fixed: "fixed bottom-4 right-4 z-50",
  sticky: "sticky top-4 z-40",
  inline: "",
};

export function TotalWeightIndicator({
  total = 0,
  weights = [],
  target = 100,
  label = "Total Weight",
  className,
  size = "md",
  position = "inline",
  showDetails = true,
}: TotalWeightIndicatorProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevTotal, setPrevTotal] = useState(total);

  total = useMemo(() => {
    if (!total && weights.length) {
      return weights.reduce((acc, weight) => acc + weight, 0);
    }

    if (total) {
      return total;
    }

    return total;
  }, [total, weights]);

  const isValid = Math.abs(total - target) < 0.01;

  const difference = total - target;
  const formattedDifference = Math.abs(difference).toFixed(1);
  const differenceText =
    difference > 0
      ? `${formattedDifference}% too high`
      : `${formattedDifference}% too low`;

  useEffect(() => {
    if (total !== prevTotal) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      setPrevTotal(total);
      return () => clearTimeout(timer);
    }
  }, [total, prevTotal]);

  return (
    <div
      className={cn(
        "rounded-lg shadow-md transition-all duration-300",
        isValid
          ? "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700"
          : "bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700",
        isAnimating && "animate-pulse",
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isValid ? (
            <CheckCircle
              className="text-white mr-2"
              size={size === "lg" ? 24 : size === "md" ? 20 : 16}
            />
          ) : (
            <AlertTriangle
              className="text-white mr-2"
              size={size === "lg" ? 24 : size === "md" ? 20 : 16}
            />
          )}
          <div>
            <div className="font-medium text-white">
              {label}: {total.toFixed(1)}%
            </div>
            {showDetails && !isValid && (
              <div className="text-white text-opacity-90 text-sm">
                {differenceText} (Target: {target}%)
              </div>
            )}
          </div>
        </div>

        {showDetails && (
          <div className="relative group">
            <button className="text-white p-1 rounded-full hover:bg-white/10">
              <Info size={size === "lg" ? 20 : size === "md" ? 16 : 14} />
            </button>
            <div className="absolute right-0 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {isValid
                ? "The total weight is correctly set to 100%."
                : `The total weight should equal ${target}%. Please adjust the weights of your variables.`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
