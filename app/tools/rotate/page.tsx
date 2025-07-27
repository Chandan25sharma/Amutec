'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload, Download, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react'

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [rotationAngle, setRotationAngle] = useState<90 | 180 | 270>(90)
  const [pageRange, setPageRange] = useState<'all' | 'specific'>('all')
  const [specificPages, setSpecificPages] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
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
    setDownloadUrl(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const rotatePDF = async () => {
    if (!file) {
      setError('Please select a PDF file to rotate')
      return
    }

    if (pageRange === 'specific' && !specificPages.trim()) {
      setError('Please specify which pages to rotate')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('rotationAngle', rotationAngle.toString())
      formData.append('pageRange', pageRange)
      formData.append('specificPages', specificPages)

      const response = await fetch('/api/pdf-tools', {
        method: 'POST',
        headers: {
          'X-Operation': 'rotate'
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to rotate PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const rotationOptions = [
    { angle: 90, label: '90° Clockwise', description: 'Rotate pages 90 degrees to the right' },
    { angle: 180, label: '180° Flip', description: 'Flip pages upside down' },
    { angle: 270, label: '270° Counter-clockwise', description: 'Rotate pages 90 degrees to the left' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
            <RotateCcw className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rotate PDF Pages</h1>
          <p className="text-xl text-gray-600">
            Rotate pages in your PDF document to fix orientation. Choose angle and specify which pages to rotate.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300 hover:border-orange-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop PDF file here' : 'Click or drag PDF file here'}
            </p>
            <p className="text-gray-500">
              Upload a PDF file to rotate its pages
            </p>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-orange-600 mr-3" />
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

        {/* Rotation Options */}
        {file && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Rotation Settings</h3>
            
            {/* Rotation Angle */}
            <div className="mb-8">
              <h4 className="font-medium text-gray-900 mb-4">Rotation Angle</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rotationOptions.map((option) => (
                  <button
                    key={option.angle}
                    onClick={() => setRotationAngle(option.angle as 90 | 180 | 270)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      rotationAngle === option.angle
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <RotateCcw className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="font-semibold">{option.label}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Pages to Rotate</h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pageRange"
                    value="all"
                    checked={pageRange === 'all'}
                    onChange={(e) => setPageRange(e.target.value as 'all' | 'specific')}
                    className="mr-3"
                  />
                  <span>All pages</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pageRange"
                    value="specific"
                    checked={pageRange === 'specific'}
                    onChange={(e) => setPageRange(e.target.value as 'all' | 'specific')}
                    className="mr-3"
                  />
                  <span>Specific pages</span>
                </label>
              </div>

              {pageRange === 'specific' && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={specificPages}
                    onChange={(e) => setSpecificPages(e.target.value)}
                    placeholder="e.g., 1, 3, 5-7, 10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Examples: &quot;1,3,5&quot; or &quot;1-3,5,7-9&quot;
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
            onClick={rotatePDF}
            disabled={!file || isProcessing}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Rotating Pages...
              </>
            ) : (
              <>
                <RotateCcw className="h-5 w-5 mr-2" />
                Rotate PDF
              </>
            )}
          </button>
        </div>

        {/* Download Result */}
        {downloadUrl && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">PDF pages rotated successfully!</span>
            </div>
            
            <div className="flex justify-center">
              <a
                href={downloadUrl}
                download="rotated-document.pdf"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Rotated PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
