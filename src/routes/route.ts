import React from "react";
import { Routes } from "../types/navgation";
import {
  BarChart,
  ClipboardPlus,
  Clock,
  FolderKanban,
  HelpCircle,
  Home,
  // MapPinHouse,
  Settings,
  Sparkles,
} from "lucide-react";

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
    "products",
    {
      component: React.lazy(() => import("../pages/products/Page")),
      Icon: FolderKanban,
      title: "ScoreCard",
      description: "Create and manage ScoreCard with template mappings",
    },
  ],
  [
    "templates",
    {
      component: React.lazy(() => import("../pages/templates/Page")),
      Icon: Home,
      title: "Template Configuration",
    },
  ],
  [
    "ask-ai",
    {
      component: React.lazy(() => import("../pages/ask-ai/Page")),
      Icon: Sparkles,
      title: "AI Assistant",
      description:
        "Create products and templates using natural language prompts",
    },
  ],
  [
    "report",
    {
      component: React.lazy(() => import("../pages/report/Page")),
      Icon: ClipboardPlus,
      title: "Reports",
    },
  ],

  // [
  //   "roadmap",
  //   {
  //     component: React.lazy(() => import("../pages/road-map/Page")),
  //     Icon: MapPinHouse,
  //     title: "Road Map",
  //   },
  // ],

  [
    "settings",
    {
      component: React.lazy(() => import("../pages/settings/Page")),
      Icon: Settings,
      title: "Settings",
    },
  ],
  [
    "active-history",
    {
      component: React.lazy(() => import("../pages/active-history/Page")),
      Icon: Clock,
      title: "Active History",
      description: "Track all changes made to templates, sections, and rules.",
    },
  ],
  [
    "help",
    {
      component: React.lazy(() => import("../pages/help/Page")),
      Icon: HelpCircle,
      title: "Help & Documentation",
      description:
        "Learn how to use the ScoreCard system with our comprehensive guides and roadmap",
    },
  ],
]) as Routes;
