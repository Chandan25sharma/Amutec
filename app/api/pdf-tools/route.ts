import { NextRequest, NextResponse } from 'next/server'
import { degrees, PDFDocument, rgb } from 'pdf-lib'

export async function POST(request: NextRequest) {
  console.log('=== PDF Tools API Called ===')
  
  try {
    const contentType = request.headers.get('content-type') || ''
    console.log('Content-Type:', contentType)
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    console.log('FormData entries:', Array.from(formData.entries()).map(([key, value]) => 
      [key, value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value]
    ))

    const operation = formData.get('operation') as string
    console.log('Operation:', operation)

    if (!operation) {
      return NextResponse.json(
        { error: 'No operation specified. Include "operation" parameter in form data.' },
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
        console.log('Merge - Files received:', files.length)

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
              { error: `File "${file.name}" is not a PDF` },
              { status: 400 }
            )
          }
          if (!checkFileSize(file)) {
            return NextResponse.json(
              { error: `File "${file.name}" is too large. Maximum 50MB.` },
              { status: 400 }
            )
          }
        }

        result = await mergePDFs(files)
        break
      
      case 'split':
        const splitFile = formData.get('file') as File
        console.log('Split - File:', splitFile?.name)
        
        if (!splitFile) {
          return NextResponse.json(
            { error: 'File is required for split operation' },
            { status: 400 }
          )
        }

        if (!validatePDFFile(splitFile)) {
          return NextResponse.json(
            { error: 'Invalid file type. Please upload a PDF file.' },
            { status: 400 }
          )
        }

        const splitOption = formData.get('splitOption') as string
        const pageNumbers = formData.get('pageNumbers') as string
        
        console.log('Split parameters:', { splitOption, pageNumbers })
        
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

        console.log('Split ranges:', splitRanges)

        if (splitRanges.length === 0) {
          return NextResponse.json(
            { error: 'No valid split ranges provided. Provide page numbers like "1,3" or ranges like "1-3".' },
            { status: 400 }
          )
        }

        const splitResults = await splitPDF(splitFile, splitRanges)
        
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
      
      case 'compress':
        const compressFile = formData.get('file') as File
        if (!compressFile) {
          return NextResponse.json(
            { error: 'File is required for compression' },
            { status: 400 }
          )
        }
        result = await compressPDF(compressFile)
        break
      
      case 'rotate':
        const rotateFile = formData.get('file') as File
        if (!rotateFile) {
          return NextResponse.json(
            { error: 'File is required for rotation' },
            { status: 400 }
          )
        }
        const rotationAngle = parseInt(formData.get('rotationAngle') as string) || 90
        const pageRange = formData.get('pageRange') as string || 'all'
        const specificPages = formData.get('specificPages') as string
        
        const pages: number[] = []
        if (pageRange === 'specific' && specificPages) {
          const parts = specificPages.split(',').map(p => p.trim())
          for (const part of parts) {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n.trim()))
              if (!isNaN(start) && !isNaN(end)) {
                for (let i = start; i <= end; i++) {
                  if (!isNaN(i)) pages.push(i)
                }
              }
            } else {
              const page = parseInt(part)
              if (!isNaN(page)) pages.push(page)
            }
          }
        }
        
        result = await rotatePDF(rotateFile, rotationAngle, pages.length > 0 ? pages : undefined)
        break
      
      case 'watermark':
        const watermarkFile = formData.get('file') as File
        if (!watermarkFile) {
          return NextResponse.json(
            { error: 'File is required for watermark' },
            { status: 400 }
          )
        }
        const watermarkText = formData.get('watermarkText') as string
        if (!watermarkText) {
          return NextResponse.json(
            { error: 'Watermark text is required' },
            { status: 400 }
          )
        }
        const options = {
          opacity: parseFloat(formData.get('opacity') as string) || 0.3,
          fontSize: parseInt(formData.get('fontSize') as string) || 48,
          color: formData.get('color') as string || '#000000'
        }
        result = await addWatermark(watermarkFile, watermarkText, options)
        break

      case 'pageNumbers':
        const pageNumFile = formData.get('file') as File
        if (!pageNumFile) {
          return NextResponse.json(
            { error: 'File is required for adding page numbers' },
            { status: 400 }
          )
        }
        const position = (formData.get('position') as string) || 'bottom-center'
        const fontSize = parseInt(formData.get('fontSize') as string) || 12
        result = await addPageNumbers(pageNumFile, { position, fontSize })
        break

      case 'organize':
        const organizeFile = formData.get('file') as File
        if (!organizeFile) {
          return NextResponse.json(
            { error: 'File is required for organization' },
            { status: 400 }
          )
        }
        const operations = formData.get('operations') as string
        try {
          const orgOperations = operations ? JSON.parse(operations) : []
          result = await organizePDF(organizeFile, orgOperations)
        } catch {
          return NextResponse.json(
            { error: 'Invalid operations format' },
            { status: 400 }
          )
        }
        break
      
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

