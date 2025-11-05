import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const operation = formData.get('operation') as string
    
    if (!operation) {
      return NextResponse.json(
        { error: 'No operation specified' },
        { status: 400 }
      )
    }

    // Validate PDF file function
    const validatePDFFile = (file: File): boolean => {
      return file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf')
    }

    // Check file size (50MB limit)
    const checkFileSize = (file: File): boolean => {
      const MAX_FILE_SIZE = 50 * 1024 * 1024
      return file.size <= MAX_FILE_SIZE
    }

    let result: { success: boolean; data?: Uint8Array; error?: string }

    switch (operation) {
      case 'merge':
        const files = formData.getAll('files') as File[]
        console.log('Merge request received, files:', files.length)
        
        if (!files.length || files.length < 2) {
          return NextResponse.json(
            { error: 'At least 2 files required for merge' },
            { status: 400 }
          )
        }

        // Validate all files
        for (const file of files) {
          if (!validatePDFFile(file)) {
            return NextResponse.json(
              { error: 'All files must be PDFs' },
              { status: 400 }
            )
          }
          if (!checkFileSize(file)) {
            return NextResponse.json(
              { error: 'File size too large. Maximum 50MB per file.' },
              { status: 400 }
            )
          }
        }

        result = await mergePDFs(files)
        break
      
      case 'split':
        const file = formData.get('file') as File
        if (!file) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }

        if (!validatePDFFile(file)) {
          return NextResponse.json(
            { error: 'Invalid file type. Please upload a PDF file.' },
            { status: 400 }
          )
        }

        const splitOption = formData.get('splitOption') as string
        const pageNumbers = formData.get('pageNumbers') as string
        
        const splitRanges: { start: number; end: number }[] = []
        
        if (splitOption === 'pages' && pageNumbers) {
          const parts = pageNumbers.split(',').map(p => p.trim())
          for (const part of parts) {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n.trim()))
              if (!isNaN(start) && !isNaN(end) && start > 0 && end > 0) {
                splitRanges.push({ start, end })
              }
            } else {
              const page = parseInt(part)
              if (!isNaN(page) && page > 0) {
                splitRanges.push({ start: page, end: page })
              }
            }
          }
        }

        if (splitRanges.length === 0) {
          return NextResponse.json(
            { error: 'No valid split ranges provided' },
            { status: 400 }
          )
        }

        const splitResults = await splitPDF(file, splitRanges)
        
        // Return multiple files for download
        const downloadUrls = splitResults
          .map((result, index) => 
            result.success && result.data 
              ? `data:application/pdf;base64,${arrayBufferToBase64(result.data)}`
              : null
          )
          .filter(Boolean) as string[]

        return NextResponse.json({ 
          success: true,
          downloadUrls,
          message: `Successfully split into ${downloadUrls.length} files`
        })
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        )
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    // Return the processed PDF as a downloadable file
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `attachment; filename="${operation}-result.pdf"`)
    
    return new NextResponse(result.data, {
      status: 200,
      headers
    })

  } catch (error) {
    console.error('PDF processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process PDF. Please try again.' },
      { status: 500 }
    )
  }
}

// Utility function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// PDF Processing Functions
async function mergePDFs(files: File[]): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const mergedPdf = await PDFDocument.create()
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(page => mergedPdf.addPage(page))
    }
    
    const pdfBytes = await mergedPdf.save()
    return { success: true, data: pdfBytes }
  } catch (error) {
    console.error('Merge error:', error)
    return { success: false, error: 'Failed to merge PDFs' }
  }
}

async function splitPDF(file: File, ranges: { start: number; end: number }[]): Promise<{ success: boolean; data?: Uint8Array; error?: string }[]> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const originalPdf = await PDFDocument.load(arrayBuffer)
    const pageCount = originalPdf.getPageCount()
    
    const results = []
    
    for (const range of ranges) {
      try {
        // Validate range
        if (range.start < 1 || range.end > pageCount || range.start > range.end) {
          results.push({ success: false, error: `Invalid range: ${range.start}-${range.end}` })
          continue
        }
        
        const newPdf = await PDFDocument.create()
        const pagesToCopy = []
        
        for (let i = range.start - 1; i < range.end; i++) {
          pagesToCopy.push(i)
        }
        
        const pages = await newPdf.copyPages(originalPdf, pagesToCopy)
        pages.forEach(page => newPdf.addPage(page))
        
        const pdfBytes = await newPdf.save()
        results.push({ success: true, data: pdfBytes })
      } catch (error) {
        results.push({ success: false, error: `Failed to split range ${range.start}-${range.end}` })
      }
    }
    
    return results
  } catch (error) {
    return [{ success: false, error: 'Failed to split PDF' }]
  }
}