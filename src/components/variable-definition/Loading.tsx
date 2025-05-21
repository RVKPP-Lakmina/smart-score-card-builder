import { Skeleton } from "../ui/Skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-8 w-64 mb-6" />
      <Skeleton className="h-4 w-full max-w-2xl mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>

              <div className="flex justify-end mb-2">
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="space-y-3 mt-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
