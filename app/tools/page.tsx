"use client";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Download,
  FileImage,
  Layout,
  Lock,
  Merge,
  Minimize2,
  PenTool,
  RotateCcw,
  Shield,
  Split,
  Star,
  Upload,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into a single document",
    icon: Merge,
    href: "/tools/merge",
    color: "text-green-600",
    bgColor: "bg-green-50/50",
  },
  {
    title: "Split PDF",
    description: "Extract specific pages or split by ranges",
    icon: Split,
    href: "/tools/split",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50/50",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while preserving quality",
    icon: Minimize2,
    href: "/tools/compress",
    color: "text-purple-600",
    bgColor: "bg-purple-50/50",
  },
  {
    title: "Rotate PDF",
    description: "Rotate pages to correct orientation",
    icon: RotateCcw,
    href: "/tools/rotate",
    color: "text-amber-600",
    bgColor: "bg-amber-50/50",
  },
  {
    title: "Convert Files",
    description: "Convert between PDF, Word, Excel, and images",
    icon: FileImage,
    href: "/tools/convert",
    color: "text-rose-600",
    bgColor: "bg-rose-50/50",
  },
  {
    title: "AI Resume Analyzer",
    description: "Get AI-powered feedback on your resume",
    icon: Brain,
    href: "/tools/resume-analyzer",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50/50",
  },
  {
    title: "Organize Pages",
    description: "Reorder, rotate, and delete PDF pages",
    icon: Layout,
    href: "/tools/organize",
    color: "text-violet-600",
    bgColor: "bg-violet-50/50",
  },
  {
    title: "Repair PDF",
    description: "Fix corrupted or damaged PDF files",
    icon: Wrench,
    href: "/tools/repair",
    color: "text-red-600",
    bgColor: "bg-red-50/50",
  },
  {
    title: "Watermark & Security",
    description: "Add watermarks and password protection",
    icon: Shield,
    href: "/tools/watermark",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50/50",
  },
  {
    title: "Annotate PDF",
    description: "Add text, highlights, and shapes",
    icon: PenTool,
    href: "/tools/annotate",
    color: "text-green-600",
    bgColor: "bg-green-50/50",
  },
];

const features = [
  {
    title: "Instant Processing",
    description: "No waiting times, process files immediately",
    icon: Zap,
  },
  {
    title: "Secure & Private",
    description: "Files are processed locally and never stored",
    icon: Lock,
  },
  {
    title: "No Watermarks",
    description: "Clean output without any branding",
    icon: CheckCircle,
  },
  {
    title: "Easy to Use",
    description: "Simple interface, no learning required",
    icon: Users,
  },
];

const stats = [
  { number: "50K+", label: "Files Processed" },
  { number: "98%", label: "Success Rate" },
  { number: "24/7", label: "Availability" },
  { number: "0", label: "Registration Required" },
];

const workflow = [
  {
    step: "01",
    title: "Upload File",
    description: "Drag & drop or select your document",
    icon: Upload,
  },
  {
    step: "02",
    title: "Process",
    description: "Choose your desired tool and settings",
    icon: Zap,
  },
  {
    step: "03",
    title: "Download",
    description: "Get your processed file instantly",
    icon: Download,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Minimal */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/icon.png"
                  alt="Amutec"
                  width={40}
                  height={40}
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Amutec
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/tools"
                className="text-green-600 font-medium border-b-2 border-green-600 pb-1"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
              >
                Sign In
              </Link>
              <Link
                href="/tools/merge"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-1" />
            Trusted by thousands worldwide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Professional
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 block">
              PDF Tools
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Complete suite of PDF editing tools powered by AI. Process your
            files securely with no registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#tools"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
            >
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/tools/resume-analyzer"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
            >
              <Brain className="mr-2 h-5 w-5" />
              AI Resume Analyzer
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Tools in One Place
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to work with PDFs and documents. Simple, fast,
              and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                  <div
                    className={`${tool.bgColor} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <span>Use Tool</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to process your documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-600 transition-colors">
                    <step.icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Amutec?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-colors h-full">
                  <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <feature.icon className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Amutec for their document
            processing needs. No registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/merge"
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Processing Files
            </Link>
            <Link
              href="/about"
              className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Image
              src="/icon.png"
              alt="Amutec"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold">Amutec</span>
          </div>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Professional PDF tools and AI-powered document processing.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Amutec. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
