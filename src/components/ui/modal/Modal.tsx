import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/util";
import useTheme from "../../../hooks/useTheme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode | null;
  isHeaderVisible?: boolean;
  footer?: React.ReactNode | null;
  isFooterVisible?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  header,
  size = "md",
  isFooterVisible = false,
  closeOnOutsideClick = true,
  isHeaderVisible = false,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnOutsideClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  if (!isOpen && !isVisible) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        !isOpen && "pointer-events-none"
      )}
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className={cn(
          "rounded-xl shadow-xl w-full transform transition-all duration-300",
          isDarkMode ? "dark:bg-gray-800" : "bg-white",
          sizeClasses[size],
          isVisible && isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-t-xl"></div>

          {title && (
            <div
              className={cn(
                "flex items-center justify-between p-4 border-b ",
                isDarkMode
                  ? "dark dark:border-gray-700 dark:text-gray-400"
                  : "border-gray-200"
              )}
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center space-x-2">
                {isHeaderVisible && (
                  <div className="flex space-x-2">{header}</div>
                )}
                <button
                  onClick={onClose}
                  className={cn(
                    "p-2 text-gray-500 hover:bg-gray-100  rounded-md transition-all",
                    isDarkMode
                      ? "dark:text-gray-400 dark:hover:bg-gray-700"
                      : "text-gray-700"
                  )}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>

        {isFooterVisible && (
          <div
            className={cn(
              "p-4 border-t",
              isDarkMode
                ? "dark:border-gray-700 dark:bg-gray-800"
                : "border-gray-200 bg-white"
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
