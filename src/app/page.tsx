"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ParticleField from "@/components/Effects/ParticleField";
import CursorTrail from "@/components/Effects/CursorTrail";
import HeroText from "@/components/UI/HeroText";
import YesButton from "@/components/UI/YesButton";
import MusicToggle from "@/components/UI/MusicToggle";
import SceneLoader from "@/components/Hero/SceneLoader";

const Scene = dynamic(() => import("@/components/Hero/Scene"), {
  ssr: false,
  loading: () => <SceneLoader />,
});

export default function Home() {
  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CursorTrail />
      <MusicToggle />
      <main className="relative flex min-h-screen flex-col overflow-hidden">
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
          <div className="pointer-events-none">
            <ParticleField />
          </div>
          <div className="pointer-events-none glow-ring -top-10 left-1/2 -translate-x-1/2 animate-[pulseGlow_6s_ease-in-out_infinite]" />
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <Scene />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <HeroText />
            <div className="mt-10">
            <YesButton
              onAccepted={() =>
                window.dispatchEvent(new Event("valentine:yes"))
              }
            />
            </div>
          </div>
          <div className="pointer-events-none vignette" />
          <div className="pointer-events-none noise-overlay" />
        </section>
        <div className="pointer-events-none fixed bottom-6 right-6 z-20 text-xs uppercase tracking-[0.35em] text-white/60">
          Drag to rotate
        </div>
      </main>
    </motion.div>
  );
}
