import { useState, useRef, useEffect } from "react";
import {
  Printer,
  Download,
  Edit,
  Save,
  X,
  FileText,
  Calendar,
  QrCode,
} from "lucide-react";
import { DataNotFound } from "./ui/DataNotFound";
import { Button } from "./ui/Button";
import { cn } from "../lib/util";
import { useReactToPrint } from "react-to-print";

const getScoreColorClass = (score: number) => {
  if (score >= 85) return "text-green-500 dark:text-green-400"; // 85+
  if (score >= 75) return "text-blue-500 dark:text-blue-400"; // 75–84
  if (score >= 70) return "text-yellow-500 dark:text-yellow-400"; // 70–74
  if (score >= 65) return "text-amber-500 dark:text-amber-400"; // 65–69
  if (score >= 60) return "text-lime-500 dark:text-lime-400"; // 60–64
  if (score >= 55) return "text-teal-500 dark:text-teal-400"; // 55–59
  if (score >= 50) return "text-cyan-500 dark:text-cyan-400"; // 50–54
  return "text-red-500 dark:text-red-400"; // < 50
};

const getScoreBgClass = (score: number) => {
  if (score >= 85) return "bg-green-100 dark:bg-green-900/30"; // 85+
  if (score >= 75) return "bg-blue-100 dark:bg-blue-900/30"; // 75–84
  if (score >= 70) return "bg-yellow-100 dark:bg-yellow-900/30"; // 70–74
  if (score >= 65) return "bg-amber-100 dark:bg-amber-900/30"; // 65–69
  if (score >= 60) return "bg-lime-100 dark:bg-lime-900/30"; // 60–64
  if (score >= 55) return "bg-teal-100 dark:bg-teal-900/30"; // 55–59
  if (score >= 50) return "bg-cyan-100 dark:bg-cyan-900/30"; // 50–54
  return "bg-rose-100 dark:bg-rose-900/30"; // < 50
};

const getGrade = (score: number): string => {
  if (score >= 85) return "AAA";
  if (score >= 75) return "AA";
  if (score >= 70) return "A";
  if (score >= 65) return "BBB";
  if (score >= 60) return "BB";
  if (score >= 55) return "B";
  if (score >= 50) return "C";
  return "D";
};

const getStatusColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
};

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
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: reportRef });

  // Generate QR Code
  const generateQRCode = async (reportId: string) => {
    try {
      const QRCode = await import("qrcode");
      const reportUrl = `${window.location.origin}/reports/${reportId}`;
      const qrDataUrl = await QRCode.toDataURL(reportUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1f2937",
          light: "#ffffff",
        },
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setQrCodeUrl("/placeholder.svg?height=200&width=200");
    }
  };

  // Load report from local storage or use dummy data
  useEffect(() => {
    setIsLoading(true);
    try {
      const reports = JSON.parse(
        localStorage.getItem("scorecard-reports") || "[]"
      ) as Report[];
      let foundReport = reports.find((r) => r.id === reportId);

      // If no report found, create dummy data
      if (!foundReport) {
        foundReport = {
          id: reportId,
          productId: "PROD-001",
          productName: "Enterprise Security Platform",
          templateId: "TEMP-SEC-001",
          templateName: "Security Assessment Template",
          createdAt: new Date().toISOString(),
          createdBy: currentUser,
          status: "active",
          totalScore: 78.5,
          sectionScores: [
            {
              sectionId: "SEC-001",
              sectionName: "Authentication & Authorization",
              score: 85,
              weight: 30,
              weightedScore: 25.5,
              rules: [
                {
                  ruleId: "RULE-001",
                  ruleName: "Multi-Factor Authentication",
                  value: true,
                  score: 100,
                  weight: 40,
                  weightedScore: 40,
                },
                {
                  ruleId: "RULE-002",
                  ruleName: "Password Complexity",
                  value: "Strong",
                  score: 90,
                  weight: 30,
                  weightedScore: 27,
                },
                {
                  ruleId: "RULE-003",
                  ruleName: "Session Timeout",
                  value: 30,
                  score: 75,
                  weight: 30,
                  weightedScore: 22.5,
                },
              ],
            },
            {
              sectionId: "SEC-002",
              sectionName: "Data Encryption",
              score: 72,
              weight: 25,
              weightedScore: 18,
              rules: [
                {
                  ruleId: "RULE-004",
                  ruleName: "Data at Rest Encryption",
                  value: true,
                  score: 100,
                  weight: 50,
                  weightedScore: 50,
                },
                {
                  ruleId: "RULE-005",
                  ruleName: "Data in Transit Encryption",
                  value: "TLS 1.3",
                  score: 95,
                  weight: 30,
                  weightedScore: 28.5,
                },
                {
                  ruleId: "RULE-006",
                  ruleName: "Key Management",
                  value: "Basic",
                  score: 60,
                  weight: 20,
                  weightedScore: 12,
                },
              ],
            },
            {
              sectionId: "SEC-003",
              sectionName: "Network Security",
              score: 68,
              weight: 20,
              weightedScore: 13.6,
              rules: [
                {
                  ruleId: "RULE-007",
                  ruleName: "Firewall Configuration",
                  value: "Configured",
                  score: 80,
                  weight: 40,
                  weightedScore: 32,
                },
                {
                  ruleId: "RULE-008",
                  ruleName: "Intrusion Detection",
                  value: false,
                  score: 0,
                  weight: 30,
                  weightedScore: 0,
                },
                {
                  ruleId: "RULE-009",
                  ruleName: "VPN Access",
                  value: true,
                  score: 100,
                  weight: 30,
                  weightedScore: 30,
                },
              ],
            },
            {
              sectionId: "SEC-004",
              sectionName: "Compliance & Auditing",
              score: 82,
              weight: 25,
              weightedScore: 20.5,
              rules: [
                {
                  ruleId: "RULE-010",
                  ruleName: "Audit Logging",
                  value: true,
                  score: 100,
                  weight: 40,
                  weightedScore: 40,
                },
                {
                  ruleId: "RULE-011",
                  ruleName: "Compliance Reports",
                  value: "Monthly",
                  score: 85,
                  weight: 35,
                  weightedScore: 29.75,
                },
                {
                  ruleId: "RULE-012",
                  ruleName: "Data Retention Policy",
                  value: "Defined",
                  score: 75,
                  weight: 25,
                  weightedScore: 18.75,
                },
              ],
            },
          ],
        };

        // Save dummy data to localStorage
        const updatedReports = [...reports, foundReport];
        localStorage.setItem(
          "scorecard-reports",
          JSON.stringify(updatedReports)
        );
      }

      setReport(foundReport);
      setEditedStatus(foundReport.status);

      // Generate QR code for the report
      generateQRCode(foundReport.id);
    } catch (error) {
      console.error("Error loading report:", error);
    } finally {
      setIsLoading(false);
    }
  }, [reportId, currentUser]);

  // Handle printing
  const handlePrint = async () => {
    if (reportRef.current) {
      reactToPrintFn();
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

  // Handle downloading QR code
  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `report-${report?.id}-qr.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  // Handle downloading as PDF
  const handleDownload = () => {
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
        {/* Report Info and QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Report Information */}
          <div className="md:col-span-2 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Report Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Report ID
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 font-mono">
                  {report.id}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Product
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {report.productName}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <Calendar className="w-4 h-4" />
                  <span className="ml-2">Created</span>
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(report.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </span>
                {isEditing ? (
                  <select
                    value={editedStatus}
                    onChange={(e) =>
                      setEditedStatus(e.target.value as "active" | "inactive")
                    }
                    className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status.charAt(0).toUpperCase() +
                      report.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <QrCode className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Quick Access
            </h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="Report QR Code"
                      className="w-32 h-32"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Scan to view report online
                </p>
                <Button
                  variant="outline"
                  onClick={handleDownloadQR}
                  className="w-full text-xs py-2"
                  disabled={!qrCodeUrl}
                >
                  <Download size={14} className="mr-1" />
                  Download QR
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg mb-8 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Overall Score
              </h3>
              <div className="text-5xl font-bold flex items-center">
                <span className={getScoreColorClass(report.totalScore)}>
                  {Math.round(report.totalScore)}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-2xl ml-2">
                  /100
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Grade:{" "}
                <span className="font-semibold">
                  {getGrade(report.totalScore)}
                </span>
              </p>
            </div>
            <div
              className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold border-4",
                getScoreBgClass(report.totalScore),
                report.totalScore >= 50
                  ? "border-green-300 dark:border-green-600"
                  : "border-red-300 dark:border-red-600"
              )}
            >
              <span
                className={cn(
                  "text-2xl",
                  report.totalScore >= 50
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {getGrade(report.totalScore)}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(0, report.totalScore))}%`,
                }}
              ></div>
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
                      Weight: {section.weight.toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      <span
                        className={getScoreColorClass(
                          (section.score / section.weight) * 100
                        )}
                      >
                        {Math.round(section.score)}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
                        /{section.weight.toFixed(0)}
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
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400  w-2/5">
                          Rule
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400 w-2/5">
                          Value
                        </th>
                        <th className="pb-2 font-medium text-gray-600 dark:text-gray-400 text-right w-1/5">
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
                          <td className="py-3 px-3">{rule.ruleName}</td>
                          <td className="py-3 px-3">
                            {typeof rule.value === "boolean" ? (
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  rule.value
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                }`}
                              >
                                {rule.value ? "Yes" : "No"}
                              </span>
                            ) : (
                              String(rule.value)
                            )}
                          </td>
                          <td className="py-3 text-right font-medium px-3">
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
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Generated by Smart Scorecard</span>
            <span>•</span>
            <span>{formatDate(new Date().toISOString())}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Report ID:</span>
            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
              {report.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
