import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden
      style={{ scaleX: spring, transformOrigin: "left" }}
    />
  );
}

export default ScrollProgress;
