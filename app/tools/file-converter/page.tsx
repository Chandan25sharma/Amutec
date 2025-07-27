'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Download, 
  RefreshCw, 
  FileSpreadsheet,
  File,
  Image as ImageIcon,
  Table,
  Database,
  ArrowRight,
  Settings,
  ChevronDown
} from 'lucide-react'

interface ConversionJob {
  id: string
  file: File
  fromFormat: string
  toFormat: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  downloadUrl?: string
  error?: string
}

const formatCategories = {
  'Documents': {
    icon: FileText,
    formats: ['pdf', 'docx', 'doc', 'txt', 'rtf', 'odt']
  },
  'Spreadsheets': {
    icon: FileSpreadsheet,
    formats: ['xlsx', 'xls', 'csv', 'ods']
  },
  'Images': {
    icon: ImageIcon,
    formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg']
  },
  'Data': {
    icon: Database,
    formats: ['json', 'xml', 'yaml', 'csv', 'sql']
  },
  'Other': {
    icon: File,
    formats: ['html', 'epub', 'md', 'pptx', 'ppt']
  }
}

const formatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  docx: FileText,
  doc: FileText,
  xlsx: FileSpreadsheet,
  xls: FileSpreadsheet,
  csv: Table,
  jpg: ImageIcon,
  jpeg: ImageIcon,
  png: ImageIcon,
  json: Database,
  xml: Database,
  default: File
}

