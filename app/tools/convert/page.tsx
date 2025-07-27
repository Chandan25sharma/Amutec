'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Download, 
  FileImage, 
  AlertCircle, 
  CheckCircle,
  FileSpreadsheet,
  Presentation
} from 'lucide-react'

type ConversionType = 'pdf-to-word' | 'pdf-to-excel' | 'pdf-to-powerpoint' | 'pdf-to-image' | 
                     'word-to-pdf' | 'excel-to-pdf' | 'powerpoint-to-pdf' | 'image-to-pdf'

export default function ConvertPage() {
  const [files, setFiles] = useState<File[]>([])
  const [conversionType, setConversionType] = useState<ConversionType>('pdf-to-word')
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrls, setDownloadUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const conversionOptions = [
    {
      type: 'pdf-to-word' as ConversionType,
      label: 'PDF to Word',
      description: 'Convert PDF to editable Word documents',
      icon: FileText,
      accept: 'application/pdf',
      color: 'text-blue-600'
    },
    {
      type: 'pdf-to-excel' as ConversionType,
      label: 'PDF to Excel',
      description: 'Extract tables from PDF to Excel spreadsheets',
      icon: FileSpreadsheet,
      accept: 'application/pdf',
      color: 'text-green-600'
    },
    {
      type: 'pdf-to-powerpoint' as ConversionType,
      label: 'PDF to PowerPoint',
      description: 'Convert PDF pages to PowerPoint slides',
      icon: Presentation,
      accept: 'application/pdf',
      color: 'text-orange-600'
    },
    {
      type: 'pdf-to-image' as ConversionType,
      label: 'PDF to Images',
      description: 'Convert PDF pages to JPG/PNG images',
      icon: FileImage,
      accept: 'application/pdf',
      color: 'text-purple-600'
    },
    {
      type: 'word-to-pdf' as ConversionType,
      label: 'Word to PDF',
      description: 'Convert Word documents to PDF files',
      icon: FileText,
      accept: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      color: 'text-blue-600'
    },
    {
      type: 'excel-to-pdf' as ConversionType,
      label: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF files',
      icon: FileSpreadsheet,
      accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      color: 'text-green-600'
    },
    {
      type: 'powerpoint-to-pdf' as ConversionType,
      label: 'PowerPoint to PDF',
      description: 'Convert PowerPoint presentations to PDF',
      icon: Presentation,
      accept: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation',
      color: 'text-orange-600'
    },
    {
      type: 'image-to-pdf' as ConversionType,
      label: 'Images to PDF',
      description: 'Convert JPG, PNG images to PDF documents',
      icon: FileImage,
      accept: 'image/jpeg,image/png,image/jpg',
      color: 'text-purple-600'
    }
  ]

  const currentOption = conversionOptions.find(opt => opt.type === conversionType)!

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setError(null)
    setDownloadUrls([])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: currentOption ? { [currentOption.accept]: [] } : undefined,
    multiple: conversionType === 'image-to-pdf'
  })

  const convertFiles = async () => {
    if (files.length === 0) {
      setError('Please select files to convert')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('conversionType', conversionType)

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to convert files')
      }

      const result = await response.json()
      setDownloadUrls(result.downloadUrls || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
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

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileImage className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">File Converter</h1>
          <p className="text-xl text-gray-600">
            Convert between PDF, Word, Excel, PowerPoint, and image formats with ease.
          </p>
        </div>

        {/* Conversion Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Conversion Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {conversionOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  setConversionType(option.type)
                  setFiles([])
                  setDownloadUrls([])
                  setError(null)
                }}
                className={`p-4 rounded-lg border text-left transition-all ${
                  conversionType === option.type
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <option.icon className={`h-5 w-5 ${option.color} mr-2`} />
                  <span className="font-semibold text-sm">{option.label}</span>
                </div>
                <p className="text-gray-600 text-xs">{option.description}</p>
              </button>
            ))}
          </div>
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
              {isDragActive ? 'Drop files here' : 'Click or drag files here'}
            </p>
            <p className="text-gray-500">
              Upload files for {currentOption.label.toLowerCase()} conversion
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <currentOption.icon className={`h-5 w-5 ${currentOption.color} mr-3`} />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-gray-500 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
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

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={convertFiles}
            disabled={files.length === 0 || isProcessing}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Converting Files...
              </>
            ) : (
              <>
                <FileImage className="h-5 w-5 mr-2" />
                Convert Files
              </>
            )}
          </button>
        </div>

        {/* Download Results */}
        {downloadUrls.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="text-green-700">Files converted successfully!</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Download Converted Files ({downloadUrls.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {downloadUrls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  download={`converted-${index + 1}`}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download File {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
