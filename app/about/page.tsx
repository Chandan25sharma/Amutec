"use client";

import {
  Award,
  Brain,
  FileText,
  Globe,
  Heart,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
              <Link href="/tools" className="text-gray-600 hover:text-gray-900">
                Tools
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Amutec
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to make PDF editing and career development
            accessible to everyone. Our comprehensive suite of tools combines
            powerful document processing with AI-driven career insights.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              To empower professionals and students with the tools they need to
              succeed in their careers, while making document management
              effortless and efficient.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <Shield className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Privacy First
            </h3>
            <p className="text-gray-600">
              Your files are processed securely and never stored on our servers.
              We believe your documents should remain private and under your
              control.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8">
            <Users className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No Registration Required
            </h3>
            <p className="text-gray-600">
              Use all our tools without creating an account. We believe powerful
              tools should be accessible to everyone, immediately.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8">
            <Zap className="h-10 w-10 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Client-side processing ensures instant results without uploading
              files to servers. Your productivity is our priority.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-8">
            <Brain className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI-Powered
            </h3>
            <p className="text-gray-600">
              Advanced AI provides personalized resume feedback and career
              advice to help you land your dream job.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What We Offer
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Complete PDF Tools Suite
                </h4>
                <p className="text-gray-600">
                  Merge, split, compress, rotate, and convert PDFs with
                  professional-grade tools that work directly in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Globe className="h-6 w-6 text-green-600 mr-4 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Universal File Conversion
                </h4>
                <p className="text-gray-600">
                  Convert between PDF, Word, Excel, PowerPoint, and image
                  formats seamlessly. Support for all major file types.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Brain className="h-6 w-6 text-purple-600 mr-4 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  AI Career Assistant
                </h4>
                <p className="text-gray-600">
                  Get personalized resume analysis, ATS optimization tips, and
                  career advice powered by advanced AI technology.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Award className="h-6 w-6 text-yellow-600 mr-4 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Professional Quality
                </h4>
                <p className="text-gray-600">
                  Enterprise-grade document processing with pixel-perfect
                  results. Trusted by professionals worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-blue-100">
                Complex tasks made simple through intuitive design and powerful
                automation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-blue-100">
                Your privacy and data security are paramount in everything we
                build.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-blue-100">
                Constantly evolving with the latest technology to serve you
                better.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who trust Amutec for their document
            and career needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Try Our Tools
            </Link>
            <Link
              href="/contact"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
