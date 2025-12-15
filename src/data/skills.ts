export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "🎨",
    skills: ["ReactJS", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript","NextJS"],
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  },
  {
    name: "Database",
    icon: "🗄️",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
  },
  {
    name: "Tools & Platforms",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Docker", "Vercel"],
  },
];
