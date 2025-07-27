import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amutec - Complete PDF Tools & AI Resume Analyzer",
  description: "Professional PDF editing tools, file conversion, and AI-powered resume analysis. Merge, split, compress PDFs and get career advice.",
  keywords: "PDF tools, merge PDF, split PDF, compress PDF, convert PDF, resume analyzer, AI career advice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
