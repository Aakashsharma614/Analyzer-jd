"use client"

import { useEffect, useRef } from "react"
import { CopyButton } from "@/components/ui/copy-button"

interface AnalysisResultsProps {
  analysis: string
  isLoading: boolean
  error: string
}

export default function AnalysisResults({ analysis, isLoading, error }: AnalysisResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [analysis])

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, idx) => {
      if (line.includes("**")) {
        return (
          <p key={idx} className="font-semibold text-white mt-3 mb-2">
            {line.replace(/\*\*/g, "")}
          </p>
        )
      }
      if (line.trim().startsWith("-")) {
        return (
          <li key={idx} className="ml-4 text-slate-200">
            {line.replace(/^-\s*/, "")}
          </li>
        )
      }
      if (/^\d+\./.test(line.trim())) {
        return (
          <li key={idx} className="ml-4 text-slate-200 list-decimal">
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        )
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />
      }
      return (
        <p key={idx} className="text-slate-200 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="relative bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col h-[700px] max-h-[90vh]">
      {/* Header and Copy Button */}
      <div className="flex items-center justify-between mb-4">
        {analysis && <CopyButton textToCopy={analysis} />}
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="text-red-400 font-bold text-lg mt-0.5">!</div>
            <div>
              <p className="text-red-200 font-semibold text-sm">Analysis Failed</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
              <p className="text-red-400 text-xs mt-2">Please check your input and try again.</p>
            </div>
          </div>
        </div>
      )}

      {!analysis && !isLoading && !error && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-center">
            Your analysis will appear here.
          </p>
        </div>
      )}

      {isLoading && !analysis && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-300">Analyzing your resume...</p>
            <p className="text-slate-500 text-sm mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      {analysis && (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
        >
          <div className="space-y-2 text-sm">
            {renderMarkdown(analysis)}
            {isLoading && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-slate-400 text-xs">Streaming analysis...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
