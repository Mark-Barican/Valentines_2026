"use client";

import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom intensity={1.3} luminanceThreshold={0.2} mipmapBlur />
      <DepthOfField focusDistance={0.02} focalLength={0.03} bokehScale={2.2} />
      <ChromaticAberration offset={new Vector2(0.0015, 0.001)} blendFunction={BlendFunction.NORMAL} />
      <Vignette offset={0.25} darkness={0.9} eskil={false} />
    </EffectComposer>
  );
}
