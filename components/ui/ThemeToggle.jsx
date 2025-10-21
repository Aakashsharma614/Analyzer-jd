"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-white hover:scale-105 transition-transform"
    >
      {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  )
}
