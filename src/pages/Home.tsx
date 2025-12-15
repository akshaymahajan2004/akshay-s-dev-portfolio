import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from '../assets/logo1.svg';
import resume from "../data/Akshay Resume.pdf"
const Home = () => {
  // Helper function to handle smooth scrolling
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20 lg:py-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-up">
              <Sparkles size={16} />
              Available for new projects
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 opacity-0 animate-fade-up animation-delay-100">
              Hi, I'm{" "}
              <span className="text-gradient">Akshay Mahajan</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 opacity-0 animate-fade-up animation-delay-200">
              <span className="text-foreground font-medium">Full-stack Developer</span> | AI & Web Enthusiast
            </p>

            {/* Description */}
            <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-up animation-delay-300">
              I craft beautiful, performant web applications with modern technologies. 
              Passionate about creating seamless user experiences and solving complex problems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 animate-fade-up animation-delay-400">
              <Button
                onClick={scrollToProjects} // CHANGED: Now uses scroll handler
                size="lg"
                className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 px-8 cursor-pointer"
              >
                View Projects
                <ArrowRight size={18} className="ml-2" />
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary hover:text-foreground px-8 cursor-pointer"
              >
                {/* Note: Update href to your actual CV file path */}
                <a href={resume} download="Akshay Resume.pdf">
                  <Download size={18} className="mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 opacity-0 animate-fade-up animation-delay-300">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-2xl scale-110" />
              
              {/* Profile Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-float">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                     {/* Ensure image covers the circle nicely */}
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-primary/30 animate-float" style={{ animationDelay: "0.5s" }}>
                <span className="text-xl">⚛️</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/30 animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;