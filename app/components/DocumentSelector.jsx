"use client";

import {
  FileImage,
  Layout,
  Maximize2,
  Merge,
  Minimize2,
  PenTool,
  RotateCcw,
  ShieldCheck,
  Split,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

const documentTools = [
  {
    id: "merge",
    name: "Merge",
    icon: Merge,
    description: "Combine multiple documents",
    color: "text-blue-600",
  },
  {
    id: "split",
    name: "Split",
    icon: Split,
    description: "Split document into parts",
    color: "text-green-600",
  },
  {
    id: "compress",
    name: "Compress",
    icon: Minimize2,
    description: "Reduce file size",
    color: "text-purple-600",
  },
  {
    id: "rotate",
    name: "Rotate",
    icon: RotateCcw,
    description: "Rotate pages",
    color: "text-orange-600",
  },
  {
    id: "convert",
    name: "Convert",
    icon: FileImage,
    description: "Convert file format",
    color: "text-red-600",
  },
  {
    id: "organize",
    name: "Organize",
    icon: Layout,
    description: "Reorder pages",
    color: "text-indigo-600",
  },
  {
    id: "repair",
    name: "Repair",
    icon: Wrench,
    description: "Fix document issues",
    color: "text-red-600",
  },
  {
    id: "watermark",
    name: "Watermark",
    icon: ShieldCheck,
    description: "Add watermarks",
    color: "text-purple-600",
  },
  {
    id: "annotate",
    name: "Annotate",
    icon: PenTool,
    description: "Add annotations",
    color: "text-green-600",
  },
];

export default function DocumentSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [viewMode, setViewMode] = useState("split"); // 'split', 'merge', 'full'

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    // Here you would typically handle the document processing
    console.log(`Selected tool: ${tool.name}`);
  };

  return (
    <div className="w-full">
      {/* Document Selection Trigger */}
      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center mx-auto"
        >
          Select Documents to Process
          <Maximize2 className="ml-2 h-5 w-5" />
        </button>
      </div>

      {/* Document Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                Document Processor
              </h2>
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("split")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "split"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Split View
                  </button>
                  <button
                    onClick={() => setViewMode("merge")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "merge"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Merge View
                  </button>
                  <button
                    onClick={() => setViewMode("full")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "full"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Full Screen
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Tools Sidebar */}
              <div className="w-full md:w-64 border-r p-4 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
                <div className="space-y-2">
                  {documentTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        selectedTool?.id === tool.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <tool.icon className={`h-5 w-5 ${tool.color}`} />
                      <div>
                        <div className="font-medium text-gray-900">
                          {tool.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {tool.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedTool ? (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center space-x-3 mb-6">
                      <selectedTool.icon
                        className={`h-8 w-8 ${selectedTool.color}`}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {selectedTool.name}
                        </h3>
                        <p className="text-gray-600">
                          {selectedTool.description}
                        </p>
                      </div>
                    </div>

                    {/* Document Processing Interface */}
                    <div className="flex-1 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-400 mb-4">
                          {viewMode === "split" &&
                            "Split View - Drag documents here"}
                          {viewMode === "merge" &&
                            "Merge View - Combine documents"}
                          {viewMode === "full" &&
                            "Full Screen View - Process your documents"}
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                          Upload Documents
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Merge className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">
                        Select a Tool
                      </h3>
                      <p>
                        Choose a tool from the sidebar to start processing your
                        documents
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