export default function FileConverterPage() {
  const [files, setFiles] = useState<File[]>([])
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([])
  const [selectedFromFormat, setSelectedFromFormat] = useState<string>('')
  const [selectedToFormat, setSelectedToFormat] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [conversionSettings, setConversionSettings] = useState({
    quality: 90,
    dpi: 300,
    compression: 'medium',
    colorSpace: 'rgb'
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
    setError(null)
    
    // Auto-detect file format
    if (acceptedFiles.length > 0 && !selectedFromFormat) {
      const firstFile = acceptedFiles[0]
      const extension = firstFile.name.split('.').pop()?.toLowerCase()
      if (extension) {
        setSelectedFromFormat(extension)
      }
    }
  }, [selectedFromFormat])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  })

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || ''
    const IconComponent = formatIcons[extension] || formatIcons.default
    return IconComponent
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'pdf': return 'text-red-600'
      case 'docx': case 'doc': return 'text-blue-600'
      case 'xlsx': case 'xls': return 'text-green-600'
      case 'jpg': case 'jpeg': case 'png': return 'text-purple-600'
      case 'csv': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  const startConversion = async () => {
    if (files.length === 0) {
      setError('Please select files to convert')
      return
    }
    
    if (!selectedFromFormat || !selectedToFormat) {
      setError('Please select both source and target formats')
      return
    }

    if (selectedFromFormat === selectedToFormat) {
      setError('Source and target formats cannot be the same')
      return
    }

    setIsProcessing(true)
    setError(null)

    const newJobs: ConversionJob[] = files.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      fromFormat: selectedFromFormat,
      toFormat: selectedToFormat,
      status: 'pending'
    }))

    setConversionJobs(prev => [...prev, ...newJobs])

    try {
      for (const job of newJobs) {
        // Update job status to processing
        setConversionJobs(prev => 
          prev.map(j => j.id === job.id ? { ...j, status: 'processing' } : j)
        )

        const formData = new FormData()
        formData.append('file', job.file)
        formData.append('fromFormat', job.fromFormat)
        formData.append('toFormat', job.toFormat)
        formData.append('settings', JSON.stringify(conversionSettings))

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to convert ${job.file.name}`)
        }

        const blob = await response.blob()
        const downloadUrl = URL.createObjectURL(blob)

        // Update job status to completed
        setConversionJobs(prev => 
          prev.map(j => j.id === job.id ? { 
            ...j, 
            status: 'completed',
            downloadUrl 
          } : j)
        )
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed'
      setError(errorMessage)
      
      // Update failed jobs
      setConversionJobs(prev => 
        prev.map(j => 
          newJobs.some(nj => nj.id === j.id) && j.status === 'processing' 
            ? { ...j, status: 'error', error: errorMessage }
            : j
        )
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const clearCompleted = () => {
    setConversionJobs(prev => prev.filter(job => job.status !== 'completed'))
  }

  const clearAll = () => {
    setConversionJobs([])
    setFiles([])
  }

  const getStatusColor = (status: ConversionJob['status']) => {
    switch (status) {
      case 'pending': return 'text-gray-500'
      case 'processing': return 'text-blue-500'
      case 'completed': return 'text-green-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: ConversionJob['status']) => {
    switch (status) {
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'completed': return <Download className="h-4 w-4" />
      case 'error': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
            <RefreshCw className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Universal File Converter</h1>
          <p className="text-xl text-gray-600">
            Convert between PDF, Office documents, images, and data formats with advanced options
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Format Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Settings</h3>
              
              {/* From Format */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">From Format</label>
                <select
                  value={selectedFromFormat}
                  onChange={(e) => setSelectedFromFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Auto-detect</option>
                  {Object.entries(formatCategories).map(([category, { formats }]) => (
                    <optgroup key={category} label={category}>
                      {formats.map(format => (
                        <option key={format} value={format}>
                          {format.toUpperCase()}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Conversion Arrow */}
              <div className="flex justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>

              {/* To Format */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">To Format</label>
                <select
                  value={selectedToFormat}
                  onChange={(e) => setSelectedToFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select target format</option>
                  {Object.entries(formatCategories).map(([category, { formats }]) => (
                    <optgroup key={category} label={category}>
                      {formats.map(format => (
                        <option key={format} value={format}>
                          {format.toUpperCase()}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Advanced Settings */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                  <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </button>
                
                {showAdvanced && (
                  <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quality: {conversionSettings.quality}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={conversionSettings.quality}
                        onChange={(e) => setConversionSettings(prev => ({
                          ...prev,
                          quality: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DPI: {conversionSettings.dpi}
                      </label>
                      <input
                        type="range"
                        min="72"
                        max="600"
                        step="72"
                        value={conversionSettings.dpi}
                        onChange={(e) => setConversionSettings(prev => ({
                          ...prev,
                          dpi: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Compression</label>
                      <select
                        value={conversionSettings.compression}
                        onChange={(e) => setConversionSettings(prev => ({
                          ...prev,
                          compression: e.target.value
                        }))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="none">None</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={startConversion}
                disabled={files.length === 0 || !selectedToFormat || isProcessing}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Convert Files
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Upload Area */}
            <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop files here' : 'Click or drag files here'}
                </p>
                <p className="text-gray-500">
                  Support for documents, images, spreadsheets, and more
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Selected Files ({files.length})</h4>
                    <button
                      onClick={() => setFiles([])}
                      className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {files.map((file, index) => {
                      const IconComponent = getFileIcon(file.name)
                      const extension = file.name.split('.').pop()?.toLowerCase() || ''
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <IconComponent className={`h-5 w-5 mr-3 ${getFormatColor(extension)}`} />
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-gray-500 text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                <FileText className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Conversion Jobs */}
            {conversionJobs.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Conversion Jobs</h3>
                  <div className="space-x-2">
                    <button
                      onClick={clearCompleted}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear Completed
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {conversionJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className={`mr-3 ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{job.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {job.fromFormat.toUpperCase()} → {job.toFormat.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`text-sm font-medium mr-4 ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                        
                        {job.status === 'completed' && job.downloadUrl && (
                          <a
                            href={job.downloadUrl}
                            download={`${job.file.name.replace(/\.[^/.]+$/, '')}.${job.toFormat}`}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Download
                          </a>
                        )}
                        
                        {job.status === 'error' && (
                          <span className="text-red-600 text-sm">{job.error}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Supported Formats */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Supported Format Conversions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(formatCategories).map(([category, { icon: IconComponent, formats }]) => (
              <div key={category}>
                <div className="flex items-center mb-2">
                  <IconComponent className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-900">{category}</h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formats.map(format => (
                    <span key={format} className="bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
                      {format.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
