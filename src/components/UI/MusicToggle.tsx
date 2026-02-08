"use client";

import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const [active, setActive] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const baseVolume = 0.06;

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/ambient-music.mp3"],
      loop: false,
      volume: baseVolume,
      preload: true,
      onplay: () => setActive(true),
      onplayerror: () => setActive(false),
      onload: () => {
        const sound = soundRef.current;
        if (!sound) return;
        const duration = sound.duration();
        if (!duration || Number.isNaN(duration)) return;
        const fadeSeconds = 2;
        const fadeStart = Math.max(0, duration - fadeSeconds);
        if (fadeTimerRef.current) {
          window.clearTimeout(fadeTimerRef.current);
        }
        fadeTimerRef.current = window.setTimeout(() => {
          if (!sound.playing()) return;
          sound.fade(baseVolume, 0, fadeSeconds * 1000);
        }, fadeStart * 1000);
      },
      onend: () => {
        const sound = soundRef.current;
        if (!sound) return;
        sound.stop();
        sound.volume(0);
        sound.play();
        sound.fade(0, baseVolume, 1500);
      },
    });

    const sound = soundRef.current;
    sound.play();

    return () => {
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current);
      }
      soundRef.current?.unload();
      soundRef.current = null;
    };
  }, []);

  const toggle = () => {
    const sound = soundRef.current;
    if (!sound) return;
    if (active) {
      sound.pause();
      setActive(false);
    } else {
      sound.play();
      sound.fade(0, baseVolume, 1000);
      setActive(true);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={toggle}
      className="group fixed right-6 top-6 z-50 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm uppercase tracking-[0.25em] text-white/80 backdrop-blur-md"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active
            ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)] pulse-dot"
            : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]"
        }`}
      />
      {active ? "Music On" : "Music Off"}
    </motion.button>
  );
}
