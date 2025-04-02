import { useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Plus,
  Edit,
  Copy,
  Home,
  Settings,
  BarChart,
} from "lucide-react";
import { cn } from "./lib/util";

const App = () => {
  return <ScoreCardApp />;
};

export default App;

function ScoreCardApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("templates");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      <div className="flex h-screen overflow-hidden">
        {/* Navigation Panel */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out",
            isNavOpen ? "translate-x-0" : "-translate-x-full",
            "bg-gradient-to-b from-blue-600 to-green-500 dark:from-blue-800 dark:to-green-700"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h1 className="text-xl font-bold text-white">ScoreCard Pro</h1>
            <button
              onClick={toggleNav}
              className="p-1 text-white hover:bg-white/10 rounded-md"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md text-white hover:bg-white/10",
                    activeTab === "dashboard" && "bg-white/20"
                  )}
                >
                  <Home size={18} className="mr-2" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("templates")}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md text-white hover:bg-white/10",
                    activeTab === "templates" && "bg-white/20"
                  )}
                >
                  <BarChart size={18} className="mr-2" />
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={cn(
                    "flex items-center w-full p-2 rounded-md text-white hover:bg-white/10",
                    activeTab === "settings" && "bg-white/20"
                  )}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            "flex-1 transition-all duration-300",
            isNavOpen ? "ml-64" : "ml-0"
          )}
        >
          {/* Header */}
          <header
            className={cn(
              "flex items-center justify-between p-4 border-b",
              isDarkMode ? "border-gray-700" : "border-gray-200"
            )}
          >
            <div className="flex items-center">
              {!isNavOpen && (
                <button
                  onClick={toggleNav}
                  className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Menu size={20} />
                </button>
              )}
              <h2 className="text-xl font-semibold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "templates" && "Score Card Templates"}
                {activeTab === "settings" && "Settings"}
              </h2>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>

          {/* Content Area */}
          <main className="p-6">
            {activeTab === "dashboard" && <DashboardContent />}
            {activeTab === "templates" && <TemplatesContent />}
            {activeTab === "settings" && <SettingsContent />}
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
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
}

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
}

function TemplatesContent() {
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
}

function TemplateCard({ template }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">{template.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Last edited: {template.lastEdited}
        </p>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md">
            <Edit size={18} />
          </button>
          <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-gray-700 rounded-md">
            <Copy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NewTemplateCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center p-6 h-full cursor-pointer hover:bg-gradient-to-br hover:from-blue-100 hover:to-green-100 dark:hover:from-blue-900/30 dark:hover:to-green-900/30 transition-all">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center mb-3">
          <Plus size={24} className="text-white" />
        </div>
        <h4 className="text-lg font-semibold">Create New Template</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Start from scratch
        </p>
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-6">Application Settings</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Navigation Panel</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showNav"
                defaultChecked
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="showNav" className="ml-2">
                Show navigation panel by default
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Theme Preferences</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="lightTheme"
                  name="theme"
                  defaultChecked
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="lightTheme" className="ml-2">
                  Light
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="darkTheme"
                  name="theme"
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="darkTheme" className="ml-2">
                  Dark
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="systemTheme"
                  name="theme"
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="systemTheme" className="ml-2">
                  System default
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
