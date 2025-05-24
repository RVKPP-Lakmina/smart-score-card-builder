/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Search } from "../../components/ui/SearchBox";
import { cn } from "../../lib/util";
import { Button } from "../../components/ui/Button";
import { DataNotFound } from "../../components/ui/DataNotFound";
import Link from "../../components/ui/Link";

// Reusing the Report interface
interface Report {
  id: string;
  productId: string;
  productName: string;
  templateId: string;
  templateName: string;
  createdAt: string;
  createdBy: string;
  status: "active" | "inactive";
  totalScore: number;
  sectionScores: {
    sectionId: string;
    sectionName: string;
    score: number;
    weight: number;
    weightedScore: number;
    rules: {
      ruleId: string;
      ruleName: string;
      value: any;
      score: number;
      weight: number;
      weightedScore: number;
    }[];
  }[];
}

const ITEMS_PER_PAGE = 10;

export default function ReportsPage({
  onPageChange,
}: {
  onPageChange: (
    page: "report" | "generate-report" | "report-output",
    params?: Record<string, string>
  ) => void;
}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // const { openModal } = useModal();

  // Load reports from local storage
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedReports = JSON.parse(
        localStorage.getItem("scorecard-reports") || "[]"
      ) as Report[];
      setReports(storedReports);
    } catch (error) {
      console.error("Error loading reports:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter reports based on search term and status filter
  useEffect(() => {
    let filtered = [...reports];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.productName.toLowerCase().includes(term) ||
          report.templateName.toLowerCase().includes(term) ||
          report.id.toLowerCase().includes(term)
      );
    }

    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reports, searchTerm, statusFilter]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredReports.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // View report details
  // const viewReportDetails = (reportId: string) => {
  //   // setSelectedReportId(reportId);
  //   openModal({
  //     childrenkey: "reportDetail",
  //     size: "2xl",
  //     closeOnOutsideClick: true,
  //     props: {
  //       reportId,
  //     },
  //   });
  // };

  // Get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-green-500 dark:text-green-400";
    if (score >= 60) return "text-blue-500 dark:text-blue-400";
    if (score >= 40) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Search
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            className="w-full md:w-80"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-3 py-2 rounded-md",
                statusFilter === "all"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={cn(
                "px-3 py-2 rounded-md",
                statusFilter === "active"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={cn(
                "px-3 py-2 rounded-md",
                statusFilter === "inactive"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              Inactive
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter size={16} className="mr-2" />
            More Filters
          </Button>
          <Button variant="outline" className="flex items-center">
            <Calendar size={16} className="mr-2" />
            Date Range
          </Button>
          <Link onPageChange={() => onPageChange("generate-report")}>
            <Button className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white flex items-center">
              <FileText size={16} className="mr-2" />
              Generate Report
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredReports.length === 0 ? (
        <DataNotFound
          title="No Reports Found"
          message={
            reports.length === 0
              ? "You haven't generated any reports yet. Generate a report to get started."
              : "No reports match your current search and filter criteria."
          }
          icon={
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          }
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Template
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {getCurrentPageItems().map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {report.productName.split("Template")[0]}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {report.productName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          report.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        )}
                      >
                        {report.status === "active" ? (
                          <span className="flex items-center">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <XCircle size={12} className="mr-1" />
                            Inactive
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "font-medium",
                            getScoreColorClass(report.totalScore)
                          )}
                        >
                          {Math.round(report.totalScore)}
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, report.totalScore)
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            onPageChange("report-output", {
                              productName: report.productName,
                              reportId: report.id,
                            })
                          }
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                        <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center">
                          <Download size={16} className="mr-1" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredReports.length)}{" "}
                of {filteredReports.length} reports
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={cn(
                    currentPage === 1 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        page === currentPage &&
                          "bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-blue-600 hover:to-green-500"
                      )}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={cn(
                    currentPage === totalPages &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
