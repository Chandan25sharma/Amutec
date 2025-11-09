"use client";

import { Download, FileText, Merge, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    console.log("Selected files:", selectedFiles);

    const pdfFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );

    setFiles((prev) => [...prev, ...pdfFiles]);
    setError(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    try {
      // Convert files to base64 and send as JSON
      const filePromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        return {
          name: file.name,
          data: base64,
          size: file.size,
        };
      });

      const fileData = await Promise.all(filePromises);

      const response = await fetch("/api/pdf-tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "merge",
          files: fileData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to merge PDFs");
      }

      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setDownloadUrl(url);
    } catch (err) {
      console.error("Merge error:", err);
      setError(err instanceof Error ? err.message : "Failed to merge PDFs");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-gray-600">
            Combine multiple PDF files into a single document
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("border-blue-400");
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("border-blue-400");
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("border-blue-400");
              const droppedFiles = Array.from(e.dataTransfer.files);
              console.log("Files dropped:", droppedFiles);
              const pdfFiles = droppedFiles.filter(
                (file) =>
                  file.type === "application/pdf" ||
                  file.name.toLowerCase().endsWith(".pdf")
              );
              setFiles((prev) => [...prev, ...pdfFiles]);
            }}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop PDF files here, or click to select
            </p>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Select PDF Files
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Select 2 or more PDF files to merge
            </p>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <span className="text-gray-700 block">{file.name}</span>
                        <span className="text-gray-500 text-sm">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Merging PDFs...
                </>
              ) : (
                <>
                  <Merge className="h-5 w-5 mr-2" />
                  Merge {files.length} PDF{files.length !== 1 ? "s" : ""}
                </>
              )}
            </button>

            {(files.length > 0 || downloadUrl) && (
              <button
                onClick={reset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Download Section */}
          {downloadUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-medium mb-1">
                    PDFs merged successfully!
                  </p>
                  <p className="text-green-600 text-sm">
                    Your merged document is ready for download
                  </p>
                </div>
                <a
                  href={downloadUrl}
                  download="merged-document.pdf"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">
            How to merge PDFs:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Select 2 or more PDF files using the button above or drag and drop
            </li>
            <li>Review the selected files in the list</li>
            <li>Click the Merge PDFs button</li>
            <li>Download your merged PDF file</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
