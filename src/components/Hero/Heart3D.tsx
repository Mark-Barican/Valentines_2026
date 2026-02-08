"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { a, useSpring } from "@react-spring/three";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils, Mesh, MeshPhysicalMaterial } from "three";

export default function Heart3D() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/heart.glb");
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const baseScale = 0.72;
  const dragState = useRef({
    active: false,
    rotX: 0,
    rotY: 0,
  });
  const [pulseBoost, setPulseBoost] = useState(1);
  const pulseRef = useRef({ active: false, start: 0 });

  const material = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#ff7ac7",
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.95,
        thickness: 1.8,
        clearcoat: 1,
        clearcoatRoughness: 0,
        ior: 1.5,
        emissive: "#ff2d95",
        emissiveIntensity: 0.12,
      }),
    []
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [material, scene]);

  const spring = useSpring({
    scale: clicked ? 1.18 : hovered ? 1.08 : 1,
    config: { mass: 1, tension: 180, friction: 18 },
  });

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 1.4) * 0.025;
    const base = spring.scale.get();
    group.current.scale.setScalar(base * breathe * baseScale * pulseBoost);
    const idle = t * 0.2;
    group.current.rotation.y = idle + dragState.current.rotY;
    group.current.rotation.x = dragState.current.rotX;
  });

  useEffect(() => {
    const handlePulse = () => {
      pulseRef.current.active = true;
      pulseRef.current.start = performance.now();
    };
    window.addEventListener("valentine:yes", handlePulse);
    return () => window.removeEventListener("valentine:yes", handlePulse);
  }, []);

  useFrame(() => {
    if (!pulseRef.current.active) return;
    const now = performance.now();
    const elapsed = (now - pulseRef.current.start) / 1000;
    const duration = 1.2;
    if (elapsed > duration) {
      pulseRef.current.active = false;
      setPulseBoost(1);
      return;
    }
    const pulses = 3;
    const wave = Math.sin((elapsed / duration) * Math.PI * pulses);
    const eased = Math.max(0, wave);
    const target = 1 + eased * 0.16;
    setPulseBoost(target);
  });

  return (
    <a.group
      ref={group}
      onPointerDown={(event) => {
        event.stopPropagation();
        dragState.current.active = true;
        event.target.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        dragState.current.active = false;
        event.target.releasePointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragState.current.active) return;
        event.stopPropagation();
        dragState.current.rotY += event.movementX * 0.005;
        dragState.current.rotX += event.movementY * 0.005;
        dragState.current.rotX = MathUtils.clamp(
          dragState.current.rotX,
          -0.8,
          0.8
        );
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        window.setTimeout(() => setClicked(false), 900);
      }}
      position={[0, -0.1, 0]}
    >
      <primitive object={scene} />
    </a.group>
  );
}

useGLTF.preload("/heart.glb");
