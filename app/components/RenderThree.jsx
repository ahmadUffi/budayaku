"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { invalidate } from "@react-three/fiber";

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

  const optimizedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return scene;
  }, [scene]);

  return (
    <primitive
      object={optimizedScene}
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
  opacityShadow = 0.5,
  height = "100%",
  blurOpacity = 2.5,
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 45 }}
        frameloop="demand"
      >
        {/* Cahaya */}
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={[3, 5, 2]}
          intensity={2}
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
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

        {/* Bayangan kontak */}
        <ContactShadows
          position={[0, positionShadow, 0]}
          opacity={opacityShadow}
          scale={scaleShadow}
          blur={blurOpacity}
          far={5}
        />

        {/* Kontrol kamera */}
        <OrbitControls
          enableZoom={false}
          enableRotate
          onChange={() => invalidate()}
        />
      </Canvas>
    </div>
  );
};

export default RenderThree;
