"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Image
              src="/icon.png"
              alt="File Icon"
              width={62}
              height={82}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">Amutec</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/tools" className="text-gray-600 hover:text-gray-900">
              Tools
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
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
  );
}
