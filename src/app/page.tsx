'use client'

import React from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Merge, 
  Split, 
  Minimize2, 
  RotateCcw, 
  FileImage,
  Shield,
  Users,
  Brain,
  Zap,
  ArrowRight
} from 'lucide-react'

const tools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
    icon: Merge,
    href: '/tools/merge',
    color: 'text-blue-600'
  },
  {
    title: 'Split PDF',
    description: 'Extract specific pages or split by ranges',
    icon: Split,
    href: '/tools/split',
    color: 'text-green-600'
  },
  {
    title: 'Compress PDF',
    description: 'Reduce file size while preserving quality',
    icon: Minimize2,
    href: '/tools/compress',
    color: 'text-purple-600'
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF documents',
    icon: RotateCcw,
    href: '/tools/rotate',
    color: 'text-orange-600'
  },
  {
    title: 'Convert Files',
    description: 'Convert between PDF, Word, Excel, and images',
    icon: FileImage,
    href: '/tools/convert',
    color: 'text-red-600'
  },
  {
    title: 'AI Resume Analyzer',
    description: 'Get AI-powered feedback on your resume',
    icon: Brain,
    href: '/tools/resume-analyzer',
    color: 'text-indigo-600'
  }
]

const features = [
  {
    title: 'No Registration Required',
    description: 'Use all tools without creating an account',
    icon: Users
  },
  {
    title: 'Secure & Private',
    description: 'Files are processed securely and not stored',
    icon: Shield
  },
  {
    title: 'Fast Processing',
    description: 'Client-side processing for instant results',
    icon: Zap
  },
  {
    title: 'AI-Powered',
    description: 'Advanced AI for resume analysis and career advice',
    icon: Brain
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </div>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Complete PDF Tools &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI Career Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional PDF editing tools, file conversion, and AI-powered resume analysis. 
            Merge, split, compress PDFs and get personalized career advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tools" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/tools/resume-analyzer" 
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center"
            >
              Try AI Resume Analyzer
              <Brain className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Tools for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Amutec?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your PDFs and Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust Amutec for their document needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tools" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Using Tools
            </Link>
            <Link 
              href="/auth/signin" 
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="text-xl font-bold">Amutec</span>
              </div>
              <p className="text-gray-400">
                Professional PDF tools and AI-powered career assistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools/merge" className="hover:text-white">Merge PDF</Link></li>
                <li><Link href="/tools/split" className="hover:text-white">Split PDF</Link></li>
                <li><Link href="/tools/compress" className="hover:text-white">Compress PDF</Link></li>
                <li><Link href="/tools/resume-analyzer" className="hover:text-white">Resume Analyzer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Amutec. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
