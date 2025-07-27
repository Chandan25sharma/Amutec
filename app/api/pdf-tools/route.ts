import { NextRequest, NextResponse } from 'next/server'
import { PDFProcessor } from '@/lib/pdf-processor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const operation = formData.get('operation') as string
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    let result
    
    switch (operation) {
      case 'merge':
        result = await PDFProcessor.mergePDFs(files)
        break
      
      case 'split':
        const ranges = formData.get('ranges') 
        const splitRanges = ranges ? JSON.parse(ranges as string) : undefined
        const splitResults = await PDFProcessor.splitPDF(files[0], splitRanges)
        result = splitResults[0] // Return first result for simplicity
        break
      
      case 'compress':
        result = await PDFProcessor.compressPDF(files[0])
        break
      
      case 'watermark':
        const watermarkText = formData.get('watermarkText') as string
        const options = {
          opacity: parseFloat(formData.get('opacity') as string) || 0.3,
          fontSize: parseInt(formData.get('fontSize') as string) || 48,
          color: formData.get('color') as string || '#000000'
        }
        result = await PDFProcessor.addWatermark(files[0], watermarkText, options)
        break
      
      case 'rotate':
        const rotation = parseInt(formData.get('rotation') as string) || 90
        const pageNumbers = formData.get('pageNumbers')
        const pages = pageNumbers ? JSON.parse(pageNumbers as string) : undefined
        result = await PDFProcessor.rotatePDF(files[0], rotation, pages)
        break
      
      case 'pageNumbers':
        const position = (formData.get('position') as 'bottom-center' | 'bottom-right' | 'bottom-left') || 'bottom-center'
        const fontSize = parseInt(formData.get('fontSize') as string) || 12
        result = await PDFProcessor.addPageNumbers(files[0], { position, fontSize })
        break
      
      case 'info':
        const info = await PDFProcessor.getPDFInfo(files[0])
        return NextResponse.json(info)
      
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
