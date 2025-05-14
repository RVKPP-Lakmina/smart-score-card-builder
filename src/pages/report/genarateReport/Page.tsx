/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { CableCar, ChevronRight, ClipboardPlus, Package } from "lucide-react";
import { Search } from "../../../components/ui/SearchBox";
import { DataNotFound } from "../../../components/ui/DataNotFound";
import { ReportDetail } from "../../../components/ReportDetail";
import { DynamicRuleForm } from "../../../components/DynamicRuleForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/BreadCrumb";

// Types
interface Product {
  id: string;
  name: string;
  description?: string;
  templateId: string;
}

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

export default function GenerateReportPage({
  onPageChange,
  page,
}: {
  onPageChange: (page: "report" | "generate-report") => void;
  page: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [generatedReport, setGeneratedReport] = useState<Report | null>(null);

  // Load products
  useEffect(() => {
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock products data
      const mockProducts: Product[] = [
        {
          id: "product-1",
          name: "Personal Finance",
          description: "Standard personal loan product with risk assessment",
          templateId: "template-1",
        },
        {
          id: "product-2",
          name: "Personal Finance Model - Joint Borrowers",
          description:
            "Small Personal Finance Model - Joint Borrowers with comprehensive risk evaluation",
          templateId: "template-2",
        },
        {
          id: "product-3",
          name: "Mortgage Loan",
          description: "Home mortgage loan with property valuation",
          templateId: "template-3",
        },
      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setGeneratedReport(null);
  };

  // Handle report generation
  const handleReportGenerated = (report: Report) => {
    setGeneratedReport(report);
    // Scroll to the report section
    setTimeout(() => {
      document
        .getElementById("report-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList key={`div-div-BreadcrumbList`}>
            <BreadcrumbItem key={`div-div-Breadcrumb-fragment-BreadcrumbList`}>
              <BreadcrumbLink
                key={`div-div-Breadcrumb-BreadcrumbLink-${page}`}
                isHome={page === "generate-report"}
                onClick={() => onPageChange("report")}
                href="#"
                className="flex items-center"
              >
                <ClipboardPlus size={16} className="mr-1" />
                Reports
              </BreadcrumbLink>

              <BreadcrumbSeparator
                key={`div-div-Breadcrumb-fragment-BreadcrumbSeparator-${page}`}
              >
                <ChevronRight size={16} />
              </BreadcrumbSeparator>

              {selectedProduct ? (
                <>
                  <BreadcrumbLink
                    key={`div-div-Breadcrumb-BreadcrumbLink-2-${page}`}
                    isHome={page === "generate-report"}
                    onClick={() => setSelectedProduct(null)}
                    href="#"
                    className="flex items-center"
                  >
                    <CableCar size={16} className="mr-1" />
                    Generate Report
                  </BreadcrumbLink>

                  <BreadcrumbSeparator
                    key={`div-div-Breadcrumb-fragment-BreadcrumbSeparator-2-${page}`}
                  >
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>

                  <BreadcrumbPage
                    key={`div-div-Breadcrumb-BreadcrumbPage-${page}`}
                    className="flex items-center"
                  >
                    {selectedProduct.name.charAt(0).toUpperCase() +
                      selectedProduct.name.slice(1)}
                  </BreadcrumbPage>
                </>
              ) : (
                <BreadcrumbPage
                  key={`div-div-Breadcrumb-BreadcrumbPage-${page}`}
                  className="flex items-center"
                >
                  Generate Report
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {!selectedProduct && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <Search
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              className="w-full md:w-80"
              loading={isLoading}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <DataNotFound
              title="No Products Found"
              message="No products match your search criteria."
              icon={
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {product.description}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Select →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
        {selectedProduct && (
          <>
            <div className="mb-8">
              <DynamicRuleForm
                product={selectedProduct}
                onScoreGenerated={handleReportGenerated}
              />
            </div>

            {generatedReport && (
              <div id="report-section" className="mb-8">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  Generated Report
                </h2>
                <ReportDetail reportId={generatedReport.id} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
