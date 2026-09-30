import { YouTubeChannel, VideoContent, AdminSettings, SystemLog, TrendIdea } from '../types';

export const DEFAULT_CHANNELS: YouTubeChannel[] = [
  {
    id: 'ch-apex-tech',
    title: 'ApexTech AI & Engineering',
    handle: '@ApexTechOfficial',
    avatarUrl: '/src/assets/images/channel_default_avatar_1790790959860.jpg',
    subscribersCount: 84200,
    videoCount: 142,
    totalViews: 6420500,
    category: 'Science & Technology',
    niche: 'Artificial Intelligence, Software Dev & Autonomous Agents',
    targetAudience: 'Software engineers, tech founders, and AI enthusiasts seeking actionable tutorials and breakdowns',
    tone: 'Authoritative, fast-paced, insightful, zero-fluff',
    cadence: 'daily',
    preferredPostTimeUtc: '16:00',
    isConnected: true,
    connectedAt: '2026-09-01T12:00:00Z',
    defaultPrivacy: 'public',
    authType: 'oauth',
  },
  {
    id: 'ch-quantum-shorts',
    title: 'Quantum Bytes - Daily AI Shorts',
    handle: '@QuantumBytesShorts',
    avatarUrl: '/src/assets/images/channel_default_avatar_1790790959860.jpg',
    subscribersCount: 128900,
    videoCount: 310,
    totalViews: 19400200,
    category: 'Education & Tech',
    niche: '60-Second AI Breakthroughs & Prompt Engineering',
    targetAudience: 'Curious tech adopters and mobile viewers looking for daily byte-sized AI news',
    tone: 'High-energy, sensational, informative',
    cadence: 'twice-daily',
    preferredPostTimeUtc: '12:00',
    isConnected: false,
    defaultPrivacy: 'public',
    authType: 'api_key',
  },
];

