import { useState } from "react";
import { SkillCategory } from "@/data/skills";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard = ({ category, index }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 8;

  // Calculate which skills to show
  const visibleSkills = isExpanded
    ? category.skills
    : category.skills.slice(0, MAX_VISIBLE);

  const remainingCount = category.skills.length - MAX_VISIBLE;

  return (
    <div
      className="glass-card p-6 opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category.icon}</span>
        <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-3">
        {visibleSkills.map((skill, skillIndex) => (
          <span
            key={skill}
            className="skill-badge opacity-0 animate-fade-in"
            style={{
              animationDelay: `${(index * 100) + (skillIndex * 50)}ms`,
              animationFillMode: "forwards",
            }}
          >
            {skill}
          </span>
        ))}

        {/* "+X More" Button */}
        {!isExpanded && remainingCount > 0 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer border border-primary/20"
          >
            +{remainingCount} more
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillCard;