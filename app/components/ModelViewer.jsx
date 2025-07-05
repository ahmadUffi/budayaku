// components/ModelViewer.jsx
"use client"; // <== WAJIB karena Web Component tidak bisa SSR

import React from "react";

export default function ModelViewer({
  src = "/models/my-model.glb",
  alt = "3D model",
  width = "100%",
  height = "500px",
  autoRotate = true,
  cameraControls = true,
  ar = true,
}) {
  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate={autoRotate}
      camera-controls={cameraControls}
      ar={ar}
      shadow-intensity="1"
      style={{ width, height }}
    ></model-viewer>
  );
}
