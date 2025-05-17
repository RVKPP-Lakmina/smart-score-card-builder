import { useState, useRef } from "react";
import {
  Printer,
  Download,
  Edit,
  Save,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { DataNotFound } from "./ui/DataNotFound";
import { Button } from "./ui/Button";
import { cn } from "../lib/util";
// Reusing the Report interface from the dynamic form
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
      value: unknown;
      score: number;
      weight: number;
      weightedScore: number;
    }[];
  }[];
}

interface ReportDetailProps {
  reportId: string;
  currentUser?: string;
  onClose?: () => void;
}

export function ReportDetail({
  reportId,
  currentUser = "current-user",
  onClose,
}: ReportDetailProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<"active" | "inactive">(
    "active"
  );
  const reportRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `ScoreCard Report - ${report?.productName || "Report"}`,
  });

  // Load report from local storage
  useState(() => {
    setIsLoading(true);
    try {
      const reports = JSON.parse(
        localStorage.getItem("scorecard-reports") || "[]"
      ) as Report[];
      const foundReport = reports.find((r) => r.id === reportId);
      if (foundReport) {
        setReport(foundReport);
        setEditedStatus(foundReport.status);
      }
    } catch (error) {
      console.error("Error loading report:", error);
    } finally {
      setIsLoading(false);
    }
  });

  // Handle printing
  const handlePrint = async () => {
    if (reportRef.current) {
      await reactToPrintFn();
    }
  };

  // Handle saving changes
  const handleSave = () => {
    if (!report) return;

    try {
      const reports = JSON.parse(
        localStorage.getItem("scorecard-reports") || "[]"
      ) as Report[];
      const updatedReports = reports.map((r) => {
        if (r.id === report.id) {
          return { ...r, status: editedStatus };
        }
        return r;
      });
      localStorage.setItem("scorecard-reports", JSON.stringify(updatedReports));
      setReport({ ...report, status: editedStatus });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  // Handle downloading as PDF
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    // For now, we'll just trigger the print dialog
    handlePrint();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-green-500 dark:text-green-400";
    if (score >= 60) return "text-blue-500 dark:text-blue-400";
    if (score >= 40) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  // Get score background class
  const getScoreBgClass = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 60) return "bg-blue-100 dark:bg-blue-900/30";
    if (score >= 40) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <DataNotFound
          title="Report Not Found"
          message="The requested report could not be found."
          icon={
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            {report.productName} Report
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Template: {report.templateName}
          </p>
        </div>
        <div className="flex space-x-2">
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center"
            >
              <X size={18} className="mr-2" />
              Close
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center"
          >
            <Printer size={18} className="mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
          {report.createdBy === currentUser && !isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit
            </Button>
          )}
          {isEditing && (
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="p-6">
        {/* Report Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Report Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Report ID:
                </span>
                <span>{report.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Created:
                </span>
                <span>{formatDate(report.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                {isEditing ? (
                  <select
                    value={editedStatus}
                    onChange={(e) =>
                      setEditedStatus(e.target.value as "active" | "inactive")
                    }
                    className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      report.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    )}
                  >
                    {report.status.charAt(0).toUpperCase() +
                      report.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold flex items-center">
                <span className={getScoreColorClass(report.totalScore)}>
                  {Math.round(report.totalScore)}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-lg ml-1">
                  /100
                </span>
              </div>
              <div
                className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold",
                  getScoreBgClass(report.totalScore)
                )}
              >
                {report.totalScore >= 60 ? (
                  <CheckCircle
                    size={36}
                    className="text-green-500 dark:text-green-400"
                  />
                ) : (
                  <AlertCircle
                    size={36}
                    className="text-red-500 dark:text-red-400"
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                  style={{
                    width: `${Math.min(100, Math.max(0, report.totalScore))}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Scores */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Section Scores</h3>
          <div className="space-y-6">
            {report.sectionScores.map((section) => (
              <div
                key={section.sectionId}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-750 p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{section.sectionName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Weight: {(section.weight * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      <span className={getScoreColorClass(section.score)}>
                        {Math.round(section.score)}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
                        /100
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Weighted: {section.weightedScore.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <table className="w-full">
                    <thead className="text-left">
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">
                          Rule
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">
                          Value
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">
                          Score
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400">
                          Weight
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400 text-right">
                          Weighted Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rules.map((rule) => (
                        <tr
                          key={rule.ruleId}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-3">{rule.ruleName}</td>
                          <td className="py-3">
                            {typeof rule.value === "boolean"
                              ? rule.value
                                ? "Yes"
                                : "No"
                              : String(rule.value)}
                          </td>
                          <td className="py-3">
                            <span className={getScoreColorClass(rule.score)}>
                              {Math.round(rule.score)}
                            </span>
                          </td>
                          <td className="py-3">
                            {(rule.weight * 100).toFixed(0)}%
                          </td>
                          <td className="py-3 text-right">
                            {rule.weightedScore.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
          <div>Generated by Smart Scorecard</div>
          <div>Report ID: {report.id}</div>
        </div>
      </div>
    </div>
  );
}
