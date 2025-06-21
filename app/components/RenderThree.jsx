"use client";

import React, { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  useProgress,
  Html,
} from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ textAlign: "center", color: "#555", fontSize: 16 }}>
        Loading... {Math.floor(progress)}%
      </div>
    </Html>
  );
};

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
  const groupRef = useRef();

  const optimizedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
    return scene;
  }, [scene]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive
        object={optimizedScene}
        scale={scale}
        position={[px, py, pz]}
        rotation={[rx, rt, rz]}
      />
    </group>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ width: "100%", height }}>
      <Canvas
        shadows={!isMobile}
        dpr={1}
        camera={{
          position: isMobile ? [0, 1.5, 3.5] : [0, 2, 5],
          fov: isMobile ? 50 : 45,
        }}
        frameloop="demand"
        onCreated={({ gl }) => {
          const canvas = gl.getContext().canvas;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("WebGL context lost. Silakan refresh halaman.");
          });
        }}
      >
        <ambientLight intensity={0.7} />
        {!isMobile && (
          <directionalLight
            position={[3, 5, 2]}
            intensity={1.5}
            shadow-mapSize-width={256}
            shadow-mapSize-height={256}
            castShadow={false}
          />
        )}

        <Suspense fallback={<Loader />}>
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

        {!isMobile && (
          <ContactShadows
            position={[0, positionShadow, 0]}
            opacity={opacityShadow}
            scale={scaleShadow}
            blur={blurOpacity}
            far={5}
          />
        )}

        <OrbitControls enableZoom={false} enableRotate />
      </Canvas>
    </div>
  );
};

export default RenderThree;
