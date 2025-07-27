import OpenAI from 'openai'

export interface ResumeAnalysis {
  summary: string
  strengths: string[]
  improvements: string[]
  skills: {
    technical: string[]
    soft: string[]
    missing: string[]
  }
  experience: {
    level: 'Entry' | 'Mid' | 'Senior' | 'Executive'
    years: number
    industries: string[]
  }
  recommendations: {
    formatting: string[]
    content: string[]
    keywords: string[]
  }
  atsScore: number
  careerAdvice: {
    nextSteps: string[]
    rolesSuggested: string[]
    learningPaths: string[]
  }
  overallScore: number
}

export class ResumeAnalyzer {
  private openai: OpenAI

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    })
  }

  async analyzeResume(resumeText: string, targetRole?: string): Promise<ResumeAnalysis> {
    try {
      const prompt = this.buildAnalysisPrompt(resumeText, targetRole)
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert career advisor and resume reviewer with 15+ years of experience in talent acquisition and career development. Provide detailed, actionable feedback in JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })

      const response = completion.choices[0]?.message?.content
      if (!response) {
        throw new Error('No response from AI')
      }

      // Parse the JSON response
      const analysis = JSON.parse(response) as ResumeAnalysis
      
      // Validate and ensure all required fields exist
      return this.validateAnalysis(analysis)
      
    } catch (error) {
      console.error('Resume analysis error:', error)
      
      // Return fallback analysis
      return this.getFallbackAnalysis()
    }
  }

  private buildAnalysisPrompt(resumeText: string, targetRole?: string): string {
    const roleContext = targetRole ? `The candidate is targeting a ${targetRole} position.` : ''
    
    return `
    Please analyze the following resume and provide a comprehensive evaluation in JSON format.
    
    ${roleContext}
    
    Resume Text:
    ${resumeText}
    
    Please provide your analysis in the following JSON structure:
    {
      "summary": "Brief 2-3 sentence overview of the candidate",
      "strengths": ["List of 3-5 key strengths"],
      "improvements": ["List of 3-5 areas for improvement"],
      "skills": {
        "technical": ["List of technical skills found"],
        "soft": ["List of soft skills identified"],
        "missing": ["List of important skills that are missing"]
      },
      "experience": {
        "level": "Entry|Mid|Senior|Executive",
        "years": estimated_years_of_experience,
        "industries": ["List of industries/sectors"]
      },
      "recommendations": {
        "formatting": ["Formatting improvements"],
        "content": ["Content improvements"],
        "keywords": ["Important keywords to add"]
      },
      "atsScore": score_out_of_100,
      "careerAdvice": {
        "nextSteps": ["Suggested next career steps"],
        "rolesSuggested": ["Recommended job titles/roles"],
        "learningPaths": ["Suggested skills/certifications to pursue"]
      },
      "overallScore": score_out_of_100
    }
    
    Focus on:
    - ATS (Applicant Tracking System) optimization
    - Industry-specific keywords
    - Quantifiable achievements
    - Skills gap analysis
    - Career progression recommendations
    - Formatting and structure
    
    Be specific and actionable in your recommendations.
    `
  }

  private validateAnalysis(analysis: unknown): ResumeAnalysis {
    // For simplicity, just return fallback analysis and let the main function handle parsing
    try {
      if (typeof analysis === 'object' && analysis !== null) {
        const parsed = analysis as Partial<ResumeAnalysis>
        // Basic validation and return with fallbacks
        return {
          summary: parsed.summary || "Resume analysis completed",
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
          skills: {
            technical: Array.isArray(parsed.skills?.technical) ? parsed.skills.technical : [],
            soft: Array.isArray(parsed.skills?.soft) ? parsed.skills.soft : [],
            missing: Array.isArray(parsed.skills?.missing) ? parsed.skills.missing : []
          },
          experience: {
            level: (parsed.experience?.level as 'Entry' | 'Mid' | 'Senior' | 'Executive') || 'Mid',
            years: parsed.experience?.years || 0,
            industries: Array.isArray(parsed.experience?.industries) ? parsed.experience.industries : []
          },
          recommendations: {
            formatting: Array.isArray(parsed.recommendations?.formatting) ? parsed.recommendations.formatting : [],
            content: Array.isArray(parsed.recommendations?.content) ? parsed.recommendations.content : [],
            keywords: Array.isArray(parsed.recommendations?.keywords) ? parsed.recommendations.keywords : []
          },
          atsScore: parsed.atsScore || 50,
          careerAdvice: {
            nextSteps: Array.isArray(parsed.careerAdvice?.nextSteps) ? parsed.careerAdvice.nextSteps : [],
            rolesSuggested: Array.isArray(parsed.careerAdvice?.rolesSuggested) ? parsed.careerAdvice.rolesSuggested : [],
            learningPaths: Array.isArray(parsed.careerAdvice?.learningPaths) ? parsed.careerAdvice.learningPaths : []
          },
          overallScore: parsed.overallScore || 50
        }
      }
    } catch (error) {
      console.error('Validation error:', error)
    }
    
    return this.getFallbackAnalysis()
  }

  private getFallbackAnalysis(): ResumeAnalysis {
    return {
      summary: "Unable to complete full analysis. Please try again or check your resume format.",
      strengths: [
        "Resume submitted for analysis",
        "Shows initiative in seeking feedback"
      ],
      improvements: [
        "Ensure resume is in a readable format",
        "Include clear contact information",
        "Add quantifiable achievements"
      ],
      skills: {
        technical: [],
        soft: [],
        missing: [
          "Industry-specific keywords",
          "Quantified achievements",
          "Technical skills section"
        ]
      },
      experience: {
        level: 'Mid',
        years: 0,
        industries: []
      },
      recommendations: {
        formatting: [
          "Use a clean, ATS-friendly format",
          "Ensure consistent formatting throughout",
          "Use bullet points for achievements"
        ],
        content: [
          "Add quantifiable results to each role",
          "Include relevant keywords for your industry",
          "Tailor content to target job descriptions"
        ],
        keywords: [
          "Industry-specific technical terms",
          "Action verbs (achieved, led, improved)",
          "Relevant certifications and skills"
        ]
      },
      atsScore: 40,
      careerAdvice: {
        nextSteps: [
          "Optimize resume for ATS systems",
          "Research target company and role requirements",
          "Practice interview skills"
        ],
        rolesSuggested: [
          "Review job descriptions for target roles",
          "Consider related positions in your field"
        ],
        learningPaths: [
          "Identify skill gaps in target job descriptions",
          "Consider relevant certifications",
          "Build portfolio or project examples"
        ]
      },
      overallScore: 45
    }
  }

  // Get career advice based on experience level
  static getCareerAdviceByLevel(level: string): string[] {
    switch (level) {
      case 'Entry':
        return [
          "Focus on building foundational skills",
          "Seek mentorship opportunities",
          "Consider internships or entry-level positions",
          "Build a portfolio of projects",
          "Network within your industry"
        ]
      case 'Mid':
        return [
          "Develop leadership and project management skills",
          "Specialize in high-demand areas",
          "Build cross-functional expertise",
          "Seek opportunities to mentor others",
          "Consider advanced certifications"
        ]
      case 'Senior':
        return [
          "Focus on strategic thinking and leadership",
          "Build industry thought leadership",
          "Develop business acumen",
          "Consider management or consulting roles",
          "Mentor and develop team members"
        ]
      case 'Executive':
        return [
          "Focus on organizational transformation",
          "Build board relationships",
          "Develop market expansion strategies",
          "Consider speaking and thought leadership",
          "Mentor future leaders"
        ]
      default:
        return [
          "Continue developing your skills",
          "Seek feedback from colleagues",
          "Stay updated with industry trends"
        ]
    }
  }

  // Industry-specific keywords database
  static getIndustryKeywords(industry: string): string[] {
    const keywords: Record<string, string[]> = {
      'technology': [
        'agile', 'scrum', 'cloud computing', 'API', 'microservices',
        'DevOps', 'CI/CD', 'machine learning', 'data analytics', 'cybersecurity'
      ],
      'marketing': [
        'digital marketing', 'SEO', 'SEM', 'social media', 'content strategy',
        'conversion optimization', 'analytics', 'brand management', 'campaign management'
      ],
      'finance': [
        'financial modeling', 'risk management', 'compliance', 'audit',
        'investment analysis', 'portfolio management', 'regulatory', 'financial reporting'
      ],
      'healthcare': [
        'patient care', 'clinical research', 'regulatory compliance', 'quality assurance',
        'medical devices', 'healthcare informatics', 'patient safety', 'clinical trials'
      ],
      'sales': [
        'lead generation', 'CRM', 'sales pipeline', 'business development',
        'account management', 'quota attainment', 'relationship building', 'negotiation'
      ]
    }
    
    return keywords[industry.toLowerCase()] || []
  }
}
