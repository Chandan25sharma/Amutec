import mammoth from 'mammoth'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export interface ConversionResult {
  success: boolean
  data?: Uint8Array
  error?: string
  fileName?: string
}

export class FileConverter {
  // Convert Word document to PDF
  static async wordToPDF(file: File): Promise<ConversionResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })
      
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
      const lines = result.value.split('\n')
      const pageHeight = 792 // Letter size
      const pageWidth = 612
      const margin = 50
      const lineHeight = 14
      const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight)
      
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      let currentY = pageHeight - margin
      let lineCount = 0
      
      for (const line of lines) {
        if (lineCount >= maxLinesPerPage) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight])
          currentY = pageHeight - margin
          lineCount = 0
        }
        
        currentPage.drawText(line, {
          x: margin,
          y: currentY,
          size: 12,
          font: font,
          color: rgb(0, 0, 0)
        })
        
        currentY -= lineHeight
        lineCount++
      }
      
      const pdfBytes = await pdfDoc.save()
      
      return {
        success: true,
        data: pdfBytes,
        fileName: file.name.replace(/\.(doc|docx)$/i, '.pdf')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to convert Word to PDF'
      }
    }
  }

  // Convert images to PDF
  static async imagesToPDF(files: File[]): Promise<ConversionResult> {
    try {
      const pdfDoc = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        let image
        
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer)
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer)
        } else {
          throw new Error(`Unsupported image type: ${file.type}`)
        }
        
        const page = pdfDoc.addPage()
        const { width: pageWidth, height: pageHeight } = page.getSize()
        
        // Scale image to fit page while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height
        const pageAspectRatio = pageWidth / pageHeight
        
        let drawWidth, drawHeight
        
        if (imageAspectRatio > pageAspectRatio) {
          // Image is wider than page
          drawWidth = pageWidth * 0.9
          drawHeight = drawWidth / imageAspectRatio
        } else {
          // Image is taller than page
          drawHeight = pageHeight * 0.9
          drawWidth = drawHeight * imageAspectRatio
        }
        
        const x = (pageWidth - drawWidth) / 2
        const y = (pageHeight - drawHeight) / 2
        
        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      
      return {
        success: true,
        data: pdfBytes,
        fileName: `images-to-pdf-${Date.now()}.pdf`
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to convert images to PDF'
      }
    }
  }

 static async pdfToImages(file: File): Promise<{
  success: boolean
  images?: string[]
  error?: string
}> {
  try {
    // Placeholder logic: you can later integrate actual conversion using `pdf2pic`, `pdfjs-dist`, etc.
    console.log("Received file for PDF→Image conversion:", file.name);

    // For now, return a mock response
    return {
      success: false,
      error:
        'PDF to image conversion requires additional setup (canvas or pdf2pic library).',
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected error during PDF to image conversion.',
    };
  }
}


  // Extract text from various file formats
  static async extractText(file: File): Promise<{
    success: boolean
    text?: string
    error?: string
  }> {
    try {
      if (file.type === 'application/pdf') {
        // Use PDF processor for PDF files
        const { PDFProcessor } = await import('./pdf-processor')
        return await PDFProcessor.extractTextFromPDF()
      } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        return {
          success: true,
          text: result.value
        }
      } else if (file.type === 'text/plain') {
        const text = await file.text()
        return {
          success: true,
          text
        }
      } else {
        return {
          success: false,
          error: `Unsupported file type: ${file.type}`
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to extract text'
      }
    }
  }

  // Get file type icon
  static getFileTypeIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'pdf':
        return '📄'
      case 'doc':
      case 'docx':
        return '📝'
      case 'xls':
      case 'xlsx':
        return '📊'
      case 'ppt':
      case 'pptx':
        return '📊'
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️'
      case 'txt':
        return '📄'
      default:
        return '📁'
    }
  }

  // Format file size
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Validate file type
  static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => 
      file.type === type || 
      file.name.toLowerCase().endsWith(type.replace('application/', '.'))
    )
  }
}
