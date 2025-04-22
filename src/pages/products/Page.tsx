import { useCallback, useState } from "react";
import {
  Plus,
  SearchIcon,
  LinkIcon,
  ExternalLink,
  Check,
  X,
} from "lucide-react";
import { Search } from "../../components/ui/SearchBox";
import { Button } from "../../components/ui/Button";
import { arraysAreEqualAsSets, formatedDate } from "../../lib/util";
import { useModal } from "../../hooks/useModal";
import moment from "moment";

interface Product {
  id: string;
  name: string;
  description: string;
  templateId: string | null;
  templateName: string | null;
  apis: API[];
  createdAt: string;
  status: "active" | "inactive" | "draft";
}

interface Template {
  id: string;
  name: string;
  description: string;
}

interface API {
  id: string;
  name: string;
  type: string;
  status: "connected" | "failed" | "pending";
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "inactive":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300";
    case "draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "connected":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "pending":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300";
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Personal Loan",
      description: "Standard personal loan product with risk assessment",
      templateId: "temp-1",
      templateName: "Credit Risk Assessment",
      apis: [
        {
          id: "api-1",
          name: "Credit Bureau API",
          type: "REST",
          status: "connected",
        },
        {
          id: "api-2",
          name: "Fraud Detection",
          type: "GraphQL",
          status: "connected",
        },
      ],
      createdAt: "2023-10-15",
      status: "active",
    },
    {
      id: "prod-2",
      name: "Business Loan",
      description: "Small business loan with comprehensive risk evaluation",
      templateId: null,
      templateName: null,
      apis: [],
      createdAt: "2023-10-18",
      status: "draft",
    },
    {
      id: "prod-3",
      name: "Mortgage Loan",
      description: "Home mortgage loan with property valuation",
      templateId: "temp-2",
      templateName: "Mortgage Risk Assessment",
      apis: [
        {
          id: "api-3",
          name: "Property Valuation API",
          type: "REST",
          status: "connected",
        },
      ],
      createdAt: "2023-10-20",
      status: "active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const { closeModal, openModal } = useModal();

  const [templates] = useState<Template[]>([
    {
      id: "temp-1",
      name: "Credit Risk Assessment",
      description: "Comprehensive credit risk evaluation",
    },
    {
      id: "temp-2",
      name: "Mortgage Risk Assessment",
      description: "Property and borrower risk assessment",
    },
    {
      id: "temp-3",
      name: "SME Loan Assessment",
      description: "Small business risk evaluation",
    },
    {
      id: "temp-4",
      name: "Auto Loan Assessment",
      description: "Vehicle financing risk assessment",
    },
  ]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );

  const [availableApis] = useState<API[]>([
    {
      id: "api-1",
      name: "Credit Bureau API",
      type: "REST",
      status: "connected",
    },
    {
      id: "api-2",
      name: "Fraud Detection",
      type: "GraphQL",
      status: "connected",
    },
    {
      id: "api-3",
      name: "Property Valuation API",
      type: "REST",
      status: "connected",
    },
    {
      id: "api-4",
      name: "Income Verification",
      type: "REST",
      status: "pending",
    },
    {
      id: "api-5",
      name: "Business Credit Score",
      type: "SOAP",
      status: "connected",
    },
  ]);

  const [selectedApiIds, setSelectedApiIds] = useState<string[]>([]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.templateName &&
        product.templateName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenCreateProductModal = () => {
    openModal({
      title: "Create New Product",
      childrenkey: "createNewProduct",
      props: {
        handleCreateProduct,
      },
      size: "md",
      closeOnOutsideClick: true,
    });
  };

  const handleCreateProduct = useCallback(
    (newProduct: { name: string; description: string }) => {
      if (!newProduct.name.trim()) return;

      const newProductObj: Product = {
        id: `prod-${products.length + 1}`,
        name: newProduct.name,
        description: newProduct.description,
        templateId: null,
        templateName: null,
        apis: [],
        createdAt: new Date().toISOString(),
        status: "draft",
      };

      setProducts([...products, newProductObj]);
      closeModal();
    },
    [products, closeModal]
  );

  // Handle map template
  const handleMapTemplate = useCallback(
    (selectedTemplateId: string, selectedProduct: Product) => {
      if (!selectedProduct || !selectedTemplateId) return;

      const selectedTemplate = templates.find(
        (t) => t.id === selectedTemplateId
      );
      if (!selectedTemplate) return;

      const updatedProducts = products.map((p) => {
        if (p.id === selectedProduct.id) {
          return {
            ...p,
            templateId: selectedTemplateId,
            templateName: selectedTemplate.name,
          };
        }
        return p;
      });

      setProducts(updatedProducts);
      setSelectedTemplateId(null);
      closeModal();
    },
    [closeModal, products, templates]
  );

  // Handle add APIs
  const handleAddApis = useCallback(
    (selectedApiIds: string[], selectedProduct: Product) => {
      if (!selectedProduct || selectedApiIds.length === 0) return;

      const selectedApis = availableApis.filter((api) =>
        selectedApiIds.includes(api.id)
      );

      const updatedProducts = products.map((p) => {
        if (p.id === selectedProduct.id) {
          const newApis = selectedApis.filter(
            (api) => !p.apis.some((existingApi) => existingApi.id === api.id)
          );

          return {
            ...p,
            apis: [...p.apis, ...newApis],
          };
        }
        return p;
      });

      const result: boolean = arraysAreEqualAsSets(
        products.map(({ id }) => id),
        updatedProducts.map(({ id }) => id)
      );

      if (!result) {
        setProducts(updatedProducts);
      }

      if (selectedApiIds.length > 0) {
        setSelectedApiIds([]);
      }
    },
    [availableApis, products]
  );

  const openMapTemplateModal = useCallback(
    (product: Product) => {
      openModal({
        title: "Map Template to Product",
        childrenkey: "mapTemplateToProduct",
        props: {
          templates,
          handleMapTemplate: (selectedTemplateId: string) => {
            handleMapTemplate(selectedTemplateId, product);
          },
          selectedProduct: product,
          seletedTemplate: selectedTemplateId,
        },
        size: "md",
        closeOnOutsideClick: true,
      });
    },
    [handleMapTemplate, openModal, selectedTemplateId, templates]
  );

  const openAddApiModal = (product: Product) => {
    openModal({
      title: "Add APIs to Product",
      childrenkey: "addApiToProduct",
      props: {
        availableApis,
        selectedApiIds,
        setSelectedApiIds,
        handleAddApis: (selectedApiIds: string[]) => {
          handleAddApis(selectedApiIds, product);
        },
        selectedProduct: product,
      },
      size: "md",
      closeOnOutsideClick: true,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Search
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            containerClassName="w-5/6"
          />
          <button
            onClick={handleOpenCreateProductModal}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-lg shadow-md transition-all"
          >
            <Plus size={18} className="mr-2" />
            New Section
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="text-gray-500" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No products match your search criteria. Try adjusting your search
              or create a new product.
            </p>
          </div>
        ) : (
          <div
            className="space-y-6"
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
          >
            {filteredProducts
              .sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold mr-3">
                          {product.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(
                            product.status
                          )}`}
                        >
                          {product.status.charAt(0).toUpperCase() +
                            product.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {product.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Created: {formatedDate(product.createdAt)}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMapTemplateModal(product)}
                        className="flex items-center"
                      >
                        <LinkIcon size={14} className="mr-1" />
                        {product.templateId
                          ? "Change Template"
                          : "Map Template"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAddApiModal(product)}
                        className="flex items-center"
                      >
                        <Plus size={14} className="mr-1" />
                        Add API
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2 flex items-center">
                        <LinkIcon size={16} className="mr-2 text-blue-500" />
                        Mapped Template
                      </h4>
                      {product.templateName ? (
                        <div className="flex items-center">
                          <span className="text-gray-900 dark:text-gray-100">
                            {product.templateName}
                          </span>
                          <Check size={16} className="ml-2 text-green-500" />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            No template mapped
                          </span>
                          <X size={16} className="ml-2 text-red-500" />
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2 flex items-center">
                        <ExternalLink
                          size={16}
                          className="mr-2 text-green-500"
                        />
                        API Integrations
                      </h4>
                      {product.apis.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {product.apis.map((api) => (
                            <span
                              key={api.id}
                              className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusBadgeClass(
                                api.status
                              )}`}
                            >
                              {api.name}
                              <span className="ml-1 text-xs">({api.type})</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          No APIs integrated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
