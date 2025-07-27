'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload, Download, Minimize2, AlertCircle, CheckCircle } from 'lucide-react'

export default function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number
    compressedSize: number
    compressionRatio: number
  } | null>(null)
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
    setCompressionStats(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const compressPDF = async () => {
    if (!file) {
      setError('Please select a PDF file to compress')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('compressionLevel', compressionLevel)

      const response = await fetch('/api/pdf-tools', {
        method: 'POST',
        headers: {
          'X-Operation': 'compress'
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to compress PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      // Calculate compression stats
      const compressedSize = blob.size
      const originalSize = file.size
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100

      setCompressionStats({
        originalSize,
        compressedSize,
        compressionRatio
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const compressionOptions = [
    {
      level: 'low' as const,
      label: 'Low Compression',
      description: 'Minimal size reduction, highest quality',
      reduction: '10-30%'
    },
    {
      level: 'medium' as const,
      label: 'Medium Compression',
      description: 'Balanced size reduction and quality',
      reduction: '30-50%'
    },
    {
      level: 'high' as const,
      label: 'High Compression',
      description: 'Maximum size reduction, lower quality',
      reduction: '50-70%'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
            <Minimize2 className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compress PDF Files</h1>
          <p className="text-xl text-gray-600">
            Reduce PDF file size while maintaining quality. Choose your compression level for optimal results.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop PDF file here' : 'Click or drag PDF file here'}
            </p>
            <p className="text-gray-500">
              Upload a PDF file to compress and reduce its size
            </p>
          </div>

          {file && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    Original size: {formatFileSize(file.size)}
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

        {/* Compression Options */}
        {file && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Compression Level</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compressionOptions.map((option) => (
                <button
                  key={option.level}
                  onClick={() => setCompressionLevel(option.level)}
                  className={`p-6 rounded-lg border text-left transition-all ${
                    compressionLevel === option.level
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{option.label}</h4>
                  <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                  <p className="text-purple-600 font-medium text-sm">
                    Size reduction: {option.reduction}
                  </p>
                </button>
              ))}
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
            onClick={compressPDF}
            disabled={!file || isProcessing}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Compressing PDF...
              </>
            ) : (
              <>
                <Minimize2 className="h-5 w-5 mr-2" />
                Compress PDF
              </>
            )}
          </button>
        </div>

        {/* Compression Results */}
        {compressionStats && downloadUrl && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">PDF compressed successfully!</span>
            </div>
            
            {/* Compression Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatFileSize(compressionStats.originalSize)}
                </p>
                <p className="text-gray-500">Original Size</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {formatFileSize(compressionStats.compressedSize)}
                </p>
                <p className="text-gray-500">Compressed Size</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {compressionStats.compressionRatio.toFixed(1)}%
                </p>
                <p className="text-gray-500">Size Reduction</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <a
                href={downloadUrl}
                download="compressed-document.pdf"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 flex items-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Compressed PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
