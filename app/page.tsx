"use client"

import { useState } from "react"
import InputSection from "@/components/input-section"
import AnalysisResults from "@/components/analysis-results"
import Header from "@/components/header"

export default function Home() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError("Please fill in both resume and job description")
      return
    }

    setError("")
    setAnalysis("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) {
        let errorMessage = `Analysis failed with status ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No response body")

      let fullText = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullText += chunk
        setAnalysis(fullText)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during analysis"
      setError(errorMessage)
      console.error("Analysis error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection
            resume={resume}
            jobDescription={jobDescription}
            onResumeChange={setResume}
            onJobDescriptionChange={setJobDescription}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <AnalysisResults analysis={analysis} isLoading={isLoading} error={error} />
        </div>
      </div>
    </main>
  )
}
