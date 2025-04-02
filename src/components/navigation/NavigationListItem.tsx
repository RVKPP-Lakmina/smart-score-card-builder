import React from "react";
import { cn } from "../../lib/util";
import { LucideProps } from "lucide-react";

export default React.memo(
  function NavigationListItem({
    Icon,
    title,
    isActive,
    onClick,
  }: {
    Icon:
      | React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >
      | typeof React.Fragment;
    title: string;
    isActive: boolean;
    onClick: () => void;
  }) {
    return (
      <li>
        <button
          onClick={onClick}
          className={cn(
            "flex items-center w-full p-2 rounded-md text-white hover:bg-white/10",
            isActive && "bg-white/20"
          )}
        >
          {Boolean(Icon) && <Icon className="mr-2" />}
          {title}
        </button>
      </li>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive &&
    prevProps.Icon === nextProps.Icon &&
    prevProps.title === nextProps.title &&
    prevProps.onClick === nextProps.onClick
);
