import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  name: 'Anmol Vijay Bhatia',
  title: 'I build AI agents that ship to production',
  email: 'anmolvb11@gmail.com',
  phone: '+1 (312) 826-2020',
  linkedin: 'https://www.linkedin.com/in/anmol-vb',
  github: 'https://github.com/abhati27',
  summary: `I'm a guy with a head full of schemes and a heart full of memes. My obsession with tech started with
    absurd hours in Minecraft, which quickly spiraled into cracking open hardware and teaching myself system modding
    to see how things actually worked under the hood. To me, computer science is the ultimate universal tool, sitting
    right at the intersection of systems, art, human behavior, and problem-solving. After earning my bachelor's in CS
    and spending three years engineering software in the field, I'm now pursuing my Master's in AI to double down on
    the technology I'm most passionate about. I'm actively seeking full-time roles and internships where I can tackle
    complex problems, build intelligent systems, and help move the needle forward.`,

  experience: [
    {
      id: '1',
      title: 'Software Engineer (AI/ML Enablement)',
      company: 'Incedo Inc.',
      period: 'October 2025 - July 2026',
      description: `This role turned AI/ML from a passion into my daily focus. I engineered the ATOLL Network
        Summarizer, a multi-agent LangGraph pipeline that shrank telecom data analysis from hours to seconds, and
        built a multi-agent NL-to-SQL system that translates natural language into self-validated database queries.
        To keep these systems safe and predictable, I shipped a custom MCP server to strictly sandbox agent execution
        and audit logging. Alongside hands-on development, I partnered directly with the Chief Solutions Officer to
        define the long-term AI product strategy.`,
      skills: ['LangGraph', 'Multi-Agent Systems', 'MCP', 'NL-to-SQL', 'Python', 'Agent Architecture'],
    },
    {
      id: '2',
      title: 'Associate Software Engineer (Full Stack)',
      company: 'Incedo Inc.',
      period: 'July 2023 - October 2025',
      description: `Before shifting to AI, I spent over two years learning what enterprise scale really means while
        supporting a platform of 150,000+ users. My focus was on performance, security, and system reliability. I
        unblocked redundant API dependencies to plummet page load times from 40 seconds down to 2 seconds, rebuilt our
        Role-Based Access Control (RBAC) system from scratch, cutting unauthorized access incidents by 85%, and
        modernized a rigid legacy UI into customizable, user-driven dashboard widgets. I also engineered a batch-digest
        pipeline for transactional emails, eliminating rate-limiting bottlenecks and server strain.`,
      skills: ['Java', 'Spring Boot', 'React.js', 'RBAC', 'Microservices', 'System Design'],
    },
    {
      id: '3',
      title: 'Computer Science Teaching Assistant',
      company: 'University of Illinois at Chicago - College of Engineering',
      period: 'August 2021 - May 2023',
      description: `I led labs for over 130 computer science students. Instead of passive lecturing, I anchored
        sessions around pair programming and Test-Driven Development (TDD) to build real-world coding habits early. My
        biggest emphasis was systematic debugging, coaching students to step back and isolate root causes methodically
        rather than guessing, whether they were untangling recursive logic, troubleshooting pointer arithmetic, or
        stress-testing custom data structures.`,
      skills: ['C/C++', 'Data Structures', 'Teaching', 'Debugging', 'Mentorship'],
    },
    {
      id: '4',
      title: 'Mathematics Learning Assistant',
      company: 'University of Illinois at Chicago - Department of Mathematics',
      period: 'August 2021 - December 2021',
      description: `In my math and theory sections, I noticed students often mechanically followed formal proofs
        without truly grasping why they worked. To fix this, I flipped my approach, building intuitive, conceptual
        understanding first before introducing formal notation, which completely transformed their confidence. I also
        maintained a weekly feedback loop with lead instructors, tracking recurring student pain points to continually
        adapt and refine our upcoming sessions around what actually needed clarification.`,
      skills: ['Mathematics', 'Teaching', 'Curriculum Design', 'Mentorship'],
    },
    {
      id: '5',
      title: 'Intern',
      company: 'KPMG Kuwait',
      period: 'January 2021 - March 2021',
      description: `My engineering background started with systems auditing and infrastructure health. I used tools
        like Burp Suite and Wireshark alongside custom scripts to hunt down web vulnerabilities and patch them
        proactively. I also evaluated older IT systems, leveraging Gartner market research to make a data-driven
        business case for executive modernization priorities.`,
      skills: ['Security Audits', 'Burp Suite', 'Wireshark', 'OWASP', 'Python'],
    },
  ],

  projects: [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
    {
      id: '4',
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
      id: '5',
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
      id: '6',
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
