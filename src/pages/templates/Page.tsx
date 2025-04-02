import { Plus } from "lucide-react";
import React from "react";
import NewTemplateCard from "../../components/NewTemplateCard";
import TemplateCard from "../../components/TemplateCard";

export default React.memo(function Page() {
  const templates = [
    { id: 1, name: "Performance Review", lastEdited: "2 days ago" },
    { id: 2, name: "Quarterly Assessment", lastEdited: "1 week ago" },
    { id: 3, name: "Employee Evaluation", lastEdited: "3 weeks ago" },
    { id: 4, name: "Team Metrics", lastEdited: "1 month ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Your Templates</h3>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all">
          <Plus size={18} className="mr-2" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
        <NewTemplateCard />
      </div>
    </div>
  );
});
