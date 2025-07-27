import { NextRequest, NextResponse } from 'next/server'
import { ResumeAnalyzer } from '@/lib/resume-analyzer'
import { FileConverter } from '@/lib/file-converter'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const resume = formData.get('resume') as File
    const jobDescription = formData.get('jobDescription') as string || ''

    if (!resume) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!FileConverter.validateFileType(resume, allowedTypes)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      )
    }

    // Extract text from the resume
    const textResult = await FileConverter.extractText(resume)
    
    if (!textResult.success || !textResult.text) {
      return NextResponse.json(
        { error: 'Failed to extract text from resume' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI analysis is not configured. Please set up OpenAI API key.' },
        { status: 500 }
      )
    }

    // Analyze the resume using AI
    const analyzer = new ResumeAnalyzer(process.env.OPENAI_API_KEY)
    const analysis = await analyzer.analyzeResume(textResult.text, jobDescription || undefined)

    return NextResponse.json({
      success: true,
      analysis,
      extractedText: textResult.text.substring(0, 500) + '...' // Preview of extracted text
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    )
  }
}
