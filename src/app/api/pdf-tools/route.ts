import { NextRequest, NextResponse } from 'next/server'
import { PDFProcessor } from '@/lib/pdf-processor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const operation = request.headers.get('X-Operation') || formData.get('operation') as string
    
    if (!operation) {
      return NextResponse.json(
        { error: 'No operation specified' },
        { status: 400 }
      )
    }

    let result
    
    switch (operation) {
      case 'merge':
        const files = formData.getAll('files') as File[]
        if (!files.length || files.length < 2) {
          return NextResponse.json(
            { error: 'At least 2 files required for merge' },
            { status: 400 }
          )
        }
        result = await PDFProcessor.mergePDFs(files)
        break
      
      case 'split':
        const file = formData.get('file') as File
        if (!file) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const splitOption = formData.get('splitOption') as string
        const pageNumbers = formData.get('pageNumbers') as string
        const ranges = formData.get('ranges') as string
        
        const splitRanges: { start: number; end: number }[] = []
        if (splitOption === 'pages' && pageNumbers) {
          // Convert page numbers to ranges
          const parts = pageNumbers.split(',').map(p => p.trim())
          for (const part of parts) {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n))
              splitRanges.push({ start, end })
            } else {
              const page = parseInt(part)
              splitRanges.push({ start: page, end: page })
            }
          }
        } else if (splitOption === 'ranges' && ranges) {
          const rangeLines = ranges.split('\n').map(line => line.trim()).filter(Boolean)
          for (const range of rangeLines) {
            const [start, end] = range.split('-').map(n => parseInt(n))
            splitRanges.push({ start, end })
          }
        }
        
        const splitResults = await PDFProcessor.splitPDF(file, splitRanges)
        // Return URLs for download - in a real implementation, save to temp storage
        return NextResponse.json({ 
          downloadUrls: splitResults.map(result => 
            result.success && result.data ? `data:application/pdf;base64,${Buffer.from(result.data).toString('base64')}` : null
          ).filter(Boolean)
        })
      
      case 'compress':
        const compressFile = formData.get('file') as File
        if (!compressFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        result = await PDFProcessor.compressPDF(compressFile)
        break
      
      case 'rotate':
        const rotateFile = formData.get('file') as File
        if (!rotateFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const rotationAngle = parseInt(formData.get('rotationAngle') as string) || 90
        const pageRange = formData.get('pageRange') as string
        const specificPages = formData.get('specificPages') as string
        
        let pages: number[] | undefined
        if (pageRange === 'specific' && specificPages) {
          pages = []
          const parts = specificPages.split(',').map(p => p.trim())
          for (const part of parts) {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n))
              for (let i = start; i <= end; i++) {
                pages.push(i)
              }
            } else {
              pages.push(parseInt(part))
            }
          }
        }
        
        result = await PDFProcessor.rotatePDF(rotateFile, rotationAngle, pages)
        break
      
      case 'watermark':
        const watermarkFile = formData.get('file') as File
        if (!watermarkFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const watermarkText = formData.get('watermarkText') as string
        const options = {
          opacity: parseFloat(formData.get('opacity') as string) || 0.3,
          fontSize: parseInt(formData.get('fontSize') as string) || 48,
          color: formData.get('color') as string || '#000000'
        }
        result = await PDFProcessor.addWatermark(watermarkFile, watermarkText, options)
        break
      
      case 'pageNumbers':
        const pageNumFile = formData.get('file') as File
        if (!pageNumFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const position = (formData.get('position') as 'bottom-center' | 'bottom-right' | 'bottom-left') || 'bottom-center'
        const fontSize = parseInt(formData.get('fontSize') as string) || 12
        result = await PDFProcessor.addPageNumbers(pageNumFile, { position, fontSize })
        break
      
      case 'info':
        const infoFile = formData.get('file') as File
        if (!infoFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const info = await PDFProcessor.getPDFInfo(infoFile)
        return NextResponse.json(info)
      
      case 'organize':
        const organizeFile = formData.get('file') as File
        if (!organizeFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const operations = JSON.parse(formData.get('operations') as string || '[]')
        result = await PDFProcessor.organizePDF(organizeFile, operations)
        break
      
      case 'analyze':
        const analyzeFile = formData.get('file') as File
        if (!analyzeFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const analysis = await PDFProcessor.analyzePDF(analyzeFile)
        return NextResponse.json(analysis)
      
      case 'repair':
        const repairFile = formData.get('file') as File
        if (!repairFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        result = await PDFProcessor.repairPDF(repairFile)
        break
      
      case 'security':
        const securityFile = formData.get('file') as File
        if (!securityFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const securitySettings = JSON.parse(formData.get('settings') as string || '{}')
        result = await PDFProcessor.addSecurity(securityFile, securitySettings)
        break
      
      case 'unlock':
        const unlockFile = formData.get('file') as File
        const password = formData.get('password') as string
        if (!unlockFile || !password) {
          return NextResponse.json(
            { error: 'File and password are required' },
            { status: 400 }
          )
        }
        result = await PDFProcessor.unlockPDF(unlockFile, password)
        break
      
      case 'annotate':
        const annotateFile = formData.get('file') as File
        if (!annotateFile) {
          return NextResponse.json(
            { error: 'File is required' },
            { status: 400 }
          )
        }
        const annotations = JSON.parse(formData.get('annotations') as string || '{}')
        result = await PDFProcessor.annotatePDF(annotateFile, annotations)
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
