import { Code2, Brain, Rocket, Coffee } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: Code2,
      label: "Development",
      value: "Full Stack",
      desc: "MERN & Next.js",
    },
    {
      icon: Brain,
      label: "Focus",
      value: "AI & Web",
      desc: "Integration Specialist",
    },
    {
      icon: Rocket,
      label: "Projects",
      value: "10+",
      desc: "Completed Successfully",
    },
    {
      icon: Coffee,
      label: "Passion",
      value: "Infinite",
      desc: "Lines of Code",
    },
  ];

  return (
    <div className="relative w-full py-20 lg:py-32 lg:min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0 animate-fade-up">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg opacity-0 animate-fade-up animation-delay-100">
            A closer look at who I am, what I do, and what drives me.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center">
          
          {/* Left Column: Bio (Now First on Mobile) */}
          <div className="space-y-6 opacity-0 animate-fade-up animation-delay-200">
            {/* <h2 className="text-2xl sm:text-2xl font-bold text-foreground text-center lg:text-left">
              Driven by <span className="text-primary">Innovation</span> & Problem Solving
            </h2> */}
            
            <div className="glass-card p-6 sm:p-8 space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                Hello! I'm <span className="text-foreground font-medium">Akshay Mahajan</span>, 
                a passionate Full-stack Developer based in India. My journey in tech started with 
                curiosity about how things work on the web, which quickly evolved into a love 
                for building robust applications.
              </p>
              <p>
                I specialize in the <span className="text-primary">MERN stack</span> (MongoDB, Express, React, Node.js) 
                and modern frameworks like <span className="text-primary">Next.js</span>. 
                Beyond standard web development, I have a deep interest in Artificial Intelligence 
                and how it can be integrated into web apps to create smarter user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source, or refining my problem-solving skills on platforms like LeetCode.
              </p>
            </div>
          </div>

          {/* Right Column: Stats Grid (Now Second on Mobile) */}
          {/* Changed grid-cols-1 to grid-cols-2 for mobile 2-column layout */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 opacity-0 animate-fade-up animation-delay-300">
            {stats.map((item, index) => (
              <div 
                key={index} 
                // Reduced padding (p-3) for mobile to make cards smaller/compact
                className="glass-card p-3 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 group shadow-sm"
              >
                {/* Smaller icon container on mobile */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                {/* Smaller text sizes on mobile */}
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-1">{item.value}</h3>
                <p className="text-xs sm:text-sm font-medium text-foreground mb-1">{item.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{item.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;