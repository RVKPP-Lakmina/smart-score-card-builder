import { Construction, AlertTriangle } from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <Construction
              className="text-yellow-600 dark:text-yellow-500"
              size={48}
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Under Development
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          We're working hard to bring you this feature. Please check back soon!
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 inline-flex items-start">
          <AlertTriangle
            className="text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p className="text-left text-yellow-800 dark:text-yellow-200">
            This page is currently under active development. The functionality
            is not yet available, but we're excited to bring it to you in an
            upcoming release.
          </p>
        </div>
      </div>
    </div>
  );
}
