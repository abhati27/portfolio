import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  name: 'Anmol Vijay Bhatia',
  title: 'I build AI agents that ship to production',
  email: 'anmolvb11@gmail.com',
  phone: '+1 (312) 826-2020',
  linkedin: 'https://www.linkedin.com/in/anmol-vb',
  github: 'https://github.com/abhati27',
  summary: `I'm a guy with a head full of schemes and a heart full of memes. I fell for computers young, spending
    absurd hours in Minecraft, then getting more curious about what was under the hood than the game itself. Before
    long I was cracking open the computer, figuring out how it all fit together, and teaching myself to mod systems.
    That curiosity never really switched off. It just grew up with me. But the real reason I threw myself into
    computer science is how interconnected it is. It threads through physics, chemistry, sociology, art, all of it,
    becoming the tool people reach for no matter what they're up against. Hand a programmer the right problem and they
    can nudge the whole world a step forward. I finished my bachelor's, spent three years putting it to work in the
    field, and I'm now back for a master's in AI because I still get too excited about this stuff to stop. Right now
    I'm hunting for internships and full-time roles that'll pull me deeper into the parts I keep gravitating toward.`,

  experience: [
    {
      id: '1',
      title: 'Software Engineer (AI/ML Enablement)',
      company: 'Incedo Inc.',
      period: 'October 2025 - July 2026',
      description: `This is where the AI/ML stuff stopped being a side interest and became the actual job. My first big
        build was an ATOLL Network Summarizer. Telecom teams were losing entire afternoons pulling insights out of raw
        network data by hand, so I put together a LangGraph pipeline where a handful of agents split up the work and
        hand back a clean summary in seconds. After that came the thing I'm proudest of, a multi-agent NL-to-SQL
        system. You ask a question in plain English, and the agents figure out what you actually meant, find the right
        tables, write the query, and double-check their own answer before handing it over, so someone who has never
        touched SQL can still pull their own data. To keep all of that from ever doing anything dangerous, I shipped an
        MCP server that gives the agents a fixed set of safe tools for running queries, reading schemas, validating
        data, and logging everything they do. And somewhere in the middle of all that, I sit down with our Chief
        Solutions Officer and help figure out where these AI products are actually headed.`,
      skills: ['LangGraph', 'Multi-Agent Systems', 'MCP', 'NL-to-SQL', 'Python', 'Agent Architecture'],
    },
    {
      id: '2',
      title: 'Associate Software Engineer (Full Stack)',
      company: 'Incedo Inc.',
      period: 'July 2023 - October 2025',
      description: `Before the AI work, I spent a little over two years learning what enterprise scale actually feels
        like. The platform had more than 150,000 users, which meant nothing was allowed to quietly fall over. The fix
        I still bring up too often: pages were taking 40 seconds to load, and I traced it back to a pile of API calls
        that were all sitting around waiting on each other for no good reason. Once I untangled how the services
        talked, it dropped to 2 seconds. I also rebuilt the entire role-based access system from scratch, which cut
        unauthorized-access incidents by 85 percent, sat down with real users to understand how they actually worked
        and turned a stiff old interface into a widget layout they could arrange themselves, and quietly put out a
        spam-filter fire by batching a flood of transactional emails into scheduled digests.`,
      skills: ['Java', 'Spring Boot', 'React.js', 'RBAC', 'Microservices', 'System Design'],
    },
    {
      id: '3',
      title: 'Computer Science Teaching Assistant',
      company: 'University of Illinois at Chicago - College of Engineering',
      period: 'August 2021 - May 2023',
      description: `I ran labs for more than 130 students, and I basically tried to teach the class I wish I'd had.
        Instead of talking at them, we did a lot of pair programming and test-driven development so they were actually
        writing code together and catching their own mistakes. The part that stuck was debugging. I kept pushing them
        to slow down and isolate a failure on purpose instead of guessing, whether it was recursion tying itself in
        knots, pointer math gone sideways, or a data structure quietly refusing to cooperate.`,
      skills: ['C/C++', 'Data Structures', 'Teaching', 'Debugging', 'Mentorship'],
    },
    {
      id: '4',
      title: 'Mathematics Learning Assistant',
      company: 'University of Illinois at Chicago - Department of Mathematics',
      period: 'August 2021 - December 2021',
      description: `I kept noticing students who could follow every step of a proof without believing a word of it, so
        I flipped my discussion sections to lead with the intuition first and the formal notation second. That one
        change did more for their confidence than anything else I tried. Every week I'd take the questions that kept
        coming up back to the instructors, and we'd rework the next session around whatever was actually confusing
        people.`,
      skills: ['Mathematics', 'Teaching', 'Curriculum Design', 'Mentorship'],
    },
    {
      id: '5',
      title: 'Intern',
      company: 'KPMG Kuwait',
      period: 'January 2021 - March 2021',
      description: `My first real taste of professional engineering was on the security side. I ran full audits of web
        infrastructure with tools like Burp Suite and Wireshark, plus a few scripts I wrote myself, working through
        OWASP threat models to find and close holes before anyone else could. I also spent a good chunk of time
        digging through older IT systems and used Gartner research to help make the case for what leadership should
        modernize first.`,
      skills: ['Security Audits', 'Burp Suite', 'Wireshark', 'OWASP', 'Python'],
    },
  ],

  projects: [
    {
      id: '1',
      title: '15 Puzzle AI Solver',
      description: `The project that made search algorithms click for me. I implemented IDA* to solve the classic
        15-puzzle, then pitted two heuristics against each other — Manhattan distance vs. misplaced tiles — across
        hundreds of configurations to see where each one wins. Every run prints the moves, nodes expanded, time, and
        memory, so the theory becomes something you can actually watch.`,
      image: '/portfolio/15Ai.png',
      tags: ['C', 'IDA*', 'Heuristic Search', 'STL', 'Algorithms'],
      github: 'https://github.com/abhati27/15puzzle-AI-solver',
      highlights: [
        'IDA* search with Manhattan distance and misplaced-tile heuristics',
        'Benchmarked admissibility vs. efficiency across hundreds of configurations',
        'Reports move sequence, nodes expanded, time, and memory usage',
      ],
    },
    {
      id: '2',
      title: 'Ecommerce Inventory Management System',
      description: `A full-stack inventory platform I built end-to-end for 5 stakeholders — schema and backend from
        scratch, wrapped in a dashboard non-technical users could actually operate. It tightened up their supply-chain
        pipeline and cut spend that was leaking out of a manual process.`,
      image: '/portfolio/Inventorymanagement.png',
      tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'AWS', 'Docker'],
      github: 'https://github.com/abhati27/InventoryWebApp',
      highlights: [
        'Engineered a scalable MySQL schema with Spring Boot + Hibernate ORM',
        'Real-time updates and an analytics dashboard',
        'Deployed on AWS EC2/RDS with Docker',
      ],
    },
    {
      id: '3',
      title: 'ReliaNet',
      description: `I rebuilt reliable networking from scratch on top of lossy UDP — stop-and-wait ARQ,
        sequence-numbered ACKs, EWMA-based RTT estimation — basically to understand everything TCP quietly does for
        you, by doing it myself. Then I hammered it across 50+ scenarios with configurable packet loss and latency to
        prove it held up.`,
      image: '/portfolio/relianet.png',
      tags: ['Python', 'Sockets', 'Binary Protocol Design', 'Multi-process Architecture'],
      github: 'https://github.com/abhati27/ReliaNet',
      highlights: [
        'Stop-and-wait ARQ with sequence-numbered ACKs',
        'EWMA-based RTT estimation for adaptive timeouts',
        'Validated across 50+ configurable loss/latency scenarios',
      ],
    },
    {
      id: '4',
      title: 'Deep Agentic Research Engine',
      description: `Give it a question and it does the research for you — generating sub-queries, crawling sources,
        checking them against each other, and writing up a synthesized report. It routes across OpenAI, Gemini, and
        Anthropic depending on the task and streams everything back over SSE, so you watch it think instead of staring
        at a spinner.`,
      image: '/portfolio/deepresearch.png',
      tags: ['Node.js', 'LangChain', 'ChromaDB', 'Multi-LLM Routing', 'SSE'],
      github: 'https://github.com/abhati27/deep-agentic-research',
      highlights: [
        'Multi-step agentic loop: query generation, crawling, verification, synthesis',
        'Multi-provider routing across OpenAI, Gemini, and Anthropic',
        'Streamed, source-grounded reports via SSE',
      ],
    },
    {
      id: '5',
      title: 'Legal Clause Auditor LLM',
      description: `I wanted to know if a small, self-hosted model could do real legal work without paying an API per
        call — so I fine-tuned LLaMA 3 8B with QLoRA on California court rulings to detect legal clauses, hitting 89%
        accuracy. I took it the whole way: domain adaptation, GGUF quantization, and a FastAPI service that runs with
        zero dependency on any external LLM provider.`,
      image: '/portfolio/legalclause.png',
      tags: ['Python', 'PyTorch', 'QLoRA', 'LLaMA 3 8B', 'GGUF', 'FastAPI'],
      link: 'https://huggingface.co/abhati27',
      highlights: [
        'QLoRA fine-tuning of LLaMA 3 8B on California court rulings',
        '89% accuracy on legal clause detection',
        'Quantized to GGUF and self-hosted via FastAPI',
      ],
    },
    {
      id: '6',
      title: 'Document Intelligence System',
      description: `Legal and financial forms are where most OCR pipelines fall apart — layout matters as much as text.
        I built a multi-modal pipeline combining LayoutLMv3 and Donut to read the structure and the content together,
        pulling out key fields at 90% accuracy — 30% better than the traditional OCR-plus-NLP approach on the same
        documents.`,
      image: '/portfolio/docintel.png',
      tags: ['Python', 'PyTorch', 'Transformers', 'LayoutLMv3', 'Donut', 'LangChain'],
      github: 'https://github.com/abhati27/document-intelligence',
      highlights: [
        'LayoutLMv3 + Donut for layout analysis and key-info extraction',
        '90% extraction accuracy, 30% better than OCR + NLP',
        'Applied to real legal and financial forms',
      ],
    },
  ],

  skills: [
    'Java',
    'Python',
    'C/C++',
    'JavaScript',
    'TypeScript',
    'Go',
    'SQL',
    'HTML/CSS',
    'Spring Boot',
    'React.js',
    'Node.js',
    'Angular',
    'GraphQL',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Hibernate',
    'LangChain',
    'LangGraph',
    'MCP',
    'RAG',
    'PyTorch',
    'HuggingFace Transformers',
    'LoRA/QLoRA Fine-tuning',
    'Quantization',
    'Ollama',
    'OpenAI/Gemini APIs',
    'ChromaDB',
    'FAISS',
    'Elasticsearch',
    'Langfuse',
    'XGBoost',
    'Prophet',
    'NumPy',
    'pandas',
    'Git',
    'Docker',
    'Jenkins',
    'Maven',
    'Gradle',
    'AWS',
    'Jira',
    'Splunk',
  ],

  education: [
    {
      degree: 'Master of Science in Artificial Intelligence (Incoming)',
      school: 'New Jersey Institute of Technology',
      year: 'September 2026 - December 2027',
    },
    {
      degree: 'Bachelor of Science in Computer Science, Minor in Mathematics',
      school: 'University of Illinois at Chicago',
      year: 'August 2019 - May 2023',
    },
  ],
};

