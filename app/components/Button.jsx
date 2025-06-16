"use client";

import React from "react";

const floatAnimation = {
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
};

const Button = ({ children, animate = false }) => {
  return (
    <div
      onClick={() => console.log("Button clicked!")}
      className={` ${
        animate ? "animate-bounce" : ""
      } hover:animate-none active:animate-none w-max rouded-lg cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-[0_6px_0_#1e40af] hover:translate-y-1 active:translate-y-2 active:shadow-[0_2px_0_#1e40af] transition-all duration-150 `}
    >
      {children}
    </div>
  );
};

export default Button;
