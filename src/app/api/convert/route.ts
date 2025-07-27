import { NextRequest, NextResponse } from 'next/server'
import { FileConverter } from '@/lib/file-converter'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const conversionType = formData.get('conversionType') as string
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    // For multiple file conversion, return download URLs
    const downloadUrls: string[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      let result
      let contentType = 'application/pdf'
      
      switch (conversionType) {
        case 'pdf-to-word':
          result = await FileConverter.extractText(file) // Simplified - extract text
          contentType = 'text/plain'
          break
        
        case 'pdf-to-excel':
          result = await FileConverter.extractText(file) // Simplified - extract text
          contentType = 'text/plain'
          break
        
        case 'pdf-to-powerpoint':
          result = await FileConverter.extractText(file) // Simplified - extract text
          contentType = 'text/plain'
          break
        
        case 'pdf-to-image':
          result = await FileConverter.pdfToImages(file)
          contentType = 'image/jpeg'
          break
        
        case 'word-to-pdf':
        case 'excel-to-pdf':
        case 'powerpoint-to-pdf':
          result = await FileConverter.wordToPDF(file) // Simplified - use word converter
          break
        
        case 'image-to-pdf':
          result = await FileConverter.imagesToPDF([file])
          break
        
        default:
          return NextResponse.json(
            { error: 'Invalid conversion type' },
            { status: 400 }
          )
      }

      if (!result || !result.success) {
        return NextResponse.json(
          { error: result?.error || 'Conversion failed' },
          { status: 400 }
        )
      }

      // Create data URL for download
      if ('data' in result && result.data) {
        const dataUrl = `data:${contentType};base64,${Buffer.from(result.data).toString('base64')}`
        downloadUrls.push(dataUrl)
      } else if ('images' in result && result.images) {
        // Handle image results
        result.images.forEach((imageData: string) => {
          downloadUrls.push(imageData)
        })
      } else if ('text' in result && result.text) {
        // Handle text results
        const textBlob = new TextEncoder().encode(result.text)
        const dataUrl = `data:text/plain;base64,${Buffer.from(textBlob).toString('base64')}`
        downloadUrls.push(dataUrl)
      }
    }

    return NextResponse.json({ downloadUrls })

  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to convert files. Please try again.' },
      { status: 500 }
    )
  }
}
