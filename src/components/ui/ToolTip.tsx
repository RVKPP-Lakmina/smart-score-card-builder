import type * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/util";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  showArrow?: boolean;
  maxWidth?: string;
  variant?: "default" | "gradient";
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 300,
  className = "",
  showArrow = true,
  maxWidth = "max-w-xs",
  variant = "default",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = useCallback(() => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    switch (position) {
      case "top":
        x =
          targetRect.left +
          targetRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        y = targetRect.top - tooltipRect.height - 8 + scrollY;
        break;
      case "right":
        x = targetRect.right + 8 + scrollX;
        y =
          targetRect.top +
          targetRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        break;
      case "bottom":
        x =
          targetRect.left +
          targetRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        y = targetRect.bottom + 8 + scrollY;
        break;
      case "left":
        x = targetRect.left - tooltipRect.width - 8 + scrollX;
        y =
          targetRect.top +
          targetRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        break;
    }

    const padding = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x < padding) {
      x = padding;
    } else if (x + tooltipRect.width > viewportWidth - padding) {
      x = viewportWidth - tooltipRect.width - padding;
    }

    if (y < padding) {
      y = padding;
    } else if (y + tooltipRect.height > viewportHeight - padding) {
      y = viewportHeight - tooltipRect.height - padding;
    }

    setCoords({ x, y });
  }, [position]);

  const showTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);

      requestAnimationFrame(() => {
        calculatePosition();
      });
    }, delay);
  };

  const hideTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isVisible) {
      hideTooltip();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [calculatePosition, isVisible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getArrowClass = () => {
    switch (position) {
      case "top":
        return "bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent";
      case "right":
        return "left-[-6px] top-1/2 transform -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent";
      case "bottom":
        return "top-[-6px] left-1/2 transform -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent";
      case "left":
        return "right-[-6px] top-1/2 transform -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "default":
        return "bg-gray-800 text-white dark:bg-gray-700";
      case "gradient":
        return "bg-gradient-to-r from-blue-500 to-green-400 text-white";
    }
  };

  return (
    <>
      <div
        ref={targetRef}
        className="inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 py-2 px-3 rounded-md shadow-md text-sm",
            getVariantClass(),
            maxWidth,
            "transition-opacity duration-200",
            isVisible ? "opacity-100" : "opacity-0",
            className
          )}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
          role="tooltip"
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                "absolute w-0 h-0 border-[6px]",
                getArrowClass(),
                variant === "gradient"
                  ? "border-t-blue-500 border-l-blue-500 border-r-green-400 border-b-green-400"
                  : ""
              )}
            />
          )}
        </div>
      )}
    </>
  );
}

export const TooltipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const TooltipRoot = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const TooltipContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
