import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading projects...</div>;

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  // --- FIXED NAVIGATION FUNCTION ---
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
      // FIX: Find the 'projects' section ID and scroll to IT, not the top of the window
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-100">
            A collection of projects I've built using modern technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-3">
             <button 
                onClick={() => goToPage(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="px-4 py-2 border rounded-md disabled:opacity-40 hover:bg-gray-100 transition"
             >
                Prev
             </button>
             
             {/* Page Numbers */}
             {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => goToPage(number)}
                  className={`px-4 py-2 border rounded-md transition ${
                    currentPage === number 
                      ? "bg-primary text-white border-primary" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
             ))}

             <button 
                onClick={() => goToPage(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="px-4 py-2 border rounded-md disabled:opacity-40 hover:bg-gray-100 transition"
             >
                Next
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;