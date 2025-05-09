import { Suspense, useCallback, useState } from "react";
import React from "react";
import Spinner from "../../../components/ui/Loader";

type NewPage = "login" | "signup";

const Layout = ({
  setIsLoading,
}: {
  setIsLoading: (pram: boolean) => void;
}) => {
  const [page, setPage] = useState<NewPage>("login");

  const handlePageChange = useCallback((newPage: NewPage) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {React.createElement(currentPage()[page], {
          onPageChange: handlePageChange,
          setIsLoading,
        })}
      </Suspense>
    </div>
  );
};

export default Layout;

const currentPage = () => {
  return {
    login: React.lazy(() => import("./login/Page")),
    signup: React.lazy(() => import("./signup/Page")),
  };
};
