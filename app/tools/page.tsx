'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { 
  
  Merge, 
  Split, 
  Minimize2, 
  RotateCcw, 
  FileImage,
  Brain,
  ArrowRight,
  Layout,
  Wrench,
  Shield,
  PenTool
} from 'lucide-react'

const tools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document easily',
    icon: Merge,
    href: '/tools/merge',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Split PDF',
    description: 'Extract specific pages or split by ranges from your PDF',
    icon: Split,
    href: '/tools/split',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Compress PDF',
    description: 'Reduce file size while preserving document quality',
    icon: Minimize2,
    href: '/tools/compress',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF documents to correct orientation',
    icon: RotateCcw,
    href: '/tools/rotate',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Convert Files',
    description: 'Convert between PDF, Word, Excel, PowerPoint, and image formats',
    icon: FileImage,
    href: '/tools/convert',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'Get AI-powered feedback and career advice for your resume',
    icon: Brain,
    href: '/tools/resume-analyzer',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    title: 'Organize Pages',
    description: 'Reorder, rotate, and delete PDF pages with drag-and-drop interface',
    icon: Layout,
    href: '/tools/organize',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    title: 'Repair PDF',
    description: 'Fix corrupted or damaged PDF files and recover content',
    icon: Wrench,
    href: '/tools/repair',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    title: 'Watermark & Security',
    description: 'Add watermarks, password protection, and security permissions',
    icon: Shield,
    href: '/tools/watermark',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Annotate PDF',
    description: 'Add text, highlights, shapes, and drawings to PDF documents',
    icon: PenTool,
    href: '/tools/annotate',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/icon.png" alt="File Icon" width={62} height={82}  className="object-contain" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-blue-600 font-medium">Tools</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <Link 
              href="/auth/signin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional PDF Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete suite of PDF editing tools and AI-powered features. 
            No registration required - start processing your files instantly.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className={`${tool.bgColor} rounded-xl p-8 border hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                  <div className="flex items-center mb-4">
                    <div className="bg-white rounded-lg p-3">
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-4">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">{tool.description}</p>
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
