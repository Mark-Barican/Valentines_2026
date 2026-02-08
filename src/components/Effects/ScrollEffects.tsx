"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        y: -40,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-content",
          start: "top 60%",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
