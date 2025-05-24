import { ClipboardPlus, ChevronRight, CableCar, FileText } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/BreadCrumb";

type PageType = "report" | "generate-report" | "report-output";

interface BreadcrumbConfig {
  page: PageType;
  params?: Record<string, string>;
  onPageChange: (page: PageType, params?: Record<string, string>) => void;
}

interface ReusableBreadcrumbProps extends BreadcrumbConfig {
  className?: string;
}

export function ReusableBreadcrumb({
  page,
  params,
  onPageChange,
  className,
}: ReusableBreadcrumbProps) {
  // Hide breadcrumb on report page
  if (page === "report") {
    return null;
  }

  const selectedProductName = params?.productName || params?.selectedProduct;
  const reportId = params?.reportId;

  const handleReportsClick = () => {
    onPageChange("report");
  };

  const handleGenerateReportClick = () => {
    onPageChange("generate-report", {});
  };

  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={handleReportsClick}
              className="flex items-center"
            >
              <ClipboardPlus size={16} className="mr-1" />
              Reports
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronRight size={16} />
          </BreadcrumbSeparator>

          {page === "generate-report" && (
            <BreadcrumbItem>
              {selectedProductName ? (
                <>
                  <BreadcrumbLink
                    onClick={handleGenerateReportClick}
                    className="flex items-center"
                  >
                    <CableCar size={16} className="mr-1" />
                    Generate Report
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                  <BreadcrumbPage className="flex items-center">
                    {selectedProductName.charAt(0).toUpperCase() +
                      selectedProductName.slice(1)}
                  </BreadcrumbPage>
                </>
              ) : (
                <BreadcrumbPage className="flex items-center">
                  <CableCar size={16} className="mr-1" />
                  Generate Report
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          )}

          {page === "report-output" && (
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={handleGenerateReportClick}
                className="flex items-center"
              >
                <CableCar size={16} className="mr-1" />
                Generate Report
              </BreadcrumbLink>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              {selectedProductName && (
                <>
                  <BreadcrumbLink
                    // onClick={handleGenerateReportClick}
                    className="flex items-center"
                  >
                    {selectedProductName.charAt(0).toUpperCase() +
                      selectedProductName.slice(1)}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                </>
              )}
              <BreadcrumbPage className="flex items-center">
                <FileText size={16} className="mr-1" />
                {reportId ? `Report ${reportId}` : "Generated Report"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
