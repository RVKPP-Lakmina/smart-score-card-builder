import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  SearchIcon,
  LinkIcon,
  ExternalLink,
  Check,
  X,
  Eye,
} from "lucide-react";
import { Search } from "../../components/ui/SearchBox";
import { Button } from "../../components/ui/Button";
import { arraysAreEqualAsSets, formatedDate } from "../../lib/util";
import { useModal } from "../../hooks/useModal";
import moment from "moment";
import {
  createProduct,
  fetchTemplates,
  getAllProducts,
  updateProduct,
} from "../../services/services";
import { API, CreateNewProduct, ProductWithId } from "../../types/product.type";
import { Templates, TemplatesPropsWithId } from "../../types/responseTypes";

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
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { closeModal, openModal } = useModal();

  const [templates, setTemplates] = useState<TemplatesPropsWithId[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );

  const [availableApis] = useState<API[]>([]);

  const [selectedApiIds, setSelectedApiIds] = useState<string[]>([]);

  const getSavedProducts = useCallback(async () => {
    const res = await getAllProducts();

    if (!res) return;

    const data = Object.values(res) as ProductWithId[];
    setProducts(data);
  }, []);

  const getTemplates = useCallback(async () => {
    const res: Templates | undefined = await fetchTemplates();

    if (!res) return;

    const data = Object.values(res) as Templates[string][];

    setTemplates(data);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      await Promise.all([getSavedProducts(), getTemplates()]);
    };

    fetchProducts();
  }, [getSavedProducts, getTemplates]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

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
    async (newProduct: { name: string; description: string }) => {
      try {
        if (!newProduct.name.trim()) {
          throw new Error("Product name is required");
        }

        const newProductObj = await createProduct(newProduct);

        if (!newProductObj) {
          throw new Error("Failed to create product");
        }

        setProducts([...products, newProductObj]);
        closeModal();
      } catch {
        // Handle error (e.g., show a notification or alert)
        console.error("Error creating product:");
      }
    },
    [products, closeModal]
  );

  const openFlowModal = useCallback(
    (templateId: string, product: ProductWithId) => {
      console.log("openFlowModal", templateId, product);

      openModal({
        title: "Product Flow Visualization - " + product.name,
        size: "screen",
        childrenkey: "templateFlow",
        props: {
          product: product as ProductWithId,
        },
      });
    },
    [openModal]
  );

  const handleMapTemplate = useCallback(
    async (selectedTemplateId: string, selectedProduct: ProductWithId) => {
      if (!selectedProduct || !selectedTemplateId) return;

      const selectedTemplate = templates.find(
        (t) => t.id === selectedTemplateId
      );
      if (!selectedTemplate) return;

      const template = templates.find((t) => t.id === selectedTemplateId);

      if (!template) return;

      selectedProduct.templateIds = {
        ...(selectedProduct?.templateIds || {}),
        [selectedTemplateId]: {
          id: selectedTemplateId,
          name: template.name,
        },
      };

      const res = await updateProduct(selectedProduct.id, selectedProduct);

      if (!res) return;

      setProducts((prev) => {
        const updatedProducts = prev.map((p) => {
          if (p.id === selectedProduct.id) {
            return {
              ...p,
              ...selectedProduct,
            };
          }
          return p;
        });
        return updatedProducts;
      });
      setSelectedTemplateId(null);
      closeModal();
    },
    [closeModal, templates]
  );

  const handleAddApis = useCallback(
    (selectedApiIds: string[], selectedProduct: ProductWithId) => {
      if (!selectedProduct || selectedApiIds.length === 0) return;

      const selectedApis = availableApis.filter((api) =>
        selectedApiIds.includes(api.id)
      );

      const updatedProducts = products.map((p) => {
        if (p.id === selectedProduct.id) {
          const apis = selectedApis.reduce((acc, api) => {
            acc[api.id] = {
              id: api.id,
              name: api.name,
              type: api.type,
              status: api.status,
              curl: "",
              associatedTemplateId: selectedTemplateId || "",
              associateSectionId: selectedProduct.id,
            };
            return acc;
          }, {} as Record<string, API>);

          return {
            ...p,
            apis: {
              ...(p?.apis || {}),
              ...apis,
            },
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
    [availableApis, products, selectedTemplateId]
  );

  const openMapTemplateModal = useCallback(
    (product: ProductWithId) => {
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

  const openAddApiModal = (product: ProductWithId) => {
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
                            Object.keys(product.templateIds).length > 0
                              ? "active"
                              : "draft"
                          )}`}
                        >
                          {Object.keys(product.templateIds).length > 0
                            ? "Active"
                            : "Draft"}
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
                        onClick={() =>
                          openFlowModal("MORTGAGE_RISK_ASSESSMENT", product)
                        }
                        className="flex items-center"
                      >
                        <Eye size={14} className="mr-1" />
                        View Product
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMapTemplateModal(product)}
                        className="flex items-center"
                      >
                        <LinkIcon size={14} className="mr-1" />
                        {product.templateIds.length > 0
                          ? "Change Templates"
                          : "Map Templates"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAddApiModal(product)}
                        className="flex items-center"
                      >
                        <Plus size={14} className="mr-1" />
                        Config API
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2 flex items-center">
                        <LinkIcon size={16} className="mr-2 text-blue-500" />
                        Mapped Template
                      </h4>
                      {Object.keys(product.templateIds).length > 0 ? (
                        <div className="flex items-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            {Object.entries(product.templateIds).map(
                              ([key, template]) => (
                                <span
                                  key={`${product.id}-template-id-${key}`}
                                  className="mr-2"
                                >
                                  {
                                    (template as unknown as CreateNewProduct)
                                      .name
                                  }
                                </span>
                              )
                            )}
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
                      {Object.hasOwn(product, "apis") &&
                      Object.keys(product?.apis ?? {}).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(product?.apis || {}).map(
                            ([key, api]) => (
                              <span
                                key={key}
                                className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusBadgeClass(
                                  api.status
                                )}`}
                              >
                                {api.name}
                              </span>
                            )
                          )}
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
