"use client";

import { motion } from "framer-motion";

export default function SceneLoader() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.3em] text-white/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
    >
      Loading the magic
    </motion.div>
  );
}
