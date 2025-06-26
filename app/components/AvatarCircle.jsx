"use client";

import Image from "next/image";

export default function AvatarCircle({
  src = null,
  alt = "",
  size = "md",
  position = "",
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  };

  // Tailwind value minus setengah dari tinggi masing-masing
  const negativeHalfBottom = {
    sm: "-bottom-4", // half of 8
    md: "-bottom-6", // half of 12
    lg: "-bottom-12", // half of 16
  };

  const positionClass = {
    sm: "top-4 left-4",
    md: "top-8 left-8",
    lg: "top-12 left-12",
    centerBottom: `left-1/2 transform -translate-x-1/2 ${negativeHalfBottom[size]}`,
  };

  const finalSize = sizeClasses[size] || sizeClasses.md;
  const finalPosition = positionClass[position] || "";

  return (
    <div
      className={`rounded-full overflow-hidden ${finalSize} absolute ${finalPosition} border-b-9 border-[#F9ECBD] z-90`}
      style={{ backgroundColor: "#f0f0f0" }}
    >
      {src ? <Image src={src} alt={alt} width={100} height={100} /> : null}
    </div>
  );
}
