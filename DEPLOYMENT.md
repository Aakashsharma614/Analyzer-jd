# Resume-JD Analyzer - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Vercel account (for deployment)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

## Local Development

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local and add your OpenAI API key
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Build

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Deploy:
   \`\`\`bash
   vercel
   \`\`\`

3. Follow the prompts and add your environment variables when asked

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Add environment variables in the "Environment Variables" section
5. Click "Deploy"

## Environment Variables Setup

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

## Performance Optimization

- The app uses Next.js built-in optimizations
- Streaming responses for real-time analysis
- Automatic code splitting and lazy loading
- CSS minification and optimization

## Security Considerations

- API keys are kept server-side only
- CORS headers are properly configured
- Security headers are set in next.config.mjs
- Input validation on both client and server

## Monitoring

Monitor your application using:
- Vercel Analytics
- OpenAI API usage dashboard
- Error logs in Vercel deployment logs

## Troubleshooting

### "Missing OpenAI API Key"
- Ensure `OPENAI_API_KEY` is set in your environment variables
- Verify the key is valid in your OpenAI dashboard

### "Analysis Failed"
- Check OpenAI API status
- Verify your API key has sufficient credits
- Check the browser console for detailed error messages

### Slow Response Times
- OpenAI API response times vary based on load
- Consider implementing request queuing for high traffic
- Monitor API usage in OpenAI dashboard

## Support

For issues or questions:
1. Check the error message in the browser console
2. Review OpenAI API documentation
3. Check Vercel deployment logs
