"use client";

import {
  Award,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  EyeOff,
  FileText,
  Github,
  Globe,
  Heart,
  Linkedin,
  Shield,
  Twitter,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const contributors = [
    {
      name: "Alex Chen",
      role: "Founder & Full Stack Developer",
      avatar: "/avatars/alex.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer & Frontend Developer",
      avatar: "/avatars/sarah.jpg",
    },
    {
      name: "Mike Rodriguez",
      role: "Backend & DevOps Engineer",
      avatar: "/avatars/mike.jpg",
    },
  ];

  const platformBenefits = [
    {
      icon: EyeOff,
      title: "No Tracking",
      description: "We don't track your activities or collect personal data",
    },
    {
      icon: Clock,
      title: "Instant Access",
      description: "No waiting periods - all tools available immediately",
    },
    {
      icon: DollarSign,
      title: "Completely Free",
      description: "No hidden costs, subscriptions, or premium tiers",
    },
    {
      icon: CheckCircle,
      title: "No Watermarks",
      description: "Clean, professional results without any branding",
    },
  ];

  const whyBetter = [
    {
      title: "Privacy Focused",
      description:
        "Unlike other platforms, we process everything locally in your browser. Your files never leave your computer.",
      advantage: "Complete data privacy",
    },
    {
      title: "No Account Required",
      description:
        "Skip the signup process. Start using our tools immediately without creating yet another account.",
      advantage: "Instant access",
    },
    {
      title: "Ad-Free Experience",
      description:
        "We believe in clean, distraction-free tools. No annoying ads or popups to interrupt your workflow.",
      advantage: "Better focus",
    },
    {
      title: "Unlimited Usage",
      description:
        "No daily limits, no file size restrictions (within reasonable bounds), use our tools as much as you need.",
      advantage: "No restrictions",
    },
  ];

  const ourPlatforms = [
    {
      name: "Coderspae",
      url: "https://coderspae.com",
      description: "Developer tools and resources platform",
      icon: "💻",
    },
    {
      name: "Bug3",
      url: "https://bug3.net",
      description: "Bug tracking and project management",
      icon: "🐛",
    },
    {
      name: "NeuroSymbolic AI",
      url: "https://neurosymbolicai.coderspae.com",
      description: "Advanced AI research and development",
      icon: "🧠",
    },
  ];

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

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
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

        {/* Our Platforms Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Platforms
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Amutec is part of a family of innovative platforms designed to make
            technology more accessible and productive for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ourPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{platform.icon}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {platform.name}
                </h3>
                <p className="text-gray-600 text-sm">{platform.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Why We're Better Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Amutec Over Others?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyBetter.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start mb-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-green-600 font-medium">
                      {item.advantage}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Benefits */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            What Makes Our Platform Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
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

        {/* Contributors Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Team
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            A small but passionate team of developers and designers dedicated to
            creating the best document processing experience for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-semibold">
                  {contributor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {contributor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{contributor.role}</p>
                <div className="flex justify-center space-x-3">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-800 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <Github className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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
