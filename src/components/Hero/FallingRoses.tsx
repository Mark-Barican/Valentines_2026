"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type FallingInstance = {
  type: "rose" | "strawberry" | "flower1";
  position: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  rotationSpeed: THREE.Vector3;
  scale: number;
};

const ROSE_COUNT = 32;
const STRAWBERRY_COUNT = 20;
const FLOWER1_COUNT = 6;
const Z_DEPTH = { min: -1.8, max: -0.9 };

export default function FallingRoses() {
  const { scene: roseScene } = useGLTF("/roses.glb");
  const { scene: strawberryScene } = useGLTF("/strawberries.glb");
  const { scene: flower1Scene } = useGLTF("/flower1.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const instances = useMemo<FallingInstance[]>(
    () =>
      [
        ...Array.from({ length: ROSE_COUNT }, () => ({
          type: "rose" as const,
          position: new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(viewport.width * 0.8),
            THREE.MathUtils.randFloat(
              -viewport.height * 0.85,
              viewport.height * 0.85
            ),
            THREE.MathUtils.randFloat(Z_DEPTH.min, Z_DEPTH.max)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2)
          ),
          speed: THREE.MathUtils.randFloat(0.12, 0.24),
          rotationSpeed: new THREE.Vector3(
            THREE.MathUtils.randFloat(0.1, 0.25),
            THREE.MathUtils.randFloat(0.1, 0.2),
            THREE.MathUtils.randFloat(0.05, 0.15)
          ),
          scale: THREE.MathUtils.randFloat(0.14, 0.22),
        })),
        ...Array.from({ length: STRAWBERRY_COUNT }, () => ({
          type: "strawberry" as const,
          position: new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(viewport.width * 0.8),
            THREE.MathUtils.randFloat(
              -viewport.height * 0.85,
              viewport.height * 0.85
            ),
            THREE.MathUtils.randFloat(Z_DEPTH.min, Z_DEPTH.max)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2)
          ),
          speed: THREE.MathUtils.randFloat(0.14, 0.26),
          rotationSpeed: new THREE.Vector3(
            THREE.MathUtils.randFloat(0.08, 0.18),
            THREE.MathUtils.randFloat(0.08, 0.16),
            THREE.MathUtils.randFloat(0.05, 0.12)
          ),
          scale: THREE.MathUtils.randFloat(0.18, 0.28),
        })),
        ...Array.from({ length: FLOWER1_COUNT }, () => ({
          type: "flower1" as const,
          position: new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(viewport.width * 0.8),
            THREE.MathUtils.randFloat(
              -viewport.height * 0.85,
              viewport.height * 0.85
            ),
            THREE.MathUtils.randFloat(Z_DEPTH.min, Z_DEPTH.max)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2),
            THREE.MathUtils.randFloat(0, Math.PI * 2)
          ),
          speed: THREE.MathUtils.randFloat(0.12, 0.22),
          rotationSpeed: new THREE.Vector3(
            THREE.MathUtils.randFloat(0.08, 0.16),
            THREE.MathUtils.randFloat(0.08, 0.16),
            THREE.MathUtils.randFloat(0.05, 0.12)
          ),
          scale: THREE.MathUtils.randFloat(0.12, 0.2),
        })),
      ],
    [viewport.height, viewport.width]
  );

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.children.forEach((child, index) => {
      const item = instances[index];
      if (!item) return;
      child.position.y -= item.speed * delta;
      child.rotation.x += item.rotationSpeed.x * delta;
      child.rotation.y += item.rotationSpeed.y * delta;
      child.rotation.z += item.rotationSpeed.z * delta;
      const resetY = viewport.height * 0.85;
      if (child.position.y < -resetY) {
        child.position.y = resetY;
        child.position.x = THREE.MathUtils.randFloatSpread(
          viewport.width * 0.8
        );
        child.position.z = THREE.MathUtils.randFloat(Z_DEPTH.min, Z_DEPTH.max);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.6, 0]}>
      {instances.map((item, index) => {
        const source =
          item.type === "rose"
            ? roseScene
            : item.type === "strawberry"
            ? strawberryScene
            : flower1Scene;
        const clone = source.clone(true);
        clone.traverse((child) => {
          child.raycast = () => null;
        });
        return (
          <primitive
            key={`${item.type}-${index}`}
            object={clone}
            position={item.position}
            rotation={item.rotation}
            scale={item.scale}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload("/roses.glb");
useGLTF.preload("/strawberries.glb");
useGLTF.preload("/flower1.glb");
