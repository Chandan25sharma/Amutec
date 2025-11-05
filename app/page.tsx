"use client";

import { ArrowRight, Brain, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import DocumentSelector from "./components/DocumentSelector";
import Footer from "./components/Footer";
import Header from "./components/Header";

const features = [
  {
    title: "No Registration Required",
    description: "Use all tools without creating an account",
    icon: Users,
  },
  {
    title: "Secure & Private",
    description: "Files are processed securely and not stored",
    icon: Shield,
  },
  {
    title: "Fast Processing",
    description: "Client-side processing for instant results",
    icon: Zap,
  },
  {
    title: "AI-Powered",
    description: "Advanced AI for resume analysis and career advice",
    icon: Brain,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Complete PDF Tools &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              AI Career Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional PDF editing tools, file conversion, and AI-powered
            resume analysis. Merge, split, compress PDFs and get personalized
            career advice.
          </p>

          {/* Document Selector Component */}
          <DocumentSelector />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/tools"
              className="border border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition-colors font-semibold flex items-center justify-center"
            >
              Browse All Tools
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Amutec?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-green-600" />
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your PDFs and Career?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of professionals who trust Amutec for their document
            needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-center"
            >
              Start Processing Documents
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

      <Footer />
    </div>
  );
}