export const INITIAL_POSTS: VideoContent[] = [
  {
    id: 'post-01',
    channelId: 'ch-apex-tech',
    format: 'video',
    title: 'I Built a 24/7 Autonomous AI Agent in 15 Minutes (Full Code)',
    titleOptions: [
      { title: 'I Built a 24/7 Autonomous AI Agent in 15 Minutes (Full Code)', predictedCtr: 11.4, curiosityScore: 92 },
      { title: 'Stop Using Basic Chatbots: How Autonomous Agents Actually Work', predictedCtr: 9.8, curiosityScore: 84 },
      { title: 'The 3-Step Architecture That Lets AI Run My Software Business', predictedCtr: 8.9, curiosityScore: 78 }
    ],
    hook: "Most developers think autonomous AI agents require thousands of lines of complex orchestration. That was true last year. Today, with the Gemini Live and reasoning APIs, you can deploy a self-healing agent in under 200 lines of code. Let me prove it to you right now.",
    script: `00:00 - Introduction & Live Agent Demonstration
01:30 - The 3 Pillars of Autonomous Tool Execution
04:15 - Setting up Server-Side Gemini API with Structured Outputs
07:40 - Implementing Self-Correction and Resilient Error Loops
10:20 - Real-World Deployment and Safety Sandboxing
13:10 - Conclusion & Open Source Starter Repository`,
    scriptSections: [
      {
        timestamp: '00:00',
        heading: 'Hook & Proof',
        narration: 'Watch this: in the background terminal right here, an autonomous agent just read a bug report, isolated the failing line, ran the test suite, and submitted a pull request. Zero human intervention.',
        visualCue: 'Screen recording of terminal executing self-correcting agent loop with animated highlight box on terminal logs',
        onScreenText: 'Autonomous Agent: 0 Humans Involved',
        sfxCue: 'Subtle digital woosh + typing sound effect'
      },
      {
        timestamp: '01:30',
        heading: 'The Architecture',
        narration: 'To build this, you need three core layers: first, stateful memory; second, deterministic tool declarations; and third, an evaluation barrier that prevents infinite hallucination loops.',
        visualCue: 'Clean 3-box diagram appearing step by step: Memory -> Function Calling -> Safety Validator',
        onScreenText: 'The 3-Tier Agent Engine',
        sfxCue: 'Crisp pop sound per box'
      },
      {
        timestamp: '04:15',
        heading: 'Live Implementation',
        narration: 'Here is our core TypeScript runner using the latest Google GenAI SDK. Notice how we pass strict JSON responseSchema so the model never breaks our pipeline.',
        visualCue: 'IDE zoom on TypeScript code snippet with highlighted responseSchema definition',
        onScreenText: 'Strict Schema Guardrails',
        sfxCue: 'Keyboard tactile clicks'
      }
    ],
    description: `Learn how to architect, test, and deploy a production-ready autonomous AI agent in under 15 minutes. 

⚡ Full source code & architecture template linked below!

TIMESTAMPS:
00:00 - Live Autonomous Agent Proof
01:30 - The 3 Pillars of Autonomous Tool Execution
04:15 - Server-Side Gemini Setup & Strict Schemas
07:40 - Error Handling & Self-Correction Loops
10:20 - Production Sandboxing & Rate Limits
13:10 - Final Architecture & Next Steps

RESOURCES MENTIONED:
• Code Repository: https://github.com/apextech/autonomous-agent-starter
• Gemini SDK Docs & Guides
• Join our Discord community for weekly AI engineering sessions!

#AIAgent #SoftwareEngineering #GeminiAPI #Programming #TypeScript`,
    tags: ['ai agent', 'autonomous agent', 'gemini api', 'software engineering', 'typescript', 'ai coding', 'machine learning tutorial', 'developer tools'],
    thumbnailHeadline: 'AUTONOMOUS AGENT IN 15 MINS',
    thumbnailConcept: 'Split screen: Left side shows frustrated programmer at 3 AM; Right side shows futuristic neon glowing agent completing tasks with huge green 100% SUCCESS badge',
    thumbnailPrompt: 'Split-screen aesthetic high contrast, left side monochrome tired coder, right side vibrant cyan and amber terminal with glowing completed task badges, bold text space, 8k commercial YouTube thumbnail',
    thumbnailUrl: '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg',
    pinnedComment: 'What is the first task you would delegate to an autonomous agent if it could run 24/7 without breaking? Let me know in the comments!',
    estimatedDuration: '14:20',
    status: 'scheduled',
    scheduledFor: '2026-10-01T16:00:00Z',
    createdAt: '2026-09-30T09:30:00Z',
    isAutoGenerated: true,
  },
  {
    id: 'post-02',
    channelId: 'ch-apex-tech',
    format: 'short',
    title: 'The AI Feature 99% of Developers Still Don’t Know Exists #Shorts',
    titleOptions: [
      { title: 'The AI Feature 99% of Developers Still Don’t Know Exists #Shorts', predictedCtr: 13.2, curiosityScore: 96 },
      { title: 'This 1 Line of Code Replaces 50 Lines of RegEx #Shorts', predictedCtr: 10.5, curiosityScore: 88 },
    ],
    hook: "Stop parsing text with messy regular expressions. There is a built-in AI technique that guarantees 100% type-safe JSON extraction every single time.",
    script: `[0-3s] Screen zooms into messy 200-line regex code: "Tired of this?"
[3-12s] Show the solution: Gemini with structured JSON Schema output.
[12-25s] Fast side-by-side comparison: Regex fails on edge cases, AI schema returns valid TypeScript interface instantly.
[25-35s] "Save this video and grab the boilerplate in the description!"`,
    scriptSections: [
      {
        timestamp: '00:00',
        heading: 'Hook',
        narration: 'Tired of debugging painful regular expressions that break on every edge case?',
        visualCue: 'Frustrated meme reaction cut to messy code screen',
        onScreenText: 'Throw away your RegEx ❌',
      },
      {
        timestamp: '00:10',
        heading: 'Core Solution',
        narration: 'Use responseSchema directly in the Gemini SDK. It forces the LLM to output valid typed JSON adhering to your schema.',
        visualCue: 'Clean code editor typing responseSchema with instant autocomplete green checkmarks',
        onScreenText: 'Type-Safe AI Extraction ✅',
      }
    ],
    description: `Stop writing fragile RegEx parsers! Use structured outputs with Gemini API for 100% type safety.

Subscribe for daily 60-second software & AI masterclasses! #Shorts #Coding #WebDev #Tech`,
    tags: ['shorts', 'coding shorts', 'typescript', 'ai hacks', 'programming tips'],
    thumbnailHeadline: 'STOP USING REGEX!',
    thumbnailConcept: 'Red crossed-out regex string vs bright green glowing JSON object',
    thumbnailPrompt: 'Red X over complicated regex code, bright checkmark over clean JSON code, vertical 9:16 portrait style, high CTR mobile aesthetic',
    thumbnailUrl: '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg',
    pinnedComment: 'Do you still use RegEx in production or have you migrated to structured AI parsing?',
    estimatedDuration: '00:45',
    status: 'scheduled',
    scheduledFor: '2026-10-02T16:00:00Z',
    createdAt: '2026-09-30T10:00:00Z',
    isAutoGenerated: true,
  },
  {
    id: 'post-03',
    channelId: 'ch-apex-tech',
    format: 'video',
    title: 'Top 5 Production Vector Databases in 2026 (Benchmark & Pricing)',
    titleOptions: [
      { title: 'Top 5 Production Vector Databases in 2026 (Benchmark & Pricing)', predictedCtr: 8.7, curiosityScore: 76 },
      { title: 'Which Vector DB Should You Actually Use for RAG?', predictedCtr: 9.1, curiosityScore: 82 }
    ],
    hook: "Picking the wrong vector database can cost your company tens of thousands in unneeded cloud spend. Today we benchmarked latency, recall, and indexing costs across the 5 market leaders.",
    script: `00:00 - The Vector Database Landscape
02:15 - Latency vs Indexing Cost Tradeoffs
05:30 - PostgreSQL pgvector vs Specialized Engines
09:10 - Real 10M Vector Ingestion Benchmark
12:45 - The Ultimate Decision Matrix`,
    scriptSections: [],
    description: `Complete benchmark breakdown of vector databases for AI & RAG systems.
Timestamps:
00:00 - Overview
02:15 - Cost Analysis
05:30 - pgvector vs Dedicated
09:10 - Live 10M Benchmark
12:45 - Verdict & Recommendations`,
    tags: ['vectordb', 'rag', 'pgvector', 'machine learning', 'database', 'system design'],
    thumbnailHeadline: 'WHICH VECTOR DB WINS?',
    thumbnailConcept: 'Trophy battle podium comparing top vector engines with speed gauges',
    thumbnailPrompt: 'High tech data center servers benchmark comparison chart with glowing podium and speed meter',
    thumbnailUrl: '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg',
    pinnedComment: 'Which vector database is your team currently running in production?',
    estimatedDuration: '13:50',
    status: 'draft',
    scheduledFor: '2026-10-03T16:00:00Z',
    createdAt: '2026-09-30T10:15:00Z',
    isAutoGenerated: false,
  },
  {
    id: 'post-04',
    channelId: 'ch-apex-tech',
    format: 'video',
    title: 'Why Real-Time Voice AI is Replacing Text Chatbots Forever',
    titleOptions: [
      { title: 'Why Real-Time Voice AI is Replacing Text Chatbots Forever', predictedCtr: 10.9, curiosityScore: 91 }
    ],
    hook: "The era of watching an LLM slowly stream text onto a screen is coming to an end. Real-time sub-300ms bidirectional audio changes how humans interact with machines.",
    script: `Full video script on the breakthrough of Gemini Live and low latency audio WebSockets.`,
    scriptSections: [],
    description: `Deep dive into sub-second Voice AI architecture. Subscribe for more! #VoiceAI #TechTrends`,
    tags: ['voice ai', 'realtime ai', 'gemini live', 'ai audio', 'tech innovation'],
    thumbnailHeadline: 'CHATBOTS ARE DEAD',
    thumbnailConcept: 'A glowing soundwave obliterating an old text chat bubble',
    thumbnailPrompt: 'Vibrant neon audio waveform shattering a monochrome text message bubble, dramatic lighting',
    thumbnailUrl: '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg',
    pinnedComment: 'Have you tried sub-second Voice AI yet? Does it feel natural to talk to an AI?',
    estimatedDuration: '11:15',
    status: 'published',
    scheduledFor: '2026-09-29T16:00:00Z',
    publishedAt: '2026-09-29T16:00:12Z',
    youtubeVideoId: 'dQw4w9WgXcQ',
    youtubeVideoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    views: 42180,
    likes: 2940,
    commentsCount: 312,
    createdAt: '2026-09-28T14:00:00Z',
  },
  {
    id: 'post-05',
    channelId: 'ch-apex-tech',
    format: 'short',
    title: 'Build a Full-Stack SaaS in 1 Prompt? We Tested It #Shorts',
    titleOptions: [
      { title: 'Build a Full-Stack SaaS in 1 Prompt? We Tested It #Shorts', predictedCtr: 14.1, curiosityScore: 98 }
    ],
    hook: "Can you actually generate a functional SaaS app with 1 prompt in 2026? Let's test the bold claims.",
    script: `Fast comparison of prompt engineering vs real multi-step software architecture.`,
    scriptSections: [],
    description: `Testing one-prompt full stack development claims. #Shorts #DevLife`,
    tags: ['shorts', 'saas', 'coding', 'tech'],
    thumbnailHeadline: '1 PROMPT SAAS?',
    thumbnailConcept: 'Shocked face looking at a fully generated dashboard',
    thumbnailPrompt: 'Shocked developer looking at multiple floating UI screens generated automatically',
    thumbnailUrl: '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg',
    pinnedComment: 'What is the longest prompt you have ever written for an LLM?',
    estimatedDuration: '00:52',
    status: 'published',
    scheduledFor: '2026-09-28T16:00:00Z',
    publishedAt: '2026-09-28T16:00:05Z',
    youtubeVideoId: 'aB12cD34eF5',
    youtubeVideoUrl: 'https://youtube.com/watch?v=aB12cD34eF5',
    views: 89450,
    likes: 6710,
    commentsCount: 521,
    createdAt: '2026-09-27T11:00:00Z',
  }
];

