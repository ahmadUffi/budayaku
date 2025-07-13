// components/ModelViewer.jsx
"use client"; // <== WAJIB karena Web Component tidak bisa SSR

import useResponsive from "../hooks/useResponsive";
import React from "react";
// import "@google/model-viewer";

export default function ModelViewer({
  src = "/models/my-model.glb",
  alt = "3D model",
  width = "100%",
  height = "500px",
  autoRotate = true,
  cameraOrbit = "45deg 75de 0deg",
  cameraTarget = "0m 1m 0m",

  ar = true,
}) {
  const { deviceName } = useResponsive();
  return (
    <model-viewer
      src={src}
      alt={alt}
      autoplay
      // auto-rotate={autoRotate}
      camera-controls={true}
      ar={ar}
      camera-orbit={cameraOrbit}
      camera-target={cameraTarget}
      shadow-intensity="1"
      style={{ width, height }}
    ></model-viewer>
  );
}

// camera-orbit="0deg 80deg 9m"
// camera-target="0m 2m 0m"
