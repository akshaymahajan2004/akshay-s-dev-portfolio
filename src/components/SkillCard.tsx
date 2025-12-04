import { SkillCategory } from "@/data/skills";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard = ({ category, index }: SkillCardProps) => {
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
        {category.skills.map((skill, skillIndex) => (
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
      </div>
    </div>
  );
};

export default SkillCard;
