'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, Shield, Eye, Lock, Server, UserCheck } from 'lucide-react'

export default function PrivacyPage() {
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
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is our priority. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 27, 2025
          </p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Lock className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">No File Storage</h3>
            <p className="text-gray-600 text-sm">
              Your files are processed locally and never stored on our servers
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Transparent Practices</h3>
            <p className="text-gray-600 text-sm">
              Clear information about what data we collect and why
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
            <p className="text-gray-600 text-sm">
              You control your data and can delete it at any time
            </p>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-xl shadow-sm border p-8 prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Files You Upload</h3>
            <p className="text-gray-600 mb-4">
              When you use our PDF tools, you may upload documents for processing. These files are:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Processed locally in your browser whenever possible</li>
              <li>Temporarily processed on our servers only when necessary for specific features</li>
              <li>Never stored permanently on our servers</li>
              <li>Automatically deleted after processing is complete</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
            <p className="text-gray-600 mb-4">
              If you choose to create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile information from third-party services (Google, GitHub)</li>
              <li>User preferences and settings</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
            <p className="text-gray-600 mb-4">
              We automatically collect certain information about your use of our services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Pages visited and features used</li>
              <li>Time spent on our website</li>
              <li>Browser type and version</li>
              <li>Device information and screen resolution</li>
              <li>IP address and general location (country/region)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Server className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Service Provision</h4>
                  <p className="text-gray-600">To provide and improve our PDF tools and AI features</p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Security</h4>
                  <p className="text-gray-600">To protect our services and users from abuse and fraud</p>
                </div>
              </div>

              <div className="flex items-start">
                <UserCheck className="h-5 w-5 text-purple-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Communication</h4>
                  <p className="text-gray-600">To respond to your questions and provide customer support</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Service Providers:</strong> Trusted third parties who help us operate our website and provide services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> When you have given us explicit permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure server infrastructure and regular security updates</li>
              <li>Access controls and authentication systems</li>
              <li>Regular security audits and monitoring</li>
              <li>Data minimization and automatic deletion policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to improve your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-gray-600">
              You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-600">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <ul className="list-none text-gray-600">
              <li>Email: privacy@amutec.com</li>
              <li>Address: 123 Innovation Drive, Tech City, TC 12345</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/tools" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start Using Our Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
