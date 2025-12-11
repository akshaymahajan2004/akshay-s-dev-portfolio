import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const itemsPerPage = 6; // how many projects per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // calculate slice range
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 opacity-0 animate-fade-up">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up animation-delay-100">
            A collection of projects I've built using modern technologies. 
            Each project showcases different skills and problem-solving approaches.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

          <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Projects;
