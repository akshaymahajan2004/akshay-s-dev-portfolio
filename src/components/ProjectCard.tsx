import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <div
      className={`glass-card glow-border overflow-hidden group opacity-0 animate-fade-up`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        
        {/* Logic: If project has an image URL, show it. Otherwise, show gradient placeholder. */}
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
          </div>
        )}

        {/* Overlay Buttons (Visible on Hover) */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary rounded-full text-primary-foreground hover:scale-110 transition-transform"
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-secondary rounded-full text-secondary-foreground hover:scale-110 transition-transform"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            asChild
            size="sm"
            className="flex-1 btn-glow bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Live Demo
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 border-border hover:bg-secondary hover:text-foreground"
          >
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;