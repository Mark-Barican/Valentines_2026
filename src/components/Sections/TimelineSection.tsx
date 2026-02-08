"use client";

import { motion } from "framer-motion";

const memories = [
  {
    title: "The first spark",
    detail: "That moment I knew you were different.",
  },
  {
    title: "Midnight talks",
    detail: "Hours that felt like minutes with you.",
  },
  {
    title: "Our adventures",
    detail: "Every place brighter with you by my side.",
  },
];

export default function TimelineSection() {
  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-gradient text-3xl font-semibold sm:text-4xl">Our story so far</h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          A timeline of moments that shaped my heart.
        </p>
      </motion.div>
      <div className="relative mx-auto grid gap-6 md:grid-cols-3">
        {memories.map((memory) => (
          <motion.div
            key={memory.title}
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl p-6 text-white/80"
          >
            <h3 className="text-xl font-semibold text-white">{memory.title}</h3>
            <p className="mt-3 text-sm leading-relaxed">{memory.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
