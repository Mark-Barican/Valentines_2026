"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorTrail() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 240, damping: 30 });
  const springY = useSpring(y, { stiffness: 240, damping: 30 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX - 8);
      y.set(event.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{ translateX: springX, translateY: springY }}
    >
      <div className="cursor-orb" />
    </motion.div>
  );
}