async function compressPDF(file: File): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // Simple compression by removing metadata and using efficient settings
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100,
    })
    
    return { success: true, data: pdfBytes }
  } catch (error) {
    return { success: false, error: 'Failed to compress PDF' }
  }
}

async function rotatePDF(file: File, angle: number, pages?: number[]): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pageCount = pdfDoc.getPageCount()
    
    const pagesToRotate = pages || Array.from({ length: pageCount }, (_, i) => i + 1)
    
    for (const pageNum of pagesToRotate) {
      if (pageNum >= 1 && pageNum <= pageCount) {
        const page = pdfDoc.getPage(pageNum - 1)
        page.setRotation(degrees(angle))
      }
    }
    
    const pdfBytes = await pdfDoc.save()
    return { success: true, data: pdfBytes }
  } catch (error) {
    return { success: false, error: 'Failed to rotate PDF' }
  }
}

async function addWatermark(file: File, text: string, options: { opacity: number; fontSize: number; color: string }): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()
    
    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      } : { r: 0, g: 0, b: 0 }
    }
    
    const color = hexToRgb(options.color)
    
    for (const page of pages) {
      const { width, height } = page.getSize()
      
      page.drawText(text, {
        x: width / 2 - (options.fontSize * text.length) / 4,
        y: height / 2,
        size: options.fontSize,
        color: rgb(color.r, color.g, color.b),
        opacity: options.opacity,
        rotate: degrees(45),
      })
    }
    
    const pdfBytes = await pdfDoc.save()
    return { success: true, data: pdfBytes }
  } catch (error) {
    return { success: false, error: 'Failed to add watermark' }
  }
}

async function addPageNumbers(file: File, options: { position: string; fontSize: number }): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      const { width, height } = page.getSize()
      
      let x = width / 2
      let y = options.fontSize + 10
      
      if (options.position.includes('bottom')) {
        y = options.fontSize + 20
      }
      if (options.position.includes('right')) {
        x = width - 50
      } else if (options.position.includes('left')) {
        x = 50
      }
      
      page.drawText(`Page ${i + 1}`, {
        x,
        y,
        size: options.fontSize,
        color: rgb(0, 0, 0),
      })
    }
    
    const pdfBytes = await pdfDoc.save()
    return { success: true, data: pdfBytes }
  } catch (error) {
    return { success: false, error: 'Failed to add page numbers' }
  }
}

async function organizePDF(file: File, operations: any[]): Promise<{ success: boolean; data?: Uint8Array; error?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    
    // For now, just return the original PDF
    // In a real implementation, you would reorder pages based on operations
    const pdfBytes = await pdfDoc.save()
    return { success: true, data: pdfBytes }
  } catch (error) {
    return { success: false, error: 'Failed to organize PDF' }
  }
}