/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { Package } from "lucide-react";
import { Search } from "../../../components/ui/SearchBox";
import { DataNotFound } from "../../../components/ui/DataNotFound";
import { DynamicRuleForm } from "../../../components/DynamicRuleForm";
import { fetchTemplates } from "../../../services/services";
import { Templates } from "../../../types/responseTypes";

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
}: {
  onPageChange: (
    page: "report" | "generate-report" | "report-output",
    params: Record<string, string>
  ) => void;
}) {
  const [products, setProducts] = useState<Templates>({} as Templates);
  const [selectedProduct, setSelectedProduct] = useState<
    Templates[string] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTemplates = useCallback(async () => {
    const response = await fetchTemplates();

    if (response) {
      setProducts(response);
    }
    setIsLoading(false);
  }, []);

  // Load products
  useEffect(() => {
    setIsLoading(true);
    getTemplates();

    setIsLoading(false);
  }, [getTemplates]);

  // Filter products based on search term
  const filteredProducts = Object.values(products).filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle product selection
  const handleProductSelect = (product: Templates[string]) => {
    setSelectedProduct(product);
    onPageChange("generate-report", {
      productName: product.name,
    } as Record<string, string>);
  };

  // Handle report generation
  const handleReportGenerated = (report: Report) => {
    onPageChange("report-output", {
      reportId: report.id,
    } as Record<string, string>);
  };

  return (
    <div>
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
          </>
        )}
      </div>
    </div>
  );
}