export const INITIAL_ADMIN_SETTINGS: AdminSettings = {
  isAutoPosterActive: true,
  adminPassword: 'happy087', // The master admin password
  apiKeyConfigured: true,
  youtubeApiKey: 'AIzaSyA889_SampleYoutubeApiKey_Production',
  youtubeClientId: '185481345704-yt-oauth-client.apps.googleusercontent.com',
  quotaUsedToday: 1850,
  quotaLimitDaily: 10000,
  autoApproveGenerations: false,
  safetyFilterEnabled: true,
  emergencyStop: false,
  infiniteConsistencyMode: true,
};

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-09-30T10:45:10Z',
    type: 'admin',
    message: 'Master consistency engine initialized with cadence: Daily at 16:00 UTC',
    details: 'Next scheduled post ID: post-01 is loaded and verified in upload buffer.'
  },
  {
    id: 'log-02',
    timestamp: '2026-09-29T16:00:12Z',
    type: 'success',
    message: 'Auto-Post Executed: "Why Real-Time Voice AI is Replacing Text Chatbots Forever"',
    details: 'YouTube Data API v3 status: 200 OK. Video ID: dQw4w9WgXcQ. Visibility: Public.'
  },
  {
    id: 'log-03',
    timestamp: '2026-09-29T15:45:00Z',
    type: 'info',
    message: 'Pre-flight YouTube API token check passed. Quota remaining: 8,150 units.',
  },
  {
    id: 'log-04',
    timestamp: '2026-09-28T16:00:05Z',
    type: 'success',
    message: 'Auto-Post Executed: "Build a Full-Stack SaaS in 1 Prompt? We Tested It #Shorts"',
    details: 'YouTube Shorts insertion verified. Video ID: aB12cD34eF5.'
  },
  {
    id: 'log-05',
    timestamp: '2026-09-28T09:00:00Z',
    type: 'info',
    message: 'Gemini AI Batch Calendar generator populated 5 high-CTR topics for the week.'
  }
];

