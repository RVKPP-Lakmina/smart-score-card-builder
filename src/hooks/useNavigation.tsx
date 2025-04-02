import React from "react";
import NavigationContext from "../context/NavigationContext";

const useNavigation = () => {
  const context = React.useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
};

export default useNavigation;
