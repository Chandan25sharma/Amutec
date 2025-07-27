import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
}

export interface PDFProcessingResult {
  success: boolean
  data?: Uint8Array
  error?: string
  pageCount?: number
  fileSize?: number
}

export class PDFProcessor {
  // Merge multiple PDFs into one
  static async mergePDFs(files: File[]): Promise<PDFProcessingResult> {
    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }
      
      const pdfBytes = await mergedPdf.save()
      
      return {
        success: true,
        data: pdfBytes,
        pageCount: mergedPdf.getPageCount(),
        fileSize: pdfBytes.length
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to merge PDFs'
      }
    }
  }

  // Split PDF into separate pages or ranges
  static async splitPDF(file: File, ranges?: { start: number; end: number }[]): Promise<PDFProcessingResult[]> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const totalPages = pdf.getPageCount()
      
      if (!ranges) {
        // Split into individual pages
        ranges = Array.from({ length: totalPages }, (_, i) => ({ start: i, end: i }))
      }
      
      const results: PDFProcessingResult[] = []
      
      for (const range of ranges) {
        const newPdf = await PDFDocument.create()
        const pageIndices = Array.from(
          { length: range.end - range.start + 1 },
          (_, i) => range.start + i
        ).filter(i => i < totalPages)
        
        const copiedPages = await newPdf.copyPages(pdf, pageIndices)
        copiedPages.forEach((page) => newPdf.addPage(page))
        
        const pdfBytes = await newPdf.save()
        
        results.push({
          success: true,
          data: pdfBytes,
          pageCount: newPdf.getPageCount(),
          fileSize: pdfBytes.length
        })
      }
      
      return results
    } catch (error) {
      return [{
        success: false,
        error: error instanceof Error ? error.message : 'Failed to split PDF'
      }]
    }
  }

  // Compress PDF by reducing image quality and removing unnecessary data
  static async compressPDF(file: File): Promise<PDFProcessingResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      
      // Basic compression by re-saving the PDF
      const pdfBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false
      })
      
      return {
        success: true,
        data: pdfBytes,
        pageCount: pdf.getPageCount(),
        fileSize: pdfBytes.length
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to compress PDF'
      }
    }
  }

  // Add watermark to PDF
  static async addWatermark(
    file: File, 
    watermarkText: string, 
    options: { opacity?: number; fontSize?: number; color?: string } = {}
  ): Promise<PDFProcessingResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const font = await pdf.embedFont(StandardFonts.Helvetica)
      
      const { opacity = 0.3, fontSize = 48, color = '#000000' } = options
      const pages = pdf.getPages()
      
      pages.forEach(page => {
        const { width, height } = page.getSize()
        
        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * fontSize) / 4,
          y: height / 2,
          size: fontSize,
          font: font,
          color: rgb(
            parseInt(color.slice(1, 3), 16) / 255,
            parseInt(color.slice(3, 5), 16) / 255,
            parseInt(color.slice(5, 7), 16) / 255
          ),
          opacity: opacity,
          rotate: degrees(45)
        })
      })
      
      const pdfBytes = await pdf.save()
      
      return {
        success: true,
        data: pdfBytes,
        pageCount: pdf.getPageCount(),
        fileSize: pdfBytes.length
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add watermark'
      }
    }
  }

  // Rotate PDF pages
  static async rotatePDF(file: File, rotation: number, pageNumbers?: number[]): Promise<PDFProcessingResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = pdf.getPages()
      
      const pagesToRotate = pageNumbers || pages.map((_, index) => index)
      
      pagesToRotate.forEach(pageIndex => {
        if (pages[pageIndex]) {
          pages[pageIndex].setRotation(degrees(rotation))
        }
      })
      
      const pdfBytes = await pdf.save()
      
      return {
        success: true,
        data: pdfBytes,
        pageCount: pdf.getPageCount(),
        fileSize: pdfBytes.length
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to rotate PDF'
      }
    }
  }

  // Add page numbers to PDF
  static async addPageNumbers(
    file: File, 
    options: { position?: 'bottom-center' | 'bottom-right' | 'bottom-left'; fontSize?: number } = {}
  ): Promise<PDFProcessingResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const font = await pdf.embedFont(StandardFonts.Helvetica)
      const pages = pdf.getPages()
      
      const { position = 'bottom-center', fontSize = 12 } = options
      
      pages.forEach((page, index) => {
        const { width } = page.getSize()
        const pageNumber = (index + 1).toString()
        
        let x: number
        const y = 30
        
        switch (position) {
          case 'bottom-center':
            x = width / 2 - (pageNumber.length * fontSize) / 4
            break
          case 'bottom-right':
            x = width - 50
            break
          case 'bottom-left':
            x = 30
            break
          default:
            x = width / 2
        }
        
        page.drawText(pageNumber, {
          x,
          y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0)
        })
      })
      
      const pdfBytes = await pdf.save()
      
      return {
        success: true,
        data: pdfBytes,
        pageCount: pdf.getPageCount(),
        fileSize: pdfBytes.length
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add page numbers'
      }
    }
  }

  // Extract text from PDF for OCR/analysis
  static async extractTextFromPDF(file: File): Promise<{ success: boolean; text?: string; error?: string }> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      
      let fullText = ''
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item) => 'str' in item ? item.str : '')
          .join(' ')
        fullText += pageText + '\n'
      }
      
      return {
        success: true,
        text: fullText.trim()
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to extract text from PDF'
      }
    }
  }

  // Get PDF metadata
  static async getPDFInfo(file: File): Promise<{
    success: boolean
    info?: {
      pageCount: number
      fileSize: number
      title?: string
      author?: string
      subject?: string
      creator?: string
      producer?: string
      creationDate?: Date
      modificationDate?: Date
    }
    error?: string
  }> {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      
      const pageCount = pdf.getPageCount()
      const fileSize = arrayBuffer.byteLength
      
      const title = pdf.getTitle()
      const author = pdf.getAuthor()
      const subject = pdf.getSubject()
      const creator = pdf.getCreator()
      const producer = pdf.getProducer()
      const creationDate = pdf.getCreationDate()
      const modificationDate = pdf.getModificationDate()
      
      return {
        success: true,
        info: {
          pageCount,
          fileSize,
          title: title || undefined,
          author: author || undefined,
          subject: subject || undefined,
          creator: creator || undefined,
          producer: producer || undefined,
          creationDate: creationDate || undefined,
          modificationDate: modificationDate || undefined
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get PDF info'
      }
    }
  }
}
