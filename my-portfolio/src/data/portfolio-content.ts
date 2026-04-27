export type SkillCategory = {
  title: string;
  items: string[];
};

export type ProjectItem = {
  title: string;
  stack: string[];
  summary: string;
  demoUrl: string;
  githubUrl: string;
  thumbnailLabel: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export const profile = {
  name: "Muhammad Qasim",
  title: "Full Stack & AI Developer",
  profileImage: "/qasim-profile.jpg",
  profileImageAlt: "Portrait of Muhammad Qasim",
  oneLiner:
    "I build high-performance web products with modern full stack engineering and practical AI integration.",
  about:
    "I am a Computer Science student focused on shipping real products. I have backend internship experience, freelance delivery experience, and I am actively deepening my AI/ML learning path to build production-ready intelligent applications.",
  email: "muhammadqasim.dev@gmail.com",
  phone: "+92-300-1234567",
  whatsapp: "https://wa.me/923001234567",
  linkedin: "https://www.linkedin.com/in/muhammadqasim-dev",
  github: "https://github.com/muhammadqasim-dev",
};

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "AI / ML",
    items: ["Python", "OpenAI APIs", "Prompt Engineering", "RAG Basics", "Model Evaluation"],
  },
  {
    title: "Tools",
    items: ["Git/GitHub", "Docker", "Vercel", "Postman", "Figma"],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Smart Commerce Dashboard",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Chart.js"],
    summary:
      "Analytics platform with role-based access, KPI reporting, and business forecasting widgets.",
    demoUrl: "https://example.com/demo/commerce-dashboard",
    githubUrl: "https://github.com/example/smart-commerce-dashboard",
    thumbnailLabel: "Dashboard UI",
  },
  {
    title: "AI Resume Optimizer",
    stack: ["React", "FastAPI", "OpenAI", "Redis"],
    summary:
      "Tool that rewrites resumes against job descriptions and scores match quality in real time.",
    demoUrl: "https://example.com/demo/resume-optimizer",
    githubUrl: "https://github.com/example/ai-resume-optimizer",
    thumbnailLabel: "AI Optimization",
  },
  {
    title: "Freelance Client Portal",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    summary:
      "Client workspace for proposals, milestones, invoices, and secure file sharing.",
    demoUrl: "https://example.com/demo/client-portal",
    githubUrl: "https://github.com/example/freelance-client-portal",
    thumbnailLabel: "Client Workspace",
  },
  {
    title: "SaaS Landing Generator",
    stack: ["React", "Tailwind", "Framer Motion", "Supabase"],
    summary:
      "No-code style builder that generates conversion-focused landing pages from guided inputs.",
    demoUrl: "https://example.com/demo/saas-landing-generator",
    githubUrl: "https://github.com/example/saas-landing-generator",
    thumbnailLabel: "Landing Builder",
  },
  {
    title: "Interview Copilot",
    stack: ["Next.js", "WebSockets", "Node.js", "OpenAI"],
    summary:
      "Real-time interview preparation platform with adaptive questioning and feedback reports.",
    demoUrl: "https://example.com/demo/interview-copilot",
    githubUrl: "https://github.com/example/interview-copilot",
    thumbnailLabel: "Live AI Coach",
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Backend Engineering Intern",
    organization: "TechFlow Labs",
    period: "2025 - 2026",
    highlights: [
      "Built and optimized REST APIs for high-traffic modules.",
      "Reduced average response time by introducing query indexing.",
      "Collaborated with frontend teams on integration contracts.",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    organization: "Independent Clients",
    period: "2024 - Present",
    highlights: [
      "Delivered landing pages and business websites with modern stacks.",
      "Integrated third-party APIs for payments, CRM, and automation.",
      "Maintained client retention through performance and reliability.",
    ],
  },
  {
    role: "Academic Milestones",
    organization: "Computer Science Program",
    period: "Ongoing",
    highlights: [
      "Developed capstone projects with AI-assisted workflows.",
      "Participated in hackathons and coding competitions.",
      "Published strong results in software engineering coursework.",
    ],
  },
];

export const services: ServiceItem[] = [
  {
    title: "Website Development",
    description: "Custom websites optimized for performance, clarity, and business outcomes.",
  },
  {
    title: "Portfolio Sites",
    description: "Personal brands that help developers, students, and creators stand out online.",
  },
  {
    title: "Landing Pages",
    description: "Conversion-focused pages for campaigns, products, and lead generation funnels.",
  },
  {
    title: "API Integration",
    description: "Reliable integrations across payment, communication, and productivity platforms.",
  },
  {
    title: "AI Solutions",
    description: "Practical AI features including chat, automation, and workflow acceleration.",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Ayesha Khan",
    role: "Startup Founder",
    quote:
      "Qasim transformed our product concept into a polished platform quickly. Communication and quality were excellent.",
  },
  {
    name: "Umar Farooq",
    role: "Agency Project Manager",
    quote:
      "Strong ownership from planning to deployment. The final delivery was clean, responsive, and reliable.",
  },
  {
    name: "Hammad Ali",
    role: "Freelance Client",
    quote:
      "The site looked premium and performed fast on all devices. He understood our goals and delivered beyond expectations.",
  },
];
