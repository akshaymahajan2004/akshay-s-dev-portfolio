import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", id: "home" },
  {name: "About", id:"about"},
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section logic
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu if open

    if (location.pathname !== "/") {
      // If on Admin page, go to Home first
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      // Already on Home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }
  };

  // Highlight active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;

      const scrollPosition = window.scrollY + 500; // Offset for navbar height

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Secret Admin Access) */}
          <button
            onClick={() => navigate("/admin")}
            className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
          >
            AM
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "nav-link text-sm font-medium transition-colors hover:text-primary",
                  activeSection === link.id && location.pathname === "/"
                    ? "text-primary active font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-4 px-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-left text-sm font-medium py-3 px-4 rounded-lg transition-colors",
                    activeSection === link.id && location.pathname === "/"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;