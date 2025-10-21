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
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-white mb-3">Your Resume</label>
        <textarea
          value={resume}
          onChange={(e) => onResumeChange(e.target.value)}
          placeholder="Paste your resume here..."
          className={`w-full h-64 p-4 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none transition-colors ${
            isLoading
              ? "border-slate-700 opacity-50 cursor-not-allowed"
              : resumeLength === 0
                ? "border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                : isResumeValid
                  ? "border-green-600 focus:border-green-500 focus:ring-green-500"
                  : "border-red-600 focus:border-red-500 focus:ring-red-500"
          }`}
          disabled={isLoading}
        />
        <div className="flex justify-between items-start mt-2">
          <p
            className={`text-xs ${resumeLength === 0 ? "text-slate-400" : isResumeValid ? "text-green-400" : "text-red-400"}`}
          >
            {resumeLength} / {maxLength} characters
          </p>
          {getCharacterWarning(resumeLength, "Resume") && (
            <p className="text-xs text-red-400">{getCharacterWarning(resumeLength, "Resume")}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white mb-3">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description here..."
          className={`w-full h-64 p-4 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 resize-none transition-colors ${
            isLoading
              ? "border-slate-700 opacity-50 cursor-not-allowed"
              : jobDescLength === 0
                ? "border-slate-700 focus:border-blue-500 focus:ring-blue-500"
                : isJobDescValid
                  ? "border-green-600 focus:border-green-500 focus:ring-green-500"
                  : "border-red-600 focus:border-red-500 focus:ring-red-500"
          }`}
          disabled={isLoading}
        />
        <div className="flex justify-between items-start mt-2">
          <p
            className={`text-xs ${jobDescLength === 0 ? "text-slate-400" : isJobDescValid ? "text-green-400" : "text-red-400"}`}
          >
            {jobDescLength} / {maxLength} characters
          </p>
          {getCharacterWarning(jobDescLength, "Job Description") && (
            <p className="text-xs text-red-400">{getCharacterWarning(jobDescLength, "Job Description")}</p>
          )}
        </div>
      </div>

      <Button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {!canAnalyze && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <p className="text-xs text-slate-400">
            {resumeLength === 0 || jobDescLength === 0
              ? "Please fill in both fields to analyze"
              : "Please ensure both fields meet the character requirements"}
          </p>
        </div>
      )}
    </div>
  )
}
