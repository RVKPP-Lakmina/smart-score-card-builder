import { BarChart, Edit, Copy } from "lucide-react";
import React from "react";
import DashboardCard from "../../components/DashboardCard";

export default React.memo(function Page() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Templates"
          value="12"
          icon={<BarChart className="text-blue-500" />}
        />
        <DashboardCard
          title="Recently Edited"
          value="5"
          icon={<Edit className="text-green-500" />}
        />
        <DashboardCard
          title="Cloned Templates"
          value="3"
          icon={<Copy className="text-purple-500" />}
        />
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-400 dark:from-blue-700 dark:to-green-600 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white mb-2">
          Welcome to ScoreCard Pro
        </h3>
        <p className="text-white/90">
          Create, edit, and manage your score card templates with ease.
        </p>
      </div>
    </div>
  );
});
