import { skillCategories } from "@/data/skills";
import SkillCard from "@/components/SkillCard";

const Skills = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0 animate-fade-up">
            My <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up animation-delay-100">
            I continuously learn and work with various technologies to build 
            modern, scalable, and user-friendly applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center opacity-0 animate-fade-up animation-delay-400">
          <div className="glass-card inline-block px-8 py-6">
            <p className="text-muted-foreground mb-2">
              Always learning new technologies and improving my skills
            </p>
            <p className="text-primary font-medium">
              Currently exploring: AI/ML, Web3, and Cloud Architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
