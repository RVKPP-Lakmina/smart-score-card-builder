import type React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/util";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOutsideClick = true,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
          "bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full transform transition-all duration-300",
          sizeClasses[size],
          isVisible && isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-t-xl"></div>

          {title && (
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>

        {footer && (
          <div className="p-4 border-t dark:border-gray-700 rounded-b-xl bg-gray-50 dark:bg-gray-900">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
