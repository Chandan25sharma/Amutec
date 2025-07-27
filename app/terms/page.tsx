'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, Scale, UserX, RefreshCw, Shield } from 'lucide-react'

export default function TermsPage() {
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
            <Scale className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of Amutec&apos;s services. Please read them carefully.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 27, 2025
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Fair Use</h3>
            <p className="text-gray-600 text-sm">
              Use our services responsibly and in accordance with applicable laws
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <UserX className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">No Abuse</h3>
            <p className="text-gray-600 text-sm">
              Prohibited uses include illegal content and system abuse
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <RefreshCw className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Updates</h3>
            <p className="text-gray-600 text-sm">
              We may update these terms and will notify you of changes
            </p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-sm border p-8 prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Amutec&apos;s services, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-gray-600">
              These terms apply to all users of our website, including both registered and guest users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              Amutec provides online PDF tools, file conversion services, and AI-powered resume analysis. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>PDF merging, splitting, compression, and rotation tools</li>
              <li>File conversion between PDF, Word, Excel, PowerPoint, and image formats</li>
              <li>AI-powered resume analysis and career advice</li>
              <li>Document processing and optimization features</li>
            </ul>
            <p className="text-gray-600">
              We reserve the right to modify, suspend, or discontinue any part of our service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Usage</h3>
            <p className="text-gray-600 mb-4">
              You may use our basic services without creating an account. Guest users have access to all core PDF tools and conversion features.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Registered Accounts</h3>
            <p className="text-gray-600 mb-4">
              Creating an account provides additional benefits including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Saved preferences and settings</li>
              <li>Access to premium features</li>
              <li>Priority customer support</li>
              <li>Extended processing limits</li>
            </ul>
            
            <p className="text-gray-600">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Permitted Uses</h3>
            <p className="text-gray-600 mb-4">
              You may use our services for lawful purposes including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Processing your own documents and files</li>
              <li>Converting files for legitimate business or personal use</li>
              <li>Analyzing resumes for career development</li>
              <li>Educational and research purposes</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Uses</h3>
            <p className="text-gray-600 mb-4">
              You may not use our services to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Process illegal, harmful, or copyrighted content without permission</li>
              <li>Attempt to circumvent security measures or access restrictions</li>
              <li>Overload our systems or interfere with other users&apos; access</li>
              <li>Use automated tools to abuse our services</li>
              <li>Reverse engineer or attempt to extract our algorithms</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and File Processing</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Content</h3>
            <p className="text-gray-600 mb-4">
              You retain ownership of all files and content you upload to our services. By uploading content, you grant us a limited license to process it solely for the purpose of providing our services.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">File Security</h3>
            <p className="text-gray-600 mb-4">
              We implement strong security measures to protect your files:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Files are processed locally when possible</li>
              <li>Server-processed files are automatically deleted after processing</li>
              <li>All transmissions are encrypted using SSL/TLS</li>
              <li>We never store files permanently or use them for training purposes</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Responsibility</h3>
            <p className="text-gray-600">
              You are solely responsible for the content you upload and must ensure you have the right to process and share such content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. AI Services and Limitations</h2>
            <p className="text-gray-600 mb-4">
              Our AI-powered resume analyzer provides suggestions and feedback based on algorithmic analysis. Please note:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>AI suggestions are automated and may not always be accurate or appropriate</li>
              <li>Results should be considered as guidance, not professional career advice</li>
              <li>We do not guarantee employment outcomes based on our recommendations</li>
              <li>You should review and validate all AI-generated content before use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-600 mb-4">
              While we strive to maintain high availability, we do not guarantee uninterrupted access to our services. 
              Maintenance, updates, or technical issues may temporarily affect service availability.
            </p>
            <p className="text-gray-600">
              We are not liable for any losses resulting from service interruptions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, Amutec and its affiliates shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of data, revenue, or business opportunities</li>
              <li>Damages resulting from use or inability to use our services</li>
              <li>Any content processed through our services</li>
            </ul>
            <p className="text-gray-600">
              Our total liability to you for any claims shall not exceed the amount you have paid us in the past 12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              Our services, including software, algorithms, designs, and content, are protected by intellectual property laws. 
              You may not copy, modify, distribute, or create derivative works without our express permission.
            </p>
            <p className="text-gray-600">
              Trademarks, logos, and brand names are the property of their respective owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-4">
              We may suspend or terminate your access to our services at any time for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Violation of these terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Abuse of our systems or resources</li>
              <li>Non-payment of fees (for premium services)</li>
            </ul>
            <p className="text-gray-600">
              You may stop using our services at any time. Upon termination, your account and data will be deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update these terms from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. 
              Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
            <p className="text-gray-600">
              For significant changes, we will provide additional notice through email or website notifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600">
              These terms are governed by the laws of the United States and the state in which our company is incorporated. 
              Any disputes will be resolved in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <ul className="list-none text-gray-600">
              <li>Email: legal@amutec.com</li>
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
