"use client";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffd1e8" />
      <spotLight
        position={[2.5, 3.5, 3]}
        intensity={2.9}
        angle={0.35}
        penumbra={1}
        color="#ff8ad1"
        castShadow
      />
      <spotLight
        position={[-2.5, 2, 3]}
        intensity={1.7}
        angle={0.45}
        penumbra={1}
        color="#c026d3"
      />
      <pointLight position={[0, -2, 2]} intensity={1.05} color="#ffd700" />
    </>
  );
}
