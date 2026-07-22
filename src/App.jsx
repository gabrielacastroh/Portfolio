import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import SectionNav from "./components/SectionNav";
import HolaEasterEgg from "./components/HolaEasterEgg";
import Hero from "./sections/Hero";
import TrustSection from "./sections/TrustSection";
import Marquee from "./sections/Marquee";
import About from "./sections/About";
import WhatIBuild from "./sections/WhatIBuild";
import Projects from "./sections/Projects";
import HowIWork from "./sections/HowIWork";
import Skills from "./sections/Skills";
import TechMarquee from "./sections/TechMarquee";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./lib/smoothScroll";
import { preloadRemoteAssets } from "./lib/preloadAssets";
import { useEffect } from "react";

function App() {
  useSmoothScroll();

  // Deferred to idle rather than fired on mount: the assets it warms up are
  // decorative and below the fold, so they must not compete with the hero
  // paint and the render-blocking font stylesheet for connections/bandwidth.
  // Idle time is exactly when there is spare capacity for them.
  useEffect(() => {
    const schedule = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = schedule(() => preloadRemoteAssets());
    return () => cancel(id);
  }, []);

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
        <TrustSection />
        <Marquee />
        <About />
        <WhatIBuild />
        <Projects />
        <HowIWork />
        <Skills />
        <TechMarquee />
        <Contact />
      </main>
      <HolaEasterEgg />
    </div>
  );
}

export default App;
