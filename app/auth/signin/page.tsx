'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, Github, Mail, Chrome } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
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
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Sign In Form */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to access premium features and save your preferences
            </p>
          </div>

          {/* Note about guest usage */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-700 text-sm text-center">
              <strong>Note:</strong> You can use all our tools without signing in. 
              An account is only needed for premium features and saving preferences.
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Chrome className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>

            {/* GitHub Sign In */}
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Continue with GitHub</span>
            </button>

            {/* Email Sign In */}
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <span className="font-medium text-gray-700">Continue with Email</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/tools" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue as Guest →
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            Benefits of Creating an Account
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Save your tool preferences and settings
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Access to premium AI features
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Priority customer support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Extended file processing limits
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Cloud storage integration
            </li>
          </ul>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:text-blue-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
