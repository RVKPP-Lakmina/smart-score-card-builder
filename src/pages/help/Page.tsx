import { useState, useEffect } from "react";
import {
  Book,
  CheckCircle,
  Circle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Search } from "../../components/ui/SearchBox";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
}

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<string>("getting-started");
  const [isLoading, setIsLoading] = useState(false);

  // Sample roadmap data - in a real app, you would fetch this from the roadmap.sh API
  const roadmapItems: RoadmapItem[] = [
    {
      id: "item-1",
      title: "Understanding Templates",
      description:
        "Templates are the foundation of the ScoreCard system. They define the structure and criteria for evaluating risk factors.",
      status: "completed",
      category: "getting-started",
    },
    {
      id: "item-2",
      title: "Creating Sections",
      description:
        "Sections group related rules together and can have their own weights that contribute to the overall score.",
      status: "completed",
      category: "getting-started",
    },
    {
      id: "item-3",
      title: "Defining Rules",
      description:
        "Rules are the specific criteria used to evaluate risk. Each rule has properties that determine how scores are calculated.",
      status: "completed",
      category: "getting-started",
    },
    {
      id: "item-4",
      title: "Setting Weights",
      description:
        "Learn how to set section weights and overall weights to properly balance different risk factors in your assessment.",
      status: "in-progress",
      category: "intermediate",
    },
    {
      id: "item-5",
      title: "Using the Template Flow Visualization",
      description:
        "The Template Flow visualization helps you understand the relationships between templates, sections, and rules.",
      status: "in-progress",
      category: "intermediate",
    },
    {
      id: "item-6",
      title: "Advanced Rule Properties",
      description:
        "Explore advanced rule properties like conditional logic, formulas, and data validation to create sophisticated scoring models.",
      status: "planned",
      category: "advanced",
    },
    {
      id: "item-7",
      title: "Importing and Exporting Templates",
      description:
        "Learn how to share templates between systems and export results for reporting.",
      status: "planned",
      category: "advanced",
    },
    {
      id: "item-8",
      title: "API Integration",
      description:
        "Integrate the ScoreCard system with other applications using our comprehensive API.",
      status: "planned",
      category: "advanced",
    },
  ];

  // Categories for the roadmap
  const categories = [
    { id: "getting-started", name: "Getting Started" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  // Filter roadmap items based on search term and active category
  const filteredItems = roadmapItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Simulate loading the roadmap data
  useEffect(() => {
    const loadRoadmap = async () => {
      setIsLoading(true);
      // In a real app, you would fetch the roadmap data here
      // await fetch('https://roadmap.sh/api/...')
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    loadRoadmap();
  }, []);

  // Get status icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={18} />;
      case "in-progress":
        return <Circle className="text-blue-500" size={18} />;
      case "planned":
        return <Circle className="text-gray-400" size={18} />;
      default:
        return <Circle size={18} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Book className="mr-2 text-blue-500" size={20} />
              Documentation
            </h2>
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                View All
              </button>
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-3">Need more help?</h3>
              <a
                href="#"
                className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <HelpCircle size={16} className="mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-3"
          style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="mb-6">
              <Search
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="filled"
                className="w-full"
                loading={isLoading}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle className="text-gray-500" size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No documentation matches your current search criteria.
                </p>
              </div>
            ) : (
              <div
                className="space-y-6"
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
              >
                {categories
                  .filter(
                    (category) =>
                      activeCategory === "all" || category.id === activeCategory
                  )
                  .map((category) => {
                    const categoryItems = filteredItems.filter(
                      (item) => item.category === category.id
                    );
                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category.id} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                          {category.name}
                        </h2>
                        <div className="space-y-4">
                          {categoryItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start">
                                <div className="mt-1 mr-3">
                                  {getStatusIcon(item.status)}
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg mb-1">
                                    {item.title}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                                    {item.description}
                                  </p>
                                  <a
                                    href="#"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                                  >
                                    Learn more
                                    <ExternalLink size={14} className="ml-1" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-green-400 dark:from-blue-600 dark:to-green-500 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Interactive Roadmap</h2>
            <p className="mb-4">
              Explore our interactive roadmap to see what features are coming
              next and track your learning progress.
            </p>
            <div className="flex justify-between items-center">
              <a
                href="https://roadmap.sh/r/embed?id=6802379a6057cdb1a26aa5c8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Full Roadmap
                <ExternalLink size={16} className="ml-2" />
              </a>
              <div className="text-sm">Last updated: October 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
