'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, HelpCircle, BookOpen, Search, Zap } from 'lucide-react'

const faqData = [
  {
    category: 'General',
    icon: HelpCircle,
    questions: [
      {
        q: 'Do I need to create an account to use Amutec?',
        a: 'No! You can use all our PDF tools without creating an account. However, creating an account allows you to save your preferences and access premium features.'
      },
      {
        q: 'Are my files secure?',
        a: 'Absolutely. Your files are processed locally in your browser whenever possible and are never stored on our servers. We prioritize your privacy and security.'
      },
      {
        q: 'Is Amutec free to use?',
        a: 'Yes, all our core PDF tools are completely free to use. We also offer premium features for advanced users and businesses.'
      },
      {
        q: 'What file formats do you support?',
        a: 'We support PDF, Word (DOC/DOCX), Excel (XLS/XLSX), PowerPoint (PPT/PPTX), and common image formats (JPG, PNG, GIF).'
      }
    ]
  },
  {
    category: 'PDF Tools',
    icon: FileText,
    questions: [
      {
        q: 'What is the maximum file size I can upload?',
        a: 'You can upload files up to 100MB in size. For larger files, please contact our support team for assistance.'
      },
      {
        q: 'Can I merge password-protected PDFs?',
        a: 'Yes, you can merge password-protected PDFs. You\'ll need to provide the password for each protected file during the upload process.'
      },
      {
        q: 'How do I split a PDF into specific page ranges?',
        a: 'Use our Split PDF tool and select "Split by Ranges". Enter each range on a new line (e.g., "1-5" for pages 1 to 5). Each range will create a separate PDF file.'
      },
      {
        q: 'Why is my compressed PDF larger than the original?',
        a: 'This can happen if your PDF is already well-optimized or contains mostly text. Try using a higher compression level or consider that some PDFs cannot be compressed further.'
      }
    ]
  },
  {
    category: 'File Conversion',
    icon: BookOpen,
    questions: [
      {
        q: 'How accurate is PDF to Word conversion?',
        a: 'Our conversion maintains high accuracy for text and basic formatting. Complex layouts may require manual adjustment. The accuracy depends on the original PDF structure.'
      },
      {
        q: 'Can I convert multiple files at once?',
        a: 'Yes! You can select multiple files for conversion. Each file will be converted individually and made available for download.'
      },
      {
        q: 'What happens to images during conversion?',
        a: 'Images are preserved during conversion and embedded in the output file. The quality may be adjusted based on the target format requirements.'
      },
      {
        q: 'Why can\'t I convert some PDF files?',
        a: 'Some PDFs may be password-protected, corrupted, or have restrictions that prevent conversion. Try removing passwords first or check if the file opens properly in other PDF viewers.'
      }
    ]
  },
  {
    category: 'AI Resume Analyzer',
    icon: Search,
    questions: [
      {
        q: 'How does the AI resume analyzer work?',
        a: 'Our AI analyzes your resume content, structure, and keywords to provide personalized feedback on strengths, weaknesses, and improvement suggestions.'
      },
      {
        q: 'Is my resume data kept private?',
        a: 'Yes, your resume is processed securely and is not stored or used for any purpose other than providing your analysis. We respect your privacy completely.'
      },
      {
        q: 'What is ATS optimization?',
        a: 'ATS (Applicant Tracking System) optimization ensures your resume can be properly read by automated systems that many employers use to screen applications.'
      },
      {
        q: 'Can I get analysis for different job types?',
        a: 'Yes! Include the job description in the optional field to get targeted analysis and keyword recommendations specific to that role.'
      }
    ]
  },
  {
    category: 'Technical',
    icon: Zap,
    questions: [
      {
        q: 'Which browsers are supported?',
        a: 'Amutec works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.'
      },
      {
        q: 'Why is processing slow on my device?',
        a: 'Processing speed depends on your device\'s capabilities and file size. Larger files naturally take longer to process. Consider closing other browser tabs to free up memory.'
      },
      {
        q: 'Can I use Amutec on mobile devices?',
        a: 'Yes! Our tools are fully responsive and work on mobile devices. However, some features may work better on desktop browsers due to processing requirements.'
      },
      {
        q: 'What should I do if a tool isn\'t working?',
        a: 'First, try refreshing the page and ensure you\'re using a supported browser. If the issue persists, please contact our support team with details about the problem.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const filteredFAQs = faqData.filter(category => {
    if (selectedCategory !== 'all' && category.category.toLowerCase() !== selectedCategory) {
      return false
    }
    
    if (searchTerm) {
      return category.questions.some(qa => 
        qa.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return true
  })

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

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our PDF tools, file conversion, and AI features.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {faqData.map(category => (
                  <option key={category.category} value={category.category.toLowerCase()}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center">
                  <category.icon className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {category.questions
                  .filter(qa => {
                    if (!searchTerm) return true
                    return qa.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           qa.a.toLowerCase().includes(searchTerm.toLowerCase())
                  })
                  .map((qa, index) => (
                    <details key={index} className="group">
                      <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 pr-4">{qa.q}</h3>
                        <div className="text-gray-400 group-open:rotate-180 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{qa.a}</p>
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or selecting a different category.
            </p>
          </div>
        )}

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Contact Support
            </Link>
            <Link 
              href="/help" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
