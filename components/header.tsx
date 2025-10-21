export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Resume Analyzer</h1>
            </div>
          <div className="hidden sm:block text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Match
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
