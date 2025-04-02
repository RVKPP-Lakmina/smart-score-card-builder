import React from "react";

export default React.memo(function Page() {
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
});