export const additionalInfo = {
  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'May 2025',
      description: 'Demonstrated cloud fluency and foundational AWS knowledge. Able to identify essential AWS services necessary to set up AWS-focused projects.',
    },
  ],
  awards: [
    {
      name: 'R&R Program - Individual Excellence Award',
      organization: 'Incedo Inc.',
      date: 'October 2025',
      category: 'North America',
      description: 'Recognized for consistent high-impact contributions to the Digital Engineering team across client-facing AI initiatives and enterprise platform delivery.',
    },
    {
      name: 'R&R Program - Individual Excellence Award',
      organization: 'Incedo Inc.',
      date: 'June 2024',
      category: 'All Hands - Digital Engineering',
      description: 'Selected from the Digital Engineering division for exceptional individual performance and for raising the bar.',
      quote: '"You inspire us everyday!" - Nitin Seth, CEO Incedo Inc.',
    },
  ],
  volunteering: [
    {
      role: 'Mentor',
      organization: 'SparkHacks - UIC Annual Hackathon',
      period: 'March 2023',
      description: 'Mentored student teams on architecture tradeoffs and project scoping, helping reframe vague ideas into buildable systems with clear evaluation criteria within a 24-hour timeline.',
    },
    {
      role: 'Team Lead',
      organization: 'Code Day',
      period: 'February 2020',
      description: 'Taught problem decomposition over syntax to beginners, helping students build and ship a working project within a single day through real-time pair debugging and structured iterative feedback.',
    },
    {
      role: 'Orientation Leader',
      organization: 'Shorelight (University of Illinois Chicago)',
      period: 'August 2022 - September 2022',
      description: 'Developed a comprehensive orientation week schedule for all incoming students. Conducted engaging seminars on University policies, with tailored advice for CS students to excel in their academics.',
    },
    {
      role: 'Volunteer',
      organization: 'Autism Aashram',
      location: 'Hyderabad, India',
      description: 'Helped care for children and supported their daily activities.',
    },
  ],
};
