'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Download, 
  Layers, 
  Minus,
  Type,
  Square,
  Circle,
  Triangle,
  MousePointer,
  Pen
} from 'lucide-react'

interface Annotation {
  id: string
  type: 'text' | 'highlight' | 'rectangle' | 'circle' | 'arrow' | 'line'
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  color: string
  fontSize?: number
  strokeWidth?: number
}

interface PageAnnotations {
  [pageNumber: number]: Annotation[]
}

export default function AnnotatePDFPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrls, setDownloadUrls] = useState<{url: string; name: string}[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<'text' | 'highlight' | 'rectangle' | 'circle' | 'arrow' | 'line'>('text')
  const [selectedColor, setSelectedColor] = useState('#FF0000')
  const [fontSize, setFontSize] = useState(12)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [annotations, setAnnotations] = useState<PageAnnotations>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf')
    if (pdfFiles.length === 0) {
      setError('Please upload PDF files only')
      return
    }
    setFiles(pdfFiles)
    setError(null)
    setDownloadUrls([])
    setAnnotations({})
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  })

  const processFiles = async () => {
    if (files.length === 0) {
      setError('Please select PDF files to annotate')
      return
    }

    setIsProcessing(true)
    setError(null)
    const results: {url: string; name: string}[] = []

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('annotations', JSON.stringify(annotations))

        const response = await fetch('/api/pdf-tools', {
          method: 'POST',
          headers: {
            'X-Operation': 'annotate'
          },
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to annotate ${file.name}`)
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const baseName = file.name.replace('.pdf', '')
        
        results.push({
          url,
          name: `${baseName}-annotated.pdf`
        })
      }

      setDownloadUrls(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during annotation')
    } finally {
      setIsProcessing(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const addAnnotation = (pageNumber: number, annotation: Omit<Annotation, 'id'>) => {
    const newAnnotation: Annotation = {
      ...annotation,
      id: `annotation-${Date.now()}-${Math.random()}`
    }
    
    setAnnotations(prev => ({
      ...prev,
      [pageNumber]: [...(prev[pageNumber] || []), newAnnotation]
    }))
  }

  // const removeAnnotation = (pageNumber: number, annotationId: string) => {
  //   setAnnotations(prev => ({
  //     ...prev,
  //     [pageNumber]: (prev[pageNumber] || []).filter(ann => ann.id !== annotationId)
  //   }))
  // }

  const tools = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'highlight', label: 'Highlight', icon: Pen },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'arrow', label: 'Arrow', icon: Triangle },
    { id: 'line', label: 'Line', icon: Minus }
  ] as const

  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#000080', '#800000', '#808000'
  ]

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

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Layers className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Annotate PDF</h1>
          <p className="text-xl text-gray-600">
            Add text, highlights, shapes, and drawings to your PDF documents
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Annotation Tools Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Annotation Tools</h3>
              
              {/* Tool Selection */}
              <div className="space-y-2 mb-6">
                {tools.map(tool => {
                  const IconComponent = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left ${
                        selectedTool === tool.id
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-3" />
                      {tool.label}
                    </button>
                  )
                })}
              </div>

              {/* Color Picker */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded border-2 ${
                        selectedColor === color ? 'border-gray-600' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full mt-2 h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>

              {/* Font Size (for text) */}
              {selectedTool === 'text' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Stroke Width (for shapes) */}
              {['rectangle', 'circle', 'arrow', 'line'].includes(selectedTool) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stroke Width: {strokeWidth}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setAnnotations({})}
                  className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                  Clear All Annotations
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
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
                  {isDragActive ? 'Drop PDF files here' : 'Click or drag PDF files here'}
                </p>
                <p className="text-gray-500">
                  Upload PDF files to add annotations
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-gray-500 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-green-400 hover:text-green-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Annotation Canvas Area */}
            {files.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Annotation Preview</h3>
                
                {/* PDF Preview/Annotation Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center min-h-96 bg-gray-50">
                  <MousePointer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">PDF Annotation Canvas</p>
                  <p className="text-sm text-gray-500">
                    In a full implementation, this would show the PDF pages where you can click to add annotations
                  </p>
                  
                  {/* Show annotation summary */}
                  {Object.keys(annotations).length > 0 && (
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Current Annotations:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {Object.entries(annotations).map(([pageNum, pageAnnotations]) => (
                          <div key={pageNum}>
                            Page {pageNum}: {pageAnnotations.length} annotation(s)
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Add Annotations (Demo) */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Add Sample Annotations</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => addAnnotation(1, {
                        type: 'text',
                        x: 100,
                        y: 100,
                        text: 'Sample text annotation',
                        color: selectedColor,
                        fontSize
                      })}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Add Text
                    </button>
                    <button
                      onClick={() => addAnnotation(1, {
                        type: 'highlight',
                        x: 150,
                        y: 150,
                        width: 100,
                        height: 20,
                        color: selectedColor
                      })}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                    >
                      Add Highlight
                    </button>
                    <button
                      onClick={() => addAnnotation(1, {
                        type: 'rectangle',
                        x: 200,
                        y: 200,
                        width: 80,
                        height: 60,
                        color: selectedColor,
                        strokeWidth
                      })}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Add Rectangle
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                <Layers className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Process Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={processFiles}
                disabled={files.length === 0 || isProcessing}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Annotations...
                  </>
                ) : (
                  <>
                    <Layers className="h-5 w-5 mr-2" />
                    Apply Annotations
                  </>
                )}
              </button>
            </div>

            {/* Download Results */}
            {downloadUrls.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Download Annotated Files</h3>
                <div className="space-y-3">
                  {downloadUrls.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-green-600 mr-3" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <a
                        href={item.url}
                        download={item.name}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Info */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Annotation Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Text Annotations</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Add text comments</li>
                <li>• Custom fonts & sizes</li>
                <li>• Multiple colors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Highlight text passages</li>
                <li>• Transparent overlays</li>
                <li>• Custom colors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Shapes</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Rectangles & circles</li>
                <li>• Arrows & lines</li>
                <li>• Adjustable stroke width</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Professional</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Batch processing</li>
                <li>• Export annotations</li>
                <li>• Collaboration ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
