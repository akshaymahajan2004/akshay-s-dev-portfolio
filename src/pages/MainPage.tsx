import Home from "./Home";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import About from "./About";
const MainPage = () => {
  return (
    <div className="flex flex-col">
      {/* Home Section */}
      <section id="home">
        <Home />
      </section>

      <section id="about" className="scroll-mt-10">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-10">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-10">
        <Skills />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-10">
        <Contact />
      </section>
    </div>
  );
};

export default MainPage;