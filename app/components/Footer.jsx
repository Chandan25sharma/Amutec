"use client";

import { FileText } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
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
              <li>
                <Link href="/tools/merge" className="hover:text-white">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/split" className="hover:text-white">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/compress" className="hover:text-white">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/resume-analyzer"
                  className="hover:text-white"
                >
                  Resume Analyzer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Amutec. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
