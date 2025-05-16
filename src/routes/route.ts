import React from "react";
import { Routes } from "../types/navgation";
import {
  BarChart,
  ClipboardPlus,
  Clock,
  FolderKanban,
  HelpCircle,
  Home,
  MapPinHouse,
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
    "scorecard",
    {
      component: React.lazy(() => import("../pages/products/Page")),
      Icon: FolderKanban,
      title: "Scorecard",
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
      component: React.lazy(() => import("../pages/report/Layout")),
      Icon: ClipboardPlus,
      title: "Reports",
      description: "View and manage your generated score reports",
    },
  ],

  [
    "section-rule-table",
    {
      component: React.lazy(() => import("../pages/section-rule-table/Page")),
      Icon: MapPinHouse,
      title: "Section Rule Table",
    },
  ],

  [
    "settings",
    {
      component: React.lazy(
        () => import("../pages/settings/user-registration/Page")
      ),
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
