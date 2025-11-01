import { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  name: 'Anmol Vijay Bhatia',
  title: 'Software Engineer & Product Manager - AI Solutions',
  email: 'anmolvb1@gmail.com',
  phone: '+1 (312) 826-2020',
  linkedin: 'https://www.linkedin.com/in/anmol-vb',
  github: 'https://github.com/anmolbhatia',
  summary: `Software Engineer and Product Manager with expertise in Generative AI, full-stack development, and enterprise solutions. 
    Award-winning professional recognized for Individual Excellence (R&R Program, Incedo Inc.). Proven track record in building 
    scalable AI systems, optimizing performance, and leading cross-functional teams. Strong background in microservices, 
    agentic workflows, and cloud technologies.`,
  
  experience: [
    {
      id: '1',
      title: 'Product Manager - AI Solutions',
      company: 'Incedo Inc. (BrainSpark & Lighthouse)',
      period: 'April 2025 - Present',
      description: `Shaped AI product strategy with the Chief Solutions Officer, aligning technical and business priorities. 
        Led discovery workshops and demos, capturing feedback that directly influenced solution design. 
        Coordinated with leadership and product teams to refine solution features, improve scalability, 
        and ensure delivery of AI products that met enterprise standards.`,
      skills: ['Product Strategy', 'AI Solutions', 'Client Discovery', 'Cross-functional Leadership', 'Solution Design'],
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Incedo Inc.',
      period: 'July 2023 - Present',
      description: `Engineered robust user access controls using Java, Spring Boot, and React.js on an enterprise-level change 
        management platform serving 150K+ users, reducing unauthorized access by 75%. Optimized backend microservices response 
        time from 40s to 2s (95% improvement). Built an Agentic AI Workflow with Gemini APIs using tool-calling to query enterprise 
        data. Developed a Root-Cause Analysis agent integrated with troubleshooting agent, reducing incident resolution time by 50%. 
        Trained a forecasting model using XGBoost, enabling accurate prediction and reducing variance by 30%.`,
      skills: ['Java', 'Spring Boot', 'React.js', 'Gemini APIs', 'XGBoost', 'Microservices', 'AI Agents'],
    },
    {
      id: '3',
      title: 'Computer Science Teaching Assistant',
      company: 'University of Illinois at Chicago',
      period: 'August 2021 - May 2023',
      description: `Facilitated interactive labs for 130+ students in C, C++, and Arduino, enhancing teamwork and communication. 
        Mentored students and graded assignments, boosting scores by 35 points while fostering collaboration. 
        Developed a Java-based seating allocation tool that promoted fairness and streamlined lab management by 25%.`,
      skills: ['C/C++', 'Arduino', 'Java', 'Embedded Systems', 'Teaching', 'Debugging', 'Agile'],
    },
    {
      id: '4',
      title: 'Intern',
      company: 'KPMG Kuwait',
      period: 'January 2021 - March 2021',
      description: `Built Angular components to improve frontend performance and user experience, reducing load time by 25%. 
        Developed backend services in Java and Node.js, integrating with REST APIs to streamline data flows and 
        accelerate project delivery by 20%. Enhanced application security by implementing input validation and 
        strengthening compliance with OWASP.`,
      skills: ['Angular', 'Java', 'Node.js', 'REST APIs', 'OWASP', 'Security'],
    },
  ],

  projects: [
    {
      id: '1',
      title: 'Ecommerce Inventory Management System',
      description: 'A full-stack web application with a responsive user interface that enhanced supply chain pipeline and improved business expenditure for 5 stakeholders.',
      image: '/portfolio/Inventorymanagement.png',
      tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'AWS EC2/RDS', 'Docker', 'Material UI'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'Engineered scalable MySQL schema with Spring Boot + Hibernate ORM',
        'Real-time updates and analytics dashboard',
        'Responsive Material UI components',
      ],
    },
    {
      id: '2',
      title: 'Deep Research Agentic System',
      description: 'A team of collaborating AI Agents capable of carrying out extensive research tasks across heterogeneous sources, integrating retrieval, analysis, and summarization pipelines.',
      image: '/portfolio/deepresearch.png',
      tags: ['Python', 'LangGraph', 'Ollama', 'LLaMA-3-8B', 'PGVector', 'Fast APIs'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'Tool-calling workflows with LangGraph to coordinate multiple agents',
        'Source-grounded comprehensive reports',
        'Reduced manual research time by 70%',
      ],
    },
    {
      id: '3',
      title: 'Advanced Search Engine Optimizer',
      description: 'A search engine on Linux, optimizing token filtration and data retrieval efficiency using Binary Search Trees (BSTs) and AVL Trees.',
      image: '/portfolio/SEO.png',
      tags: ['C++', 'CMake', 'Ubuntu Linux', 'TinyXML', 'Data Structures'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'Developed and integrated 8 search algorithms',
        'Processed XML dataset of over 10,000 records',
        'Web crawling and inverted indexing',
      ],
    },
    {
      id: '4',
      title: '15 Puzzle AI Solver',
      description: 'Efficient 15-puzzle solver with IDA* search, utilizing misplaced tiles & Manhattan distance heuristics.',
      image: '/portfolio/15Ai.png',
      tags: ['C++', 'AI', 'Search Algorithms', 'Heuristics'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'IDA* search algorithm implementation',
        'Multiple heuristics (misplaced tiles, Manhattan distance)',
        'Reports move sequence, nodes expanded, time, and memory usage',
      ],
    },
    {
      id: '5',
      title: 'Dish Discoverer Web Application',
      description: 'User-friendly web app that allows users to search and discover recipes based on ingredients, cuisine, or dietary restrictions using the Spoonacular API.',
      image: '',
      tags: ['JavaScript', 'HTML', 'CSS', 'Spoonacular API'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'Recipe search by ingredients and cuisine',
        'Dietary restriction filters',
        'Spoonacular API integration',
      ],
    },
    {
      id: '6',
      title: 'Movie Recommender Mobile App',
      description: 'A cross-platform app with secure login verification system using AWS Amplify, providing movie ratings, reviews, and cast information.',
      image: '/portfolio/movieapp.png',
      tags: ['Flutter', 'Dart', 'AWS Amplify', 'Cross-platform'],
      github: 'https://github.com/anmolbhatia',
      highlights: [
        'Secure AWS Amplify authentication',
        'Cloud database integration',
        'Movie ratings, reviews, and cast information',
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
    'HTML/CSS',
    'Spring Boot',
    'React.js',
    'Node.js',
    'Angular',
    'GraphQL',
    'Postgres',
    'MySQL',
    'MongoDB',
    'Hibernate ORM',
    'XGBoost',
    'LangGraph',
    'CrewAI',
    'Ollama',
    'OpenAI APIs',
    'Gemini APIs',
    'ChromaDB',
    'FAISS',
    'RAG',
    'Git',
    'Docker',
    'Jenkins',
    'Maven',
    'Gradle',
    'AWS',
    'Jira',
    'Splunk',
    'ElasticSearch',
  ],

  education: [
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
      date: 'June 2024',
      category: 'All Hands - Digital Engineering',
      description: 'Recognized for exceptional achievements and raising the bar. Award presented for outstanding contributions to Digital Engineering.',
      quote: '"You inspire us everyday!" - Nitin Seth, CEO Incedo Inc.',
    },
  ],
  volunteering: [
    {
      role: 'Mentor',
      organization: 'SparkHacks',
      period: 'March 2023',
      description: 'Guided students to develop applications using mobile and web technologies, such as Java, Flutter and React.js.',
    },
    {
      role: 'Team Lead',
      organization: 'CodeDay',
      period: 'February 2020',
      description: 'Developed a top-down game using GML and designed pixel art with the help of 3 members. Presented the project to judges and other teams.',
    },
    {
      role: 'Volunteer',
      organization: 'Autism Aashram',
      location: 'Hyderabad, India',
      description: 'Took care of kids and helped them with their daily activities.',
    },
    {
      role: 'Orientation Leader',
      organization: 'Shorelight (University of Illinois Chicago)',
      period: 'August 2022 - September 2022',
      description: 'Developed a comprehensive orientation week schedule for all incoming students. Conducted engaging seminars on University policies, with tailored advice for CS students to excel in their academia. Maintained efficient project management, meeting critical deadlines and fostering effective team communication.',
    },
    {
      role: 'Math Learning Assistant',
      organization: 'University of Illinois Chicago',
      period: 'August 2021 - December 2021',
      description: 'Assisted students with introduction to Pre-Calculus and Calculus Concepts. Held review sessions and assisted in discussion sections.',
    },
  ],
  otherExperience: [
    {
      title: 'Sales Intern',
      company: 'Geekay Group',
      period: 'April 2019 - July 2019',
      location: 'Kuwait City Metropolitan Area',
      description: 'Successfully completed a sales and merchandising internship at a flagship store. Demonstrated exceptional sales skills by consistently exceeding monthly sales targets. Conducted quality control checks on gaming products, ensuring customer satisfaction by identifying and resolving faults promptly.',
    },
  ],
};

