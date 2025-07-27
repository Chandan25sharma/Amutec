'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Download, 
  Shield, 
  Type,
  Image as ImageIcon,
  Droplets,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react'

interface WatermarkSettings {
  type: 'text' | 'image'
  text?: string
  fontSize?: number
  opacity?: number
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  rotation?: number
  color?: string
}

interface SecuritySettings {
  password?: string
  permissions?: {
    print: boolean
    copy: boolean
    modify: boolean
    annotate: boolean
  }
}

export default function WatermarkSecurityPage() {
  const [files, setFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState<'watermark' | 'security' | 'unlock'>('watermark')
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrls, setDownloadUrls] = useState<{url: string; name: string}[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    type: 'text',
    text: 'CONFIDENTIAL',
    fontSize: 48,
    opacity: 0.3,
    position: 'center',
    rotation: 45,
    color: '#000000'
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    password: '',
    permissions: {
      print: true,
      copy: false,
      modify: false,
      annotate: false
    }
  })

  const [unlockPassword, setUnlockPassword] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf')
    if (pdfFiles.length === 0) {
      setError('Please upload PDF files only')
      return
    }
    setFiles(pdfFiles)
    setError(null)
    setDownloadUrls([])
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
      setError('Please select PDF files to process')
      return
    }

    if (activeTab === 'security' && !securitySettings.password) {
      setError('Please enter a password for protection')
      return
    }

    if (activeTab === 'unlock' && !unlockPassword) {
      setError('Please enter the password to unlock PDF')
      return
    }

    setIsProcessing(true)
    setError(null)
    const results: {url: string; name: string}[] = []

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        
        if (activeTab === 'watermark') {
          formData.append('settings', JSON.stringify(watermarkSettings))
        } else if (activeTab === 'security') {
          formData.append('settings', JSON.stringify(securitySettings))
        } else if (activeTab === 'unlock') {
          formData.append('password', unlockPassword)
        }

        const response = await fetch('/api/pdf-tools', {
          method: 'POST',
          headers: {
            'X-Operation': activeTab
          },
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to process ${file.name}`)
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const baseName = file.name.replace('.pdf', '')
        const suffix = activeTab === 'watermark' ? 'watermarked' : 
                      activeTab === 'security' ? 'protected' : 'unlocked'
        
        results.push({
          url,
          name: `${baseName}-${suffix}.pdf`
        })
      }

      setDownloadUrls(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during processing')
    } finally {
      setIsProcessing(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const positions = [
    { value: 'center', label: 'Center' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' }
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
            <Shield className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Watermark & Security</h1>
          <p className="text-xl text-gray-600">
            Add watermarks, password protection, and manage PDF security permissions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-xl shadow-sm border border-b-0">
          <div className="flex">
            <button
              onClick={() => setActiveTab('watermark')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-tl-xl ${
                activeTab === 'watermark'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Droplets className="h-5 w-5 mx-auto mb-2" />
              Add Watermark
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'security'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Lock className="h-5 w-5 mx-auto mb-2" />
              Protect PDF
            </button>
            <button
              onClick={() => setActiveTab('unlock')}
              className={`flex-1 py-4 px-6 text-center font-medium rounded-tr-xl ${
                activeTab === 'unlock'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Unlock className="h-5 w-5 mx-auto mb-2" />
              Unlock PDF
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white shadow-sm border border-t-0 p-8">
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
              {isDragActive ? 'Drop PDF files here' : 'Click or drag PDF files here'}
            </p>
            <p className="text-gray-500">
              Upload one or more PDF files to process
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-purple-600 mr-3" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-gray-500 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-purple-400 hover:text-purple-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-b-xl shadow-sm border border-t-0 p-8">
          {activeTab === 'watermark' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Watermark Settings</h3>
              
              {/* Watermark Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setWatermarkSettings({...watermarkSettings, type: 'text'})}
                    className={`flex items-center px-4 py-2 rounded-lg border ${
                      watermarkSettings.type === 'text'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </button>
                  <button
                    onClick={() => setWatermarkSettings({...watermarkSettings, type: 'image'})}
                    className={`flex items-center px-4 py-2 rounded-lg border ${
                      watermarkSettings.type === 'image'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </button>
                </div>
              </div>

              {watermarkSettings.type === 'text' && (
                <>
                  {/* Text Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                    <input
                      type="text"
                      value={watermarkSettings.text || ''}
                      onChange={(e) => setWatermarkSettings({...watermarkSettings, text: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter watermark text"
                    />
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {watermarkSettings.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="100"
                      value={watermarkSettings.fontSize || 48}
                      onChange={(e) => setWatermarkSettings({...watermarkSettings, fontSize: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      value={watermarkSettings.color || '#000000'}
                      onChange={(e) => setWatermarkSettings({...watermarkSettings, color: e.target.value})}
                      className="w-20 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <select
                  value={watermarkSettings.position || 'center'}
                  onChange={(e) => setWatermarkSettings({...watermarkSettings, position: e.target.value as 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {positions.map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity: {Math.round((watermarkSettings.opacity || 0.3) * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={watermarkSettings.opacity || 0.3}
                  onChange={(e) => setWatermarkSettings({...watermarkSettings, opacity: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* Rotation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation: {watermarkSettings.rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={watermarkSettings.rotation || 45}
                  onChange={(e) => setWatermarkSettings({...watermarkSettings, rotation: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={securitySettings.password || ''}
                    onChange={(e) => setSecuritySettings({...securitySettings, password: e.target.value})}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter password for protection"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                <div className="space-y-3">
                  {Object.entries(securitySettings.permissions || {}).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          permissions: {
                            ...securitySettings.permissions!,
                            [key]: e.target.checked
                          }
                        })}
                        className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700 capitalize">Allow {key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'unlock' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Unlock PDF</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={unlockPassword}
                    onChange={(e) => setUnlockPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter PDF password to unlock"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This will remove password protection from your PDF files
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 flex items-center">
            <Shield className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Process Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={processFiles}
            disabled={files.length === 0 || isProcessing}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                {activeTab === 'watermark' ? 'Add Watermark' : 
                 activeTab === 'security' ? 'Protect PDF' : 'Unlock PDF'}
              </>
            )}
          </button>
        </div>

        {/* Download Results */}
        {downloadUrls.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-8 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Download Processed Files</h3>
            <div className="space-y-3">
              {downloadUrls.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-purple-600 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <a
                    href={item.url}
                    download={item.name}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Security Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Watermarks</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Text or image watermarks</li>
                <li>• Customizable position & opacity</li>
                <li>• Rotation and color options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Password Protection</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Strong encryption</li>
                <li>• Custom permissions</li>
                <li>• Print & copy restrictions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">PDF Unlock</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Remove password protection</li>
                <li>• Bulk processing</li>
                <li>• Secure handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
