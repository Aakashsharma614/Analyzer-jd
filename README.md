# Resume-JD Analyzer

An AI-powered application that analyzes how well your resume aligns with job descriptions using OpenAI's GPT-4 Turbo model.

## Features

- **Real-time Analysis**: Stream-based analysis for instant feedback
- **Alignment Scoring**: Get a numerical score (0-100) of resume-job fit
- **Key Matches**: Identify skills and experience that align well
- **Gap Analysis**: Discover missing skills or experience
- **Cover Letter Pitch**: Get a personalized summary pitch
- **Input Validation**: Real-time validation with helpful feedback
- **Error Handling**: Comprehensive error messages and recovery

## Tech Stack

- **Frontend**: React 19, Next.js 15, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 Turbo via AI SDK
- **Streaming**: Server-sent streaming for real-time analysis

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd resume-jd-analyzer
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Add your OpenAI API key to `.env.local`:
   \`\`\`
   OPENAI_API_KEY=your_key_here
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Paste your resume in the left textarea
2. Paste the job description in the right textarea
3. Click "Analyze Resume"
4. Watch the analysis stream in real-time

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # OpenAI streaming endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   ├── header.tsx                # App header
│   ├── input-section.tsx         # Resume & JD input
│   └── analysis-results.tsx      # Results display
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                        # Static assets
\`\`\`

## API Endpoint

### POST /api/analyze

Analyzes resume-job description alignment.

**Request:**
\`\`\`json
{
  "resume": "string (50-10000 characters)",
  "jobDescription": "string (50-10000 characters)"
}
\`\`\`

**Response:**
Streams text/plain with analysis results

**Error Responses:**
\`\`\`json
{
  "error": "Error message"
}
\`\`\`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## Performance

- Streaming responses for instant feedback
- Optimized bundle size (~50KB gzipped)
- Server-side rendering for better SEO
- Automatic code splitting

## Security

- API keys stored server-side only
- Input validation on client and server
- Security headers configured
- CORS properly handled

## Limitations

- OpenAI API rate limits apply
- Maximum input length: 10,000 characters per field
- Requires valid OpenAI API key with sufficient credits

## Future Enhancements

- [ ] Multiple resume analysis
- [ ] Export results as PDF
- [ ] Resume templates
- [ ] Job description suggestions
- [ ] Historical analysis tracking
- [ ] Batch processing

## License

MIT

## Support

For issues or questions, please check the error messages and refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.
