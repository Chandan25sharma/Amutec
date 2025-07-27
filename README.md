# Amutec - Complete PDF Tools & AI Resume Analyzer

A comprehensive web application built with Next.js 15 that provides professional PDF editing tools, file conversion capabilities, and AI-powered resume analysis with career advice.

## 🌟 Features

### Core PDF Tools
- **Merge PDF**: Combine multiple PDF files into a single document
- **Split PDF**: Extract specific pages or split by ranges into multiple PDFs
- **Compress PDF**: Reduce PDF file size while preserving quality
- **Organize PDF**: Rearrange, rotate, or delete pages in a PDF file
- **PDF Repair**: Try to recover corrupted or broken PDF files

### File Conversion
- **To PDF**: Word (.doc/.docx), PowerPoint (.ppt/.pptx), Excel (.xls/.xlsx), JPG to PDF
- **From PDF**: PDF to Word, PowerPoint, Excel, JPG images

### PDF Annotation & Security
- **Edit PDF**: Add text, shapes, images, and annotations to PDFs
- **Watermark PDF**: Add custom watermarks (text or image) to your PDFs
- **Rotate PDF**: Rotate one or more pages in a PDF
- **Page Numbers**: Insert page numbers into a PDF
- **Unlock PDF**: Remove password protection from secured PDF files
- **Protect PDF**: Encrypt a PDF file with password protection

### AI-Powered Features
- **Resume Analyzer**: AI-powered resume analysis with career advice
- **ATS Score**: Get applicant tracking system compatibility score
- **Career Recommendations**: Personalized career advice and next steps
- **Skills Analysis**: Identify technical/soft skills and gaps

### User Features
- **Guest Usage**: Use all tools without registration
- **User Accounts**: Optional login with Google, GitHub, Facebook
- **Cloud Integration**: Import/export from Google Drive and Dropbox (planned)
- **Batch Processing**: Process multiple PDFs at once
- **Mobile Responsive**: Works seamlessly on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with MongoDB adapter
- **Database**: MongoDB Atlas
- **PDF Processing**: pdf-lib, pdfjs-dist (client-side)
- **AI Features**: OpenAI API for resume analysis
- **File Upload**: react-dropzone
- **UI Components**: Radix UI, Lucide React icons
- **Deployment**: Vercel (serverless)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amutec
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amutec

   # OAuth Providers
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret

   # OpenAI API
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### MongoDB Atlas Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Get your connection string and add it to `.env.local`

### OAuth Setup
1. **Google**: Create a project in Google Cloud Console, enable Google+ API
2. **GitHub**: Create a GitHub OAuth App in Developer Settings
3. **Facebook**: Create a Facebook App in Facebook Developers

### OpenAI API
1. Get your API key from OpenAI platform
2. Add it to your environment variables

## 🎯 Usage

### For Guests (No Registration)
- Upload PDFs and use all PDF tools
- Convert files between formats
- Process files locally in browser

### For Registered Users
- Save processing history
- Access AI resume analysis
- Cloud storage integration
- Premium features

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── api/           # API routes
│   ├── tools/         # Tool pages
│   ├── auth/          # Authentication pages
│   └── components/    # React components
├── lib/
│   ├── pdf-processor.ts    # PDF processing utilities
│   ├── file-converter.ts   # File conversion utilities
│   ├── resume-analyzer.ts  # AI resume analysis
│   ├── auth.ts            # Authentication config
│   └── utils.ts           # General utilities
└── components/
    └── ui/            # UI components
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the server: `npm run start`

## 🔒 Security & Privacy

- **Client-side Processing**: PDF operations happen in your browser
- **No File Storage**: Files are not permanently stored on servers
- **Secure Authentication**: OAuth providers and NextAuth.js
- **Encrypted Database**: MongoDB Atlas with SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- PDF.js for PDF rendering and text extraction
- pdf-lib for PDF manipulation
- OpenAI for AI-powered resume analysis
- Radix UI for accessible components
- Tailwind CSS for styling

## 📞 Support

- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]
- **Email**: support@amutec.com

---

Built with ❤️ using Next.js 15 and modern web technologies.
