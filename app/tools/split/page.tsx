'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload, Download, Split, AlertCircle, CheckCircle } from 'lucide-react'

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [splitOption, setSplitOption] = useState<'pages' | 'ranges'>('pages')
  const [pageNumbers, setPageNumbers] = useState('')
  const [ranges, setRanges] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrls, setDownloadUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf')
    if (!pdfFile) {
      setError('Please upload a PDF file')
      return
    }
    setFile(pdfFile)
    setError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const splitPDF = async () => {
    if (!file) {
      setError('Please select a PDF file to split')
      return
    }

    if (splitOption === 'pages' && !pageNumbers.trim()) {
      setError('Please specify page numbers to extract')
      return
    }

    if (splitOption === 'ranges' && !ranges.trim()) {
      setError('Please specify page ranges to split')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('splitOption', splitOption)
      formData.append('pageNumbers', pageNumbers)
      formData.append('ranges', ranges)

      const response = await fetch('/api/pdf-tools', {
        method: 'POST',
        headers: {
          'X-Operation': 'split'
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to split PDF')
      }

      const result = await response.json()
      setDownloadUrls(result.downloadUrls || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

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
            <Split className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Split PDF Files</h1>
          <p className="text-xl text-gray-600">
            Extract specific pages or split your PDF into multiple documents by page ranges.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop PDF file here' : 'Click or drag PDF file here'}
            </p>
            <p className="text-gray-500">
              Upload a PDF file to split into multiple documents
            </p>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center">
              <FileText className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-gray-500 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Split Options */}
        {file && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Split Options</h3>
            
            <div className="space-y-6">
              {/* Option Selection */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSplitOption('pages')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    splitOption === 'pages'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Extract Specific Pages
                </button>
                <button
                  onClick={() => setSplitOption('ranges')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    splitOption === 'ranges'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Split by Ranges
                </button>
              </div>

              {/* Page Numbers Input */}
              {splitOption === 'pages' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Numbers (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={pageNumbers}
                    onChange={(e) => setPageNumbers(e.target.value)}
                    placeholder="e.g., 1, 3, 5-7, 10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Examples: &quot;1,3,5&quot; or &quot;1-3,5,7-9&quot;
                  </p>
                </div>
              )}

              {/* Ranges Input */}
              {splitOption === 'ranges' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Ranges (one per line)
                  </label>
                  <textarea
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder="1-5&#10;6-10&#10;11-15"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Each line creates a separate PDF file
                  </p>
                </div>
              )}
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

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={splitPDF}
            disabled={!file || isProcessing}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Splitting PDF...
              </>
            ) : (
              <>
                <Split className="h-5 w-5 mr-2" />
                Split PDF
              </>
            )}
          </button>
        </div>

        {/* Download Links */}
        {downloadUrls.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">PDF split successfully!</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Download Split Files ({downloadUrls.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {downloadUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  download={`split-${index + 1}.pdf`}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Part {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
