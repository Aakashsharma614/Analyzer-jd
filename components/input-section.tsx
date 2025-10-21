"use client"

import { Button } from "@/components/ui/button"

interface InputSectionProps {
  resume: string
  jobDescription: string
  onResumeChange: (value: string) => void
  onJobDescriptionChange: (value: string) => void
  onAnalyze: () => void
  isLoading: boolean
}

export default function InputSection({
  resume,
  jobDescription,
  onResumeChange,
  onJobDescriptionChange,
  onAnalyze,
  isLoading,
}: InputSectionProps) {
  const resumeLength = resume.trim().length
  const jobDescLength = jobDescription.trim().length
  const minLength = 50
  const maxLength = 10000

  const isResumeValid = resumeLength >= minLength && resumeLength <= maxLength
  const isJobDescValid = jobDescLength >= minLength && jobDescLength <= maxLength
  const canAnalyze = isResumeValid && isJobDescValid && !isLoading

  const getCharacterWarning = (length: number, label: string) => {
    if (length === 0) return null
    if (length < minLength) {
      return `${label} is too short (minimum ${minLength} characters)`
    }
    if (length > maxLength) {
      return `${label} is too long (maximum ${maxLength} characters)`
    }
    return null
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700">
      {/* <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          AI Resume Analyzer
        </h2>
        <p className="text-sm text-slate-400 mt-1">Paste your resume & job description below</p>
      </div> */}

      {/* Resume Input */}
      <div className="space-y-2">
        {/* <label className="block text-sm font-semibold text-slate-300">
          Your Resume
        </label> */}
        <div className="relative">
          <textarea
            value={resume}
            onChange={(e) => onResumeChange(e.target.value)}
            placeholder="Paste your resume here..."
            className={`w-full h-56 p-4 bg-slate-900/60 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 resize-none transition-all duration-300 hover:shadow-lg ${
              isLoading
                ? "border-slate-700 opacity-50 cursor-not-allowed"
                : resumeLength === 0
                  ? "border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                  : isResumeValid
                    ? "border-emerald-600 focus:border-emerald-500 focus:ring-emerald-500"
                    : "border-red-600 focus:border-red-500 focus:ring-red-500"
            }`}
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-400">
            {resumeLength} / {maxLength}
          </div>
        </div>
        {getCharacterWarning(resumeLength, "Resume") && (
          <p className="text-xs text-red-400">{getCharacterWarning(resumeLength, "Resume")}</p>
        )}
      </div>

      {/* Job Description Input */}
      <div className="space-y-2">
        {/* <label className="block text-sm font-semibold text-slate-300">
          Job Description
        </label> */}
        <div className="relative">
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Paste the job description here..."
            className={`w-full h-56 p-4 bg-slate-900/60 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 resize-none transition-all duration-300 hover:shadow-lg ${
              isLoading
                ? "border-slate-700 opacity-50 cursor-not-allowed"
                : jobDescLength === 0
                  ? "border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                  : isJobDescValid
                    ? "border-emerald-600 focus:border-emerald-500 focus:ring-emerald-500"
                    : "border-red-600 focus:border-red-500 focus:ring-red-500"
            }`}
            disabled={isLoading}
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-400">
            {jobDescLength} / {maxLength}
          </div>
        </div>
        {getCharacterWarning(jobDescLength, "Job Description") && (
          <p className="text-xs text-red-400">{getCharacterWarning(jobDescLength, "Job Description")}</p>
        )}
      </div>

      {/* Analyze Button */}
      <div className="pt-2">
        <Button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            "Analyze Resume"
          )}
        </Button>
      </div>

      {/* Hint Section */}
      {!canAnalyze && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-center animate-pulse">
          <p className="text-xs text-slate-400">
            {resumeLength === 0 || jobDescLength === 0
              ? "⚠️ Please fill in both fields to start analysis."
              : "✏️ Ensure both sections meet the character requirements."}
          </p>
        </div>
      )}
    </div>
  )
}
