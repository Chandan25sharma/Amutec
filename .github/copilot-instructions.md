# Copilot Instructions for Amutec PDF Tools

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive PDF web application called "Amutec" built with Next.js 15 that provides:
- PDF editing tools (merge, split, compress, convert, organize, repair)
- File conversion (Word/PowerPoint/Excel/JPG to PDF and vice versa)
- PDF annotation and security features
- AI-powered resume analysis and career advice
- User authentication (optional - guest usage allowed)
- Cloud integration with Google Drive and Dropbox

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with MongoDB adapter
- **Database**: MongoDB Atlas
- **PDF Processing**: pdf-lib, pdfjs-dist (client-side processing)
- **AI Features**: OpenAI API for resume analysis
- **File Upload**: react-dropzone
- **UI Components**: Radix UI, Lucide React icons
- **Deployment**: Vercel (serverless)

## Key Features to Implement
1. **Core PDF Tools**: Merge, split, compress, organize, repair PDFs
2. **Format Conversion**: Bidirectional conversion between PDF and Word/PowerPoint/Excel/JPG
3. **PDF Editing**: Add text, shapes, images, watermarks, page numbers
4. **Security**: Password protection, unlock PDFs, rotate pages
5. **AI Resume Analyzer**: Upload resume, get AI-powered feedback and career advice
6. **User System**: Optional login with Google/GitHub/Facebook, guest usage allowed
7. **Cloud Integration**: Import/export from Google Drive and Dropbox
8. **Mobile Responsive**: Works on all devices

## Architecture Guidelines
- Use App Router for all routes
- Implement client-side PDF processing for better performance
- Support guest users (no authentication required for basic features)
- Use serverless functions for AI features and cloud integrations
- Ensure all operations work offline when possible
- Implement proper error handling and loading states
- Follow accessibility best practices

## Code Style
- Use TypeScript for type safety
- Implement proper error boundaries
- Use Tailwind CSS for styling
- Follow Next.js 15 best practices
- Implement proper loading and error states
- Use React hooks effectively
- Ensure mobile-first responsive design
