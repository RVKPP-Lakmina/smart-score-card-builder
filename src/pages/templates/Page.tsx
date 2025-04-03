import {
  BarChart,
  ChevronRight,
  FileText,
  Home,
  Plus,
  Users,
} from "lucide-react";
import React from "react";
import NewTemplateCard from "../../components/NewTemplateCard";
import TemplateCard from "../../components/TemplateCard";
import templates from "../../services/configs/templates";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/BreadCrumb";

export default React.memo(function Page() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" isHome className="flex items-center">
                <Home size={16} className="mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={16} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center">
                <BarChart size={16} className="mr-1" />
                Analytics
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={16} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center">
                <FileText size={16} className="mr-1" />
                Reports
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={16} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center">
                <Users size={16} className="mr-1" />
                Team Performance
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Templates</h3>
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all">
          <Plus size={18} className="mr-2" />
          New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(templates).map(([key, template]) => (
          <TemplateCard key={key} template={template} />
        ))}

        <NewTemplateCard />
      </div>
    </div>
  );
});
