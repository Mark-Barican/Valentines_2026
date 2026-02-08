"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reasons = [
  "You make ordinary days feel like a dream.",
  "Your laugh is the sparkle in every memory.",
  "You inspire me to love deeper, laugh louder, live softer.",
  "With you, every heartbeat feels in sync.",
  "You are my favorite place to rest and rise.",
  "You are my forever kind of magic.",
];

export default function ReasonsSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-gradient text-3xl font-semibold sm:text-4xl">Reasons I love you</h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          Little things that make my heart choose you, every time.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((reason, index) => (
          <div
            key={reason}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="glass-card rounded-3xl p-6 text-sm text-white/80 shadow-xl"
          >
            <div className="mb-4 h-10 w-10 rounded-2xl bg-white/10 text-center text-lg leading-10 text-[#ffd700]">
              {index + 1}
            </div>
            <p className="text-lg font-medium">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
