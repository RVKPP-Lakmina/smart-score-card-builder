import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = React.memo(
  function DashboardCard({ title, value, icon }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          {icon}
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.value === nextProps.value &&
      prevProps.icon === nextProps.icon
    );
  }
);

export default DashboardCard as React.FC<DashboardCardProps>;
