import { useCallback } from "react";
import { useState } from "react";
import ReportsPage from "./Page";
import GenerateReportPage from "./genarateReport/Page";

type NewPage = "report" | "generate-report";

const Layout = () => {
  const [page, setPage] = useState<NewPage>("report");

  const handlePageChange = useCallback((newPage: NewPage) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      {page === "report" ? (
        <ReportsPage onPageChange={handlePageChange} />
      ) : page === "generate-report" ? (
        <GenerateReportPage onPageChange={handlePageChange} page={page} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Layout;
