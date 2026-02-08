"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleField() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      fullScreen: { enable: false },
      particles: {
        number: { value: 90, density: { enable: true, area: 900 } },
        color: { value: ["#ffd1e8", "#ffe6f5", "#ffd700"] },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: { enable: true, minimumValue: 0.2 } },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          repulse: { distance: 80, duration: 0.4 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Particles id="valentine-particles" options={options} />
    </div>
  );
}
