import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SectionNav from "./components/SectionNav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

function App() {
  return (
    <div
      className="min-h-screen font-sans antialiased relative text-theme-primary"
      style={{ color: "var(--text-primary)" }}
    >
      <div
        className="fixed inset-0 -z-10 bg-theme-base"
        style={{ backgroundColor: "var(--bg-base)" }}
        aria-hidden
      />
      <div
        className="fixed inset-0 -z-10 opacity-100"
        style={{ background: "var(--glow-bg)" }}
        aria-hidden
      />
      <ScrollProgress />
      <Navbar />
      <SectionNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
