"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Download,
  FileText,
  FolderOpen,
  RotateCw,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
interface PageInfo {
  pageNumber: number;
  preview?: string;
}

export default function OrganizePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(
      (file) => file.type === "application/pdf"
    );
    if (!pdfFile) {
      setError("Please upload a PDF file");
      return;
    }
    setFile(pdfFile);
    setError(null);
    setDownloadUrl(null);
    loadPDFPages(pdfFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  // After ✅
  const loadPDFPages = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const loadedPages = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      loadedPages.push(canvas.toDataURL("image/png"));
    }

    // Set pages into state
  };

  const togglePageSelection = (pageNumber: number) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageNumber)) {
      newSelected.delete(pageNumber);
    } else {
      newSelected.add(pageNumber);
    }
    setSelectedPages(newSelected);
  };

  const movePageUp = (index: number) => {
    if (index > 0) {
      const newPages = [...pages];
      [newPages[index - 1], newPages[index]] = [
        newPages[index],
        newPages[index - 1],
      ];
      setPages(newPages);
    }
  };

  const movePageDown = (index: number) => {
    if (index < pages.length - 1) {
      const newPages = [...pages];
      [newPages[index], newPages[index + 1]] = [
        newPages[index + 1],
        newPages[index],
      ];
      setPages(newPages);
    }
  };

  const deletePages = () => {
    const newPages = pages.filter(
      (page) => !selectedPages.has(page.pageNumber)
    );
    setPages(newPages);
    setSelectedPages(new Set());
  };

  const rotatePages = async () => {
    if (selectedPages.size === 0) {
      setError("Please select pages to rotate");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("rotationAngle", "90");
      formData.append("pageRange", "specific");
      formData.append("specificPages", Array.from(selectedPages).join(","));

      const response = await fetch("/api/pdf-tools", {
        method: "POST",
        headers: {
          "X-Operation": "rotate",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to rotate pages");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const organizePDF = async () => {
    if (!file || pages.length === 0) {
      setError("Please upload a PDF file");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("operation", "organize");
      formData.append(
        "pageOrder",
        JSON.stringify(pages.map((p) => p.pageNumber))
      );

      const response = await fetch("/api/pdf-tools", {
        method: "POST",
        headers: {
          "X-Operation": "organize",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to organize PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-blue-600 font-medium">
                Tools
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FolderOpen className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organize PDF Pages
          </h1>
          <p className="text-xl text-gray-600">
            Rearrange, rotate, or delete pages in your PDF document with an
            intuitive drag-and-drop interface.
          </p>
        </div>

        {/* Upload Area */}
        {!file && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isDragActive
                  ? "Drop PDF file here"
                  : "Click or drag PDF file here"}
              </p>
              <p className="text-gray-500">
                Upload a PDF file to organize its pages
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* File Info and Controls */}
        {file && pages.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {file.name}
                  </h3>
                  <p className="text-gray-500">
                    {pages.length} pages •{" "}
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setPages([]);
                    setSelectedPages(new Set());
                    setDownloadUrl(null);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={rotatePages}
                  disabled={selectedPages.size === 0 || isProcessing}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate Selected
                </button>
                <button
                  onClick={deletePages}
                  disabled={selectedPages.size === 0}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedPages(new Set())}
                  disabled={selectedPages.size === 0}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            {/* Page Grid */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Pages ({selectedPages.size} selected)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pages.map((page, index) => (
                  <div
                    key={page.pageNumber}
                    className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedPages.has(page.pageNumber)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => togglePageSelection(page.pageNumber)}
                  >
                    {/* Page Preview */}
                    <div className="aspect-[3/4] bg-gray-100 rounded mb-2 flex items-center justify-center">
                      {page.preview ? (
                        <Image
                          src={page.preview}
                          alt={`Page ${page.pageNumber}`}
                          width={100}
                          height={140}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          Page {page.pageNumber}
                        </span>
                      )}
                    </div>

                    {/* Page Controls */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600">
                        Page {page.pageNumber}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            movePageUp(index);
                          }}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            movePageDown(index);
                          }}
                          disabled={index === pages.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Changes Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={organizePDF}
                disabled={isProcessing}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Organizing PDF...
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-5 w-5 mr-2" />
                    Apply Organization
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Download Result */}
        {downloadUrl && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">
                PDF organized successfully!
              </span>
            </div>

            <div className="flex justify-center">
              <a
                href={downloadUrl}
                download="organized-document.pdf"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Organized PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
