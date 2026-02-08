"use client";

import { motion } from "framer-motion";

const title = "Pau, will you be my\nValentine?";

export default function HeroText() {
  return (
    <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6 text-center">
      <motion.h1
        className="text-gradient text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ whiteSpace: "pre-line", display: "inline-block" }}>
          {title}
        </span>
      </motion.h1>
      <motion.p
        className="max-w-2xl text-xl text-white/75 sm:text-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        I’d like to spend some time with you on the 16th.
      </motion.p>
    </div>
  );
}
