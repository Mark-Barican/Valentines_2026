"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import Heart3D from "./Heart3D";
import FallingRoses from "./FallingRoses";
import Lighting from "./Lighting";
import PostProcessing from "../Effects/PostProcessing";

export default function Scene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0.1, 6.2], fov: 38 }}
      dpr={[1, 1.7]}
    >
      <color attach="background" args={["#0f0c29"]} />
      <fog attach="fog" args={["#120b2c", 2, 8]} />
      <Suspense fallback={null}>
        <Lighting />
        <FallingRoses />
        <Float speed={1.25} rotationIntensity={0.4} floatIntensity={0.6}>
          <Heart3D />
        </Float>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={false}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          minDistance={2.2}
          maxDistance={6.2}
        />
        <Sparkles count={120} speed={0.6} opacity={0.6} scale={[8, 6, 4]} size={1.2} />
        <Environment preset="sunset" />
        <PostProcessing />
      </Suspense>
    </Canvas>
  );
}
