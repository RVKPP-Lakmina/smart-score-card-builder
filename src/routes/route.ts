import React from "react";
import { Routes } from "../types/navgation";
import { BarChart, Home, Settings } from "lucide-react";

export default new Map([
  [
    "dashboard",
    {
      component: React.lazy(() => import("../pages/dashboard/Page")),
      Icon: BarChart,
      title: "Dashboard",
    },
  ],
  [
    "templates",
    {
      component: React.lazy(() => import("../pages/settings/Page")),
      Icon: Home,
      title: "Score Card Templates",
    },
  ],
  [
    "settings",
    {
      component: React.lazy(() => import("../pages/settings/Page")),
      Icon: Settings,
      title: "Settings",
    },
  ],
]) as Routes;
