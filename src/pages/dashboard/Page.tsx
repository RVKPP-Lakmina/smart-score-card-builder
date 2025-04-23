import { BarChart, Edit, Copy } from "lucide-react";
import React, { useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";
import { fetchTemplates } from "../../services/services";
import { Templates } from "../../types/responseTypes";

export default React.memo(function Page() {
  const [counts, setCounts] = React.useState({
    totalTemplates: 0,
    recentlyEdited: 0,
    clonedTemplates: 0,
  });

  useEffect(() => {
    preInitializer();
  }, []);

  const preInitializer = async () => {
    try {
      const response: Templates | undefined = await fetchTemplates();

      if (!response) {
        throw new Error("No response from server");
      }

      const countOfTemplates = Object.keys(response).length;
      const countOfEdited = Object.values(response).filter((template) => {
        return template.lastEdited !== undefined;
      }).length;
      const countOfCloned = countOfTemplates - 1;

      setCounts({
        totalTemplates: countOfTemplates,
        recentlyEdited: countOfEdited,
        clonedTemplates: countOfCloned,
      });
    } catch (error) {
      alert("Error fetching data: " + (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Templates"
          value={counts.totalTemplates.toString()}
          icon={<BarChart className="text-blue-500" />}
        />
        <DashboardCard
          title="Recently Edited"
          value={counts.recentlyEdited.toString()}
          icon={<Edit className="text-green-500" />}
        />
        <DashboardCard
          title="Cloned Templates"
          value={counts.clonedTemplates.toString()}
          icon={<Copy className="text-purple-500" />}
        />
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-green-400 dark:from-blue-700 dark:to-green-600 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white mb-2">
          Welcome to Smart Score Card
        </h3>
        <p className="text-white/90">
          Create, edit, and manage your score card templates with ease.
        </p>
      </div>
    </div>
  );
});
