import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SectionNav from "./components/SectionNav";
import HolaEasterEgg from "./components/HolaEasterEgg";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import WhatIBuild from "./sections/WhatIBuild";
import About from "./sections/About";
import TechMarquee from "./sections/TechMarquee";
import Projects from "./sections/Projects";
import HowIWork from "./sections/HowIWork";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./lib/smoothScroll";

function App() {
  useSmoothScroll();

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
      <div className="fixed inset-0 -z-10 opacity-100 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-[-4%] aurora-drift"
          style={{ background: "var(--glow-bg)" }}
        />
        <div
          className="absolute inset-[-6%] aurora-drift-alt"
          style={{ background: "var(--glow-bg)" }}
        />
      </div>
      <ScrollProgress />
      <Navbar />
      <SectionNav />
      <main>
        <Hero />
        <Marquee />
        <WhatIBuild />
        <TechMarquee />
        <Projects />
        <HowIWork />
        <About />
        <Skills />
        <Contact />
      </main>
      <HolaEasterEgg />
    </div>
  );
}

export default App;
