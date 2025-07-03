"use client";

import React, { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
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
  const [loaded, setLoaded] = useState(false);

  const optimizedScene = useMemo(() => {
    const cloned = scene; // Deep clone
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Jika pakai material sharing, clone juga:
        child.material = child.material.clone();
        child.geometry = child.geometry.clone();
      }
    });
    return cloned;
  }, [scene]);

  useEffect(() => {
    setLoaded(true);
  }, [scene]);

  useFrame((state) => {
    if (loaded && groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.1;
      invalidate();
    }
  });

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
  classname = "",
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
    <div style={{ width: "100%", height }} className={classname}>
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? 1 : 2}
        camera={{
          position: isMobile ? [0, 1.5, 3.5] : [0, 2, 5],
          fov: isMobile ? 50 : 45,
        }}
        frameloop="demand"
      >
        <ambientLight intensity={isMobile ? 0.7 : 1} />
        <directionalLight
          castShadow={!isMobile}
          position={[3, 5, 2]}
          intensity={isMobile ? 1.5 : 2.5}
          shadowMapSize={{
            width: isMobile ? 256 : 512,
            height: isMobile ? 256 : 512,
          }}
        />

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
