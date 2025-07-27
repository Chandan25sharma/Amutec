import { NextRequest, NextResponse } from 'next/server'
import { FileConverter } from '@/lib/file-converter'

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
    const contentType = 'application/pdf'
    let filename = 'converted-file.pdf'
    
    switch (operation) {
      case 'word-to-pdf':
        result = await FileConverter.wordToPDF(files[0])
        filename = result.fileName || 'word-to-pdf.pdf'
        break
      
      case 'images-to-pdf':
        result = await FileConverter.imagesToPDF(files)
        filename = result.fileName || 'images-to-pdf.pdf'
        break
      
      case 'pdf-to-images':
        const imageResult = await FileConverter.pdfToImages(files[0])
        if (!imageResult.success) {
          return NextResponse.json(
            { error: imageResult.error },
            { status: 400 }
          )
        }
        // Return images as JSON for now
        return NextResponse.json({
          success: true,
          images: imageResult.images
        })
      
      case 'extract-text':
        const textResult = await FileConverter.extractText(files[0])
        if (!textResult.success) {
          return NextResponse.json(
            { error: textResult.error },
            { status: 400 }
          )
        }
        return NextResponse.json({
          success: true,
          text: textResult.text,
          fileName: files[0].name
        })
      
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        )
    }

    if (!result || !result.success) {
      return NextResponse.json(
        { error: result?.error || 'Conversion failed' },
        { status: 400 }
      )
    }

    // Return the converted file as a downloadable file
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    
    return new NextResponse(result.data, {
      status: 200,
      headers
    })

  } catch (error) {
    console.error('File conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert file. Please try again.' },
      { status: 500 }
    )
  }
}
