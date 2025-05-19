import { ChevronRight, Users } from "lucide-react";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../components/ui/BreadCrumb";

export default React.memo(function Layout({
  children,
  currPage,
  handlePageChange,
}: {
  children: React.ReactNode;
  currPage: string | undefined;
  handlePageChange: (page: string) => void;
}) {
  const [addressList, setAddressList] = React.useState<string[]>(["templates"]);

  useEffect(() => {
    if (!currPage || currPage === "templates") {
      setAddressList(["templates"]);
    } else {
      setAddressList((prev) => [...prev, currPage]);
    }
  }, [currPage]);

  const handleSelect = (index: number, item: string) => {
    handlePageChange(item);
    const newAddressList = addressList.slice(0, index);
    setAddressList(newAddressList);
  };

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList key={`div-div-BreadcrumbList-${addressList}`}>
            {addressList.map((item, index) => (
              <React.Fragment key={`div-div-Breadcrumb-fragment-${item}`}>
                <BreadcrumbItem
                  key={`div-div-Breadcrumb-fragment-BreadcrumbList-${item}`}
                >
                  {index !== addressList.length - 1 && (
                    <BreadcrumbLink
                      key={`div-div-Breadcrumb-BreadcrumbLink-${item}`}
                      isHome={index === 0}
                      onClick={() => handleSelect(index, item)}
                      href="#"
                      className="flex items-center"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </BreadcrumbLink>
                  )}
                  {index === addressList.length - 1 && index !== 0 ? (
                    <BreadcrumbPage
                      key={`div-div-Breadcrumb-BreadcrumbPage-${item}`}
                      className="flex items-center"
                    >
                      <Users size={16} className="mr-1" />
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </BreadcrumbPage>
                  ) : null}
                </BreadcrumbItem>
                {index < addressList.length - 1 && (
                  <BreadcrumbSeparator
                    key={`div-div-Breadcrumb-fragment-BreadcrumbSeparator-${item}`}
                  >
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
});
