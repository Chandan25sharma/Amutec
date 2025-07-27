'use client'

import React from 'react'
import Link from 'next/link'
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Search, 
  PlayCircle, 
  Download,
  MessageSquare,
  FileQuestion,
  Settings,
  Shield
} from 'lucide-react'

const helpCategories = [
  {
    title: 'Getting Started',
    icon: PlayCircle,
    description: 'Learn the basics of using Amutec tools',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    articles: [
      'How to upload and process your first PDF',
      'Understanding our tool interface',
      'Tips for faster file processing',
      'Choosing the right tool for your needs'
    ]
  },
  {
    title: 'PDF Tools',
    icon: FileText,
    description: 'Complete guides for all PDF operations',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    articles: [
      'Merging multiple PDFs step-by-step',
      'Splitting PDFs by pages or ranges',
      'Compressing PDFs for smaller file sizes',
      'Rotating and organizing PDF pages'
    ]
  },
  {
    title: 'File Conversion',
    icon: BookOpen,
    description: 'Convert between different file formats',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    articles: [
      'PDF to Word conversion guide',
      'Converting Excel files to PDF',
      'Image to PDF conversion tips',
      'PowerPoint to PDF best practices'
    ]
  },
  {
    title: 'AI Resume Analyzer',
    icon: Search,
    description: 'Get the most from AI career insights',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    articles: [
      'How to prepare your resume for analysis',
      'Understanding your resume score',
      'Implementing AI suggestions effectively',
      'ATS optimization strategies'
    ]
  },
  {
    title: 'Troubleshooting',
    icon: Settings,
    description: 'Solve common issues and problems',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    articles: [
      'File upload issues and solutions',
      'Browser compatibility problems',
      'Processing errors and fixes',
      'Performance optimization tips'
    ]
  },
  {
    title: 'Security & Privacy',
    icon: Shield,
    description: 'Learn about our security measures',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    articles: [
      'How we protect your files',
      'Data privacy and retention policies',
      'Secure file processing explained',
      'Account security best practices'
    ]
  }
]

const quickActions = [
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: PlayCircle,
    href: '#',
    color: 'text-red-600'
  },
  {
    title: 'Download Guides',
    description: 'Get PDF guides for offline reading',
    icon: Download,
    href: '#',
    color: 'text-blue-600'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: MessageSquare,
    href: '/contact',
    color: 'text-green-600'
  },
  {
    title: 'FAQ',
    description: 'Find answers to common questions',
    icon: FileQuestion,
    href: '/faq',
    color: 'text-purple-600'
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-gray-600 hover:text-gray-900">Tools</Link>
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

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about using Amutec&apos;s PDF tools and AI features. 
            Find guides, tutorials, and answers to common questions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-12">
          <div className="relative max-w-xl mx-auto">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              href={action.href}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-3">
                <action.icon className={`h-8 w-8 ${action.color} mr-3`} />
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse Help Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className={`${category.bgColor} rounded-xl p-8 border`}>
                <div className="flex items-center mb-4">
                  <div className="bg-white rounded-lg p-3">
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-gray-700 mb-6">{category.description}</p>
                
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <Link 
                      key={articleIndex}
                      href="#"
                      className="block text-gray-600 hover:text-gray-900 text-sm py-1 hover:underline"
                    >
                      • {article}
                    </Link>
                  ))}
                </div>
                
                <Link 
                  href="#"
                  className={`inline-block mt-4 font-medium ${category.color} hover:underline`}
                >
                  View all articles →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Guides */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Guides
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Complete PDF Workflow Guide
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Learn how to efficiently process PDFs from start to finish using our complete toolkit.
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Read guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 rounded-lg p-3 mr-4">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Resume Optimization Masterclass
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Master the art of resume optimization with our AI-powered analyzer and expert tips.
                </p>
                <Link href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Read guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  File Conversion Best Practices
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Get perfect results every time with our comprehensive conversion guide.
                </p>
                <Link href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Read guide →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-100 rounded-lg p-3 mr-4">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Troubleshooting Common Issues
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Quick solutions to the most common problems users encounter.
                </p>
                <Link href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  Read guide →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is standing by to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Contact Support
            </Link>
            <Link 
              href="/faq" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
