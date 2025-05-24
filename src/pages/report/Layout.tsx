import { useCallback, useRef } from "react";
import { useState } from "react";
import ReportsPage from "./Page";
import GenerateReportPage from "./genarateReport/Page";
import { ReportDetail } from "../../components/ReportDetail";
import { ReusableBreadcrumb } from "../../components/ReusableBreadcrumb";

type NewPage = "report" | "generate-report" | "report-output";

const Layout = () => {
  const [page, setPage] = useState<NewPage>("report");
  const paramsRef = useRef<Record<string, string>>({});
  const [, setChanged] = useState(1);

  const handlePageChange = useCallback(
    (newPage: NewPage, params?: Record<string, string> | undefined) => {
      if (params) {
        paramsRef.current = params;
        setChanged((prev) => prev + 1);
      }

      setPage(newPage);
    },
    []
  );

  return (
    <div>
      <div className="mb-6">
        <ReusableBreadcrumb
          page={page}
          onPageChange={handlePageChange}
          params={paramsRef.current}
        />
      </div>

      {page === "report" ? (
        <ReportsPage onPageChange={handlePageChange} />
      ) : page === "generate-report" ? (
        <GenerateReportPage onPageChange={handlePageChange} />
      ) : page === "report-output" && paramsRef ? (
        <div id="report-section" className="mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Generated Report
          </h2>
          <ReportDetail reportId={paramsRef.current["reportId"]} />
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Layout;
