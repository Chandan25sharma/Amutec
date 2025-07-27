'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Download, 
  Wrench, 
  AlertCircle, 
  CheckCircle,
  FileX
} from 'lucide-react'

interface RepairResult {
  success: boolean
  issues: string[]
  fixedIssues: string[]
  warnings: string[]
}

export default function RepairPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isRepairing, setIsRepairing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<RepairResult | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf')
    if (!pdfFile) {
      setError('Please upload a PDF file')
      return
    }
    setFile(pdfFile)
    setError(null)
    setAnalysisResult(null)
    setDownloadUrl(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const analyzePDF = async () => {
    if (!file) {
      setError('Please select a PDF file to analyze')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/pdf-tools', {
        method: 'POST',
        headers: {
          'X-Operation': 'analyze'
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to analyze PDF')
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const repairPDF = async () => {
    if (!file) {
      setError('Please select a PDF file to repair')
      return
    }

    setIsRepairing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/pdf-tools', {
        method: 'POST',
        headers: {
          'X-Operation': 'repair'
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to repair PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      
      // Run analysis again on repaired file
      await analyzePDF()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during repair')
    } finally {
      setIsRepairing(false)
    }
  }

  const getIssueIcon = (issue: string) => {
    if (issue.includes('corrupt') || issue.includes('error')) {
      return <FileX className="h-5 w-5 text-red-500" />
    }
    return <AlertCircle className="h-5 w-5 text-yellow-500" />
  }

  const getIssueSeverity = (issue: string) => {
    if (issue.includes('corrupt') || issue.includes('error') || issue.includes('critical')) {
      return 'critical'
    }
    if (issue.includes('warning') || issue.includes('minor')) {
      return 'warning'
    }
    return 'info'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-blue-600 font-medium">Tools</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wrench className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Repair PDF Files</h1>
          <p className="text-xl text-gray-600">
            Analyze and attempt to fix corrupted or damaged PDF files. Our repair tool can recover readable content and fix common issues.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-red-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop PDF file here' : 'Click or drag PDF file here'}
            </p>
            <p className="text-gray-500">
              Upload a PDF file to analyze and repair
            </p>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={analyzePDF}
            disabled={!file || isAnalyzing}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing PDF...
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 mr-2" />
                Analyze PDF
              </>
            )}
          </button>

          <button
            onClick={repairPDF}
            disabled={!file || isRepairing}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isRepairing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Repairing PDF...
              </>
            ) : (
              <>
                <Wrench className="h-5 w-5 mr-2" />
                Repair PDF
              </>
            )}
          </button>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h3>
            
            {/* Overall Status */}
            <div className={`p-4 rounded-lg mb-6 ${
              analysisResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {analysisResult.success ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                ) : (
                  <FileX className="h-6 w-6 text-red-600 mr-3" />
                )}
                <span className={`font-medium ${
                  analysisResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {analysisResult.success 
                    ? 'PDF file appears to be healthy' 
                    : 'Issues detected in PDF file'
                  }
                </span>
              </div>
            </div>

            {/* Issues Found */}
            {analysisResult.issues.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Issues Found</h4>
                <div className="space-y-2">
                  {analysisResult.issues.map((issue, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start p-3 rounded-lg ${
                        getIssueSeverity(issue) === 'critical' 
                          ? 'bg-red-50 border border-red-200'
                          : getIssueSeverity(issue) === 'warning'
                          ? 'bg-yellow-50 border border-yellow-200'
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      {getIssueIcon(issue)}
                      <span className="ml-3 text-gray-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fixed Issues */}
            {analysisResult.fixedIssues.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Issues Fixed</h4>
                <div className="space-y-2">
                  {analysisResult.fixedIssues.map((fix, index) => (
                    <div key={index} className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">{fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {analysisResult.warnings.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Warnings</h4>
                <div className="space-y-2">
                  {analysisResult.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <span className="text-gray-700">{warning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Download Repaired PDF */}
        {downloadUrl && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">PDF repair completed!</span>
            </div>
            
            <div className="flex justify-center">
              <a
                href={downloadUrl}
                download="repaired-document.pdf"
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Repaired PDF
              </a>
            </div>
          </div>
        )}

        {/* Repair Tips */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Repair Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Our repair tool can fix common issues like corrupted page structures, missing fonts, and broken cross-references
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Some severely damaged files may not be fully recoverable, but we&apos;ll extract as much content as possible
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              If repair fails, try using our other tools like compression or conversion to recover your content
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Always keep backups of important PDF files to prevent data loss
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
