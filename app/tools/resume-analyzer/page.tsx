'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { 
  FileText, 
  Upload, 
  Brain, 
  AlertCircle, 
  CheckCircle,
  User,
  Briefcase,
  Target,
  TrendingUp,
  Star
} from 'lucide-react'

interface AnalysisResult {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  careerAdvice: string[]
  skillsAssessment: {
    technical: number
    soft: number
    leadership: number
    communication: number
  }
  atsScore: number
  keywords: {
    present: string[]
    missing: string[]
  }
}

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf')
    if (!pdfFile) {
      setError('Please upload a PDF file')
      return
    }
    setFile(pdfFile)
    setError(null)
    setAnalysisResult(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const analyzeResume = async () => {
    if (!file) {
      setError('Please upload a resume file')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobDescription', jobDescription)

      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Amutec</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tools" className="text-blue-600 font-medium">Tools</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Resume Analyzer</h1>
          <p className="text-xl text-gray-600">
            Get AI-powered feedback on your resume and personalized career advice to land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Job Description */}
          <div className="space-y-8">
            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Your Resume</h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop resume here' : 'Click or drag resume here'}
                </p>
                <p className="text-gray-500">
                  Upload your resume in PDF format
                </p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-gray-500 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Job Description (Optional)
              </h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for targeted analysis and ATS optimization..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-gray-500 text-sm mt-2">
                Including a job description will provide more targeted feedback and ATS optimization suggestions.
              </p>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={analyzeResume}
                disabled={!file || isAnalyzing}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(analysisResult.overallScore)} mb-4`}>
                      <span className={`text-3xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                        {analysisResult.overallScore}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Resume Score</h3>
                    <p className="text-gray-600">
                      Your resume scored {analysisResult.overallScore} out of 100
                    </p>
                  </div>
                </div>

                {/* Skills Assessment */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Assessment</h3>
                  <div className="space-y-4">
                    {Object.entries(analysisResult.skillsAssessment).map(([skill, score]) => (
                      <div key={skill}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize font-medium">{skill}</span>
                          <span className={getScoreColor(score)}>{score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ATS Score */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-indigo-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility</h3>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-2xl font-bold ${getScoreColor(analysisResult.atsScore)} mr-2`}>
                      {analysisResult.atsScore}%
                    </span>
                    <span className="text-gray-600">ATS-friendly</span>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-yellow-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Improvement Suggestions</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">•</span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Advice */}
                <div className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Career Advice</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.careerAdvice.map((advice, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2 mt-0.5">•</span>
                        <span className="text-gray-700">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keywords Analysis */}
                {jobDescription && (
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Keywords Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-green-700 mb-3">Present Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.present.map((keyword, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-700 mb-3">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.missing.map((keyword, index) => (
                            <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
