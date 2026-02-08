"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useReward } from "react-rewards";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

type YesButtonProps = {
  onAccepted?: () => void;
};

export default function YesButton({ onAccepted }: YesButtonProps) {
  const { reward } = useReward("yes-reward", "confetti", {
    spread: 120,
    lifetime: 200,
    elementCount: 80,
    position: "absolute",
  });
  const [accepted, setAccepted] = useState(false);

  const handleClick = () => {
    reward();
    confetti({
      particleCount: 160,
      spread: 140,
      startVelocity: 45,
      colors: ["#ff8ad1", "#ffd700", "#fff8f0", "#dc143c"],
      origin: { x: 0.5, y: 0.4 },
    });
    setAccepted(true);
    onAccepted?.();
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <span id="yes-reward" className="relative inline-flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className="group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 py-5 text-base font-semibold uppercase tracking-[0.3em] text-white shadow-2xl shadow-pink-500/30 backdrop-blur-lg sm:text-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#ff8ad1] via-[#ffd1e8] to-[#ffd700] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">YES!</span>
        </motion.button>
      </span>

      {accepted && (
        <div className="text-base text-white/80 sm:text-lg">
          <TypeAnimation
            sequence={[
              "Thank you, Pau. That means everything to me.",
              1500,
              "I promise to show you how much you mean to me.",
              1500,
              "See you on the 16th for our date.",
              1500,
              "I love you ❤️❤️❤️ - Mark",
            ]}
            speed={52}
            wrapper="span"
            repeat={0}
          />
        </div>
      )}
    </motion.div>
  );
}
