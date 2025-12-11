export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration using Stripe.",
    image: "/placeholder.svg",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    githubLink: "https://github.com/akshaymahajan2004",
    liveLink: "https://example.com",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application powered by OpenAI GPT-4 with conversation history, user profiles, and smart suggestions.",
    image: "/placeholder.svg",
    techStack: ["React", "OpenAI API", "Firebase", "TypeScript"],
    githubLink: "https://github.com/akshaymahajan2004/Akshay-Portfolio",
    liveLink: "https://example.com",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "Comprehensive project management tool with drag-and-drop functionality, team collaboration, and analytics dashboard.",
    image: "/placeholder.svg",
    techStack: ["React", "Express", "MySQL", "Chart.js"],
    githubLink: "https://github.com/akshaymahajan",
    liveLink: "https://example.com",
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Beautiful weather application with 7-day forecasts, location-based weather, and interactive weather maps.",
    image: "/placeholder.svg",
    techStack: ["React", "Weather API", "Tailwind", "Geolocation"],
    githubLink: "https://github.com/akshaymahajan",
    liveLink: "https://example.com",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media accounts with real-time data visualization and performance metrics.",
    image: "/placeholder.svg",
    techStack: ["React", "Node.js", "PostgreSQL", "D3.js"],
    githubLink: "https://github.com/akshaymahajan",
    liveLink: "https://example.com",
  },
  {
    id: 6,
    title: "Portfolio Generator",
    description: "Dynamic portfolio website generator with customizable themes, sections, and automatic deployment.",
    image: "/placeholder.svg",
    techStack: ["React", "Next.js", "Tailwind", "Vercel"],
    githubLink: "https://github.com/akshaymahajan",
    liveLink: "https://example.com",
  },
  {
    id: 7,
    title: "Portfolio Generator",
    description: "Dynamic portfolio website generator with customizable themes, sections, and automatic deployment.",
    image: "/placeholder.svg",
    techStack: ["React", "Next.js", "Tailwind", "Vercel"],
    githubLink: "https://github.com/akshaymahajan",
    liveLink: "https://example.com",
  },
];
