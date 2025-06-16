"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";

const Model = ({
  glb,
  px = 0,
  py = 0,
  pz = 0,
  rx = 0,
  rt = 0,
  rz = 0,
  scale = 1,
}) => {
  const { scene } = useGLTF(glb);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={[px, py, pz]}
      rotation={[rx, rt, rz]}
    />
  );
};

const RenderThree = ({
  glb,
  px = 0,
  py = 0,
  pz = 0,
  rx = 0,
  rt = 0,
  rz = 0,
  scale = 1,
  scaleShadow = 1,
  positionShadow = -1,
  opacityShadow,
  height = "100%",
  blurOpacity = 2.5,
}) => {
  return (
    <div style={{ width: "100%", height: height }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        {/* Cahaya */}
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={[3, 5, 2]}
          intensity={3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          <Model
            glb={glb}
            px={px}
            py={py}
            pz={pz}
            rx={rx}
            rt={rt}
            rz={rz}
            scale={scale}
          />
        </Suspense>

        {/* Bayangan realistis */}
        <ContactShadows
          position={[0, positionShadow, 0]}
          opacity={opacityShadow}
          scale={scaleShadow}
          blur={blurOpacity}
          far={5}
        />

        <OrbitControls enableZoom={false} enableRotate />
      </Canvas>
    </div>
  );
};

export default RenderThree;
