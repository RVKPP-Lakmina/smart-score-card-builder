import { useState } from "react";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { Search } from "../../components/ui/SearchBox";

interface HistoryItem {
  id: string;
  action: string;
  entityType: "template" | "section" | "rule";
  entityName: string;
  timestamp: string;
  user: string;
  details?: string;
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "template" | "section" | "rule"
  >("all");

  const historyItems: HistoryItem[] = [
    {
      id: "hist-1",
      action: "Created",
      entityType: "template",
      entityName: "Credit Risk Assessment",
      timestamp: "2025-10-15 14:32",
      user: "John Doe",
      details: "Created new template with 2 sections",
    },
    {
      id: "hist-2",
      action: "Modified",
      entityType: "section",
      entityName: "Borrower Risk",
      timestamp: "2025-10-15 15:45",
      user: "John Doe",
      details: "Updated section weight from 0.5 to 0.6",
    },
    {
      id: "hist-3",
      action: "Added",
      entityType: "rule",
      entityName: "Age",
      timestamp: "2025-10-15 16:20",
      user: "John Doe",
      details: "Added new rule to Borrower Risk section",
    },
    {
      id: "hist-4",
      action: "Modified",
      entityType: "rule",
      entityName: "No of loan cycles",
      timestamp: "2025-10-16 09:15",
      user: "Jane Smith",
      details: "Updated rule properties",
    },
    {
      id: "hist-5",
      action: "Created",
      entityType: "section",
      entityName: "Financial Risk",
      timestamp: "2025-10-16 10:30",
      user: "Jane Smith",
      details: "Added new section to Credit Risk Assessment template",
    },
    {
      id: "hist-6",
      action: "Deleted",
      entityType: "rule",
      entityName: "Employment Type",
      timestamp: "2025-10-17 11:45",
      user: "John Doe",
      details: "Removed rule from Borrower Risk section",
    },
    {
      id: "hist-7",
      action: "Modified",
      entityType: "template",
      entityName: "Credit Risk Assessment",
      timestamp: "2025-10-18 14:20",
      user: "Admin User",
      details: "Updated template description and metadata",
    },
  ];

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.details &&
        item.details.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === "all" || item.entityType === filterType;

    return matchesSearch && matchesFilter;
  });

  const groupedItems: { [key: string]: HistoryItem[] } = {};
  filteredItems.forEach((item) => {
    const date = item.timestamp.split(" ")[0];
    if (!groupedItems[date]) {
      groupedItems[date] = [];
    }
    groupedItems[date].push(item);
  });

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "template":
        return <FileText className="text-blue-500" size={18} />;
      case "section":
        return <FileText className="text-green-500" size={18} />;
      case "rule":
        return <FileText className="text-purple-500" size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "Created":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Modified":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Deleted":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Added":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Search
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-2 rounded-md ${
                filterType === "all"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("template")}
              className={`px-3 py-2 rounded-md ${
                filterType === "template"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setFilterType("section")}
              className={`px-3 py-2 rounded-md ${
                filterType === "section"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setFilterType("rule")}
              className={`px-3 py-2 rounded-md ${
                filterType === "rule"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Rules
            </button>
          </div>
        </div>

        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-gray-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No history found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No activity matches your current search and filter criteria.
            </p>
          </div>
        ) : (
          <div
            className="space-y-8"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
          >
            {Object.entries(groupedItems).map(([date, items]) => (
              <div key={date}>
                <div className="flex items-center mb-4">
                  <Calendar className="text-blue-500 mr-2" size={18} />
                  <h2 className="text-lg font-semibold">{date}</h2>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getEntityIcon(item.entityType)}
                          <span className="font-medium ml-2">
                            {item.entityName}
                          </span>
                          <span
                            className={`ml-3 text-xs px-2 py-1 rounded-full ${getActionColor(
                              item.action
                            )}`}
                          >
                            {item.action}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock size={14} className="mr-1" />
                          {item.timestamp.split(" ")[1]}
                        </div>
                      </div>
                      {item.details && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {item.details}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <User size={12} className="mr-1" />
                        {item.user}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
