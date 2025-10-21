import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(request: Request) {
  try {
    const { resume, jobDescription } = await request.json()

    if (!resume || !jobDescription) {
      return new Response(JSON.stringify({ error: "Missing resume or job description" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const resumeTrimmed = resume.trim()
    const jobDescTrimmed = jobDescription.trim()

    if (resumeTrimmed.length < 50) {
      return new Response(JSON.stringify({ error: "Resume is too short (minimum 50 characters)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (jobDescTrimmed.length < 50) {
      return new Response(JSON.stringify({ error: "Job description is too long (minimum 50 characters)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (resumeTrimmed.length > 10000) {
      return new Response(JSON.stringify({ error: "Resume is too long (maximum 10000 characters)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (jobDescTrimmed.length > 10000) {
      return new Response(JSON.stringify({ error: "Job description is too long (maximum 10000 characters)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const systemPrompt = `You are a highly skilled AI Resume Evaluator. Your task is to assess how effectively a candidate's resume aligns with a given job description. Provide a professional, concise, and well-structured analysis, streamed word by word. Include the following sections:


ALIGNMENT SCORE
----------------------------------------
- Provide a numerical score (0–100) indicating overall fit.
- Include a brief rationale for the score.


KEY MATCHES
----------------------------------------
- Identify relevant skills, experience, and keywords present in the resume that strongly match the job requirements.


GAPS AND RECOMMENDATIONS
----------------------------------------
- Highlight missing skills, qualifications, or areas for improvement.
- Suggest actionable steps to strengthen alignment with the role.


PERSONALIZED SUMMARY PITCH
----------------------------------------
- Write a concise, professional pitch in the style of a cover letter.
- Emphasize the candidate's strengths and suitability for the role.

Formatting Guidelines:
- Use all caps for section headers.
- Include clear separators (lines) between sections.
- Present information in well-organized bullet points.
- Avoid Markdown syntax (no #, ###, or backticks).
- Keep the tone professional, precise, and recruiter-friendly.`
 

    const userPrompt = `Resume:
${resumeTrimmed}

Job Description:
${jobDescTrimmed}

Please analyze the alignment between this resume and job description.`

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      system: systemPrompt,
      prompt: userPrompt,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Analysis error:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
