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
      const newAddressList = [...addressList, currPage];
      setAddressList(newAddressList);
    }
  }, [currPage]);

  const handleSelect = (index: number, item: string) => {
    console.log("item", item);
    handlePageChange(item);
    const newAddressList = addressList.slice(0, index + 1);
    setAddressList(newAddressList);
  };

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {addressList.map((item, index) => (
              <BreadcrumbItem key={`div-div-Breadcrumb-BreadcrumbList-${item}`}>
                {index !== addressList.length - 1 && (
                  <BreadcrumbLink
                    key={`div-div-Breadcrumb-BreadcrumbLink-${item}`}
                    isHome={index === 0}
                    onClick={() => handleSelect(index, item)}
                    href="#"
                    className="flex items-center"
                  >
                    {item}
                  </BreadcrumbLink>
                )}
                {index < addressList.length - 1 && (
                  <BreadcrumbSeparator
                    key={`div-div-Breadcrumb-BreadcrumbSeparator-${item}`}
                  >
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                )}
                {index === addressList.length - 1 && index !== 0 ? (
                  <BreadcrumbPage
                    key={`div-div-Breadcrumb-BreadcrumbPage-${item}`}
                    className="flex items-center"
                  >
                    <Users size={16} className="mr-1" />
                    {item}
                  </BreadcrumbPage>
                ) : null}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
});
