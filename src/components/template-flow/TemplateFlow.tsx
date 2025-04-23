import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
  Edge,
  Connection,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
} from "lucide-react";
import { Button } from "../ui/Button";
import { RuleNode } from "./components/RuleNode";
import { SectionNode } from "./components/SectionNode";
import { TemplateNode } from "./components/TemplateNode";
import { Search } from "../ui/SearchBox";
import { exportLine } from "../../services/services";
import {
  ExportLine,
  TemplateSectionsPropsWithId,
} from "../../types/responseTypes";
import { RuleWithId } from "../../types/rules";

const nodeTypes = {
  templateNode: TemplateNode,
  sectionNode: SectionNode,
  ruleNode: RuleNode,
};

type NewEdges = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  style: { stroke: string };
  sourceHandle: "right" | "left";
  targetHandle: "left" | "right";
  markerEnd: {
    type: MarkerType;
    width: number;
    height: number;
    color: string;
  };
};

type NewNodes = {
  id: string;
  type: string;
  position: { x: number; y: number };
  sourcePosition: Position;
  targetPosition: Position;
  data: TemplateSectionsPropsWithId | RuleWithId | ExportLine[string];
  hidden?: boolean;
};

export default function TemplateFlowPage({
  templateId,
}: {
  templateId: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [, setZoomLevel] = useState(1);

  const preInitializer = useCallback(async () => {
    // Pre-initialization logic can be added here if needed
    const response: ExportLine | undefined = await exportLine(templateId);

    if (!response) {
      alert("Error fetching template data");
      return;
    }
    const newNodes: NewNodes[] = [];
    const newEdges: NewEdges[] = [];

    const template = { ...response[templateId] };

    if (typeof template.sections == "string") {
      return;
    }

    const sections = {
      ...(response[templateId].sections as Record<
        string,
        TemplateSectionsPropsWithId & { ruleEntries: RuleWithId[] }
      >),
    };

    Object.values(sections).forEach((section, index) => {
      newNodes.push({
        id: section.id,
        type: "sectionNode",
        position: { x: 300, y: -400 + (index + 1) * 200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          ...section,
        },
      });

      newEdges.push({
        id: `e-${templateId}-${section.id}`,
        source: templateId,
        target: section.id,
        animated: true,
        style: { stroke: "#3b82f6" },
        sourceHandle: "right",
        targetHandle: "left",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#3b82f6",
        },
      });

      section.ruleEntries.forEach((rule, i) => {
        newNodes.push({
          id: rule.id,
          type: "ruleNode",
          position: { x: 450 + (i + 1) * 300, y: -400 + (index + 1) * 200 },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          data: { ...rule },
        });

        newEdges.push({
          id: `e-${section.id}-${rule.id}`,
          source: section.id,
          target: rule.id,
          animated: true,
          style: { stroke: "#22c55e" },
          sourceHandle: "right",
          targetHandle: "left",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#22c55e",
          },
        });
      });
    });

    newNodes.unshift({
      id: templateId,
      type: "templateNode",
      position: { x: -100, y: newNodes[0].position.y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { ...template, score: Number(Math.random().toFixed(2)) },
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [setEdges, setNodes, templateId]);

  useEffect(() => {
    preInitializer();
  }, [preInitializer]);

  useEffect(() => {
    if (!searchTerm) {
      setNodes((nds) =>
        nds.map((node) => {
          return {
            ...node,
            hidden: false,
          };
        })
      );
      return;
    }

    setNodes((nds) =>
      nds.map((node) => {
        const name = node.data.name.toLowerCase();
        const isMatch = name.includes(searchTerm.toLowerCase());
        return {
          ...node,
          hidden: !isMatch,
        };
      })
    );
  }, [searchTerm, setNodes]);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds: Edge[]) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleDownload = () => {
    // In a real app, you would implement logic to export the diagram as an image
    alert("Download functionality has to be Implemented");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-end">
          {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Template Flow Visualization
          </h1> */}
          <div className="flex items-center space-x-2">
            <Search
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              className="w-64"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMiniMap(!showMiniMap)}
              className="flex items-center"
            >
              {showMiniMap ? (
                <EyeOff size={16} className="mr-2" />
              ) : (
                <Eye size={16} className="mr-2" />
              )}
              {showMiniMap ? "Hide" : "Show"} Mini Map
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          className="bg-gray-50 dark:bg-gray-900"
          zoomOnScroll={true}
          zoomOnPinch={true}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          {showMiniMap && <MiniMap />}

          <Panel
            position="top-right"
            className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="flex items-center"
              >
                <ZoomIn size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="flex items-center"
              >
                <ZoomOut size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullScreen}
                className="flex items-center"
              >
                <Maximize2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center"
              >
                <Download size={16} />
              </Button>
            </div>
          </Panel>

          <Panel
            position="bottom-center"
            className="bg-white dark:bg-gray-800 p-2 rounded-t-md shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Template
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Section
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rule
                </span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