export const chatContext = `You are an AI assistant representing Anmol Vijay Bhatia, a Software Engineer and Product Manager with expertise in Generative AI and full-stack development. 

IMPORTANT: Anmol is an award-winning professional who received the Individual Excellence Award (R&R Program) from Incedo Inc. in June 2024 for exceptional achievements in Digital Engineering.

Your role is to answer questions about Anmol's:
- Professional experience (Software Engineer & Product Manager at Incedo Inc. since July 2023)
- Technical skills (Java, Python, Spring Boot, React.js, AI/ML, Microservices)
- Projects (Ecommerce systems, AI agents, search engines, mobile apps)
- Education (BS in Computer Science, Minor in Mathematics from UIC)
- Awards and Recognition (R&R Individual Excellence Award, June 2024)
- Certifications (AWS Certified Cloud Practitioner, May 2025)
- Volunteering and Leadership (Mentor, Team Lead, Teaching Assistant)

Key Highlights:
- Built Agentic AI Workflows with Gemini APIs and tool-calling
- Reduced microservices response time by 95% (40s to 2s)
- Developed Root-Cause Analysis agents reducing incident resolution by 50%
- Trained XGBoost forecasting model reducing variance by 30%
- Served 150K+ users on enterprise change management platform
- Teaching Assistant for 130+ students in C, C++, and Arduino
- AWS Certified Cloud Practitioner (May 2025)

Full Resume Data:
${JSON.stringify(resumeData, null, 2)}

Additional Information:
${JSON.stringify(additionalInfo, null, 2)}

Guidelines:
- Be friendly, professional, and enthusiastic
- Speak in first person as if you are Anmol
- Highlight the R&R Award when discussing achievements
- Mention specific metrics and accomplishments (95% improvement, 150K+ users, etc.)
- Provide specific examples from the resume data
- If asked about something not in the data, politely mention that you don't have that specific information
- Encourage visitors to view the portfolio or download the resume for more details
- Be concise but informative
- Show personality and passion for technology, AI, and mentoring`;