export const INITIAL_TREND_IDEAS: TrendIdea[] = [
  {
    id: 'trend-01',
    topic: 'How to Run Local DeepSeek-V3 and Llama 3 on M-Series Mac Without Melting It',
    niche: 'AI & Hardware Optimization',
    searchVolume: 'Exploding',
    difficulty: 'Low',
    hookAngle: 'Most people don’t know Ollama now has 4-bit quantization that runs at 45 tokens/sec.',
    estimatedViews: '120K - 250K',
    suggestedFormat: 'video'
  },
  {
    id: 'trend-02',
    topic: '3 Free AI Tools That Are Actually Better Than ChatGPT Plus in 2026',
    niche: 'AI Productivity',
    searchVolume: 'High',
    difficulty: 'Low',
    hookAngle: 'Stop paying $20/month until you check these open-weights browser alternatives.',
    estimatedViews: '300K - 600K',
    suggestedFormat: 'short'
  },
  {
    id: 'trend-03',
    topic: 'The Architecture of AI Coding Assistants: Context Windows, ASTs & Embeddings',
    niche: 'Software Engineering',
    searchVolume: 'Steady',
    difficulty: 'Medium',
    hookAngle: 'Why standard RAG fails for codebases and how tree-sitter AST parsing fixes it.',
    estimatedViews: '60K - 110K',
    suggestedFormat: 'video'
  },
  {
    id: 'trend-04',
    topic: 'I Tested YouTube’s New 2026 Algorithm Update: Here is What Ranks #Shorts',
    niche: 'Creator Economy & SEO',
    searchVolume: 'Exploding',
    difficulty: 'Medium',
    hookAngle: 'Retention rate matters less than this single new metric YouTube quietly introduced.',
    estimatedViews: '450K - 900K',
    suggestedFormat: 'short'
  }
];
