"use client";

import ModelViewer from "../ModelViewer";
import useResponsive from "../../hooks/useResponsive";
import { useState, useEffect } from "react";
import Button from "../Button";
import { WordRotate } from "../magicui/word-rotate";

export default function Hero({ className = "" }) {
  const [size, setSize] = useState(500);
  const [isGo, setIsgo] = useState(false);

  const { deviceName } = useResponsive();

  const smoothScrollTo = (targetId, duration = 10000) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smooth effect
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (!deviceName) return; // Jangan set apa pun sebelum hydration

    if (deviceName === "mobile") setSize(300);
    else if (deviceName === "tablet") setSize(700);
    else setSize(500);
  }, [deviceName]);
  if (!deviceName) return;

  const handleclick = async () => {
    setIsgo(true);
    // Play audio
    const audio = new Audio("/sounds/opening.mp3"); // letakkan file di public/sounds
    audio.play().catch((e) => {
      console.error("Audio gagal diputar:", e);
    });

    await new Promise((resolve) => setTimeout(resolve, 2500));
    smoothScrollTo("start", 15000);
  };
  return (
    <div
      className=" lg:h-[100vh] sm:h-[100vh] md:h-max overflow-hidden bg-transparent lg:items-center bg-cover bg-center grid md:grid-cols-2 relative z-80 shadow-solid-red shadow-solid-blue"
      // style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <div className="title order-2 md:order-1 px-6 lg:pl-35 py-16 flex flex-col gap-8 relative z-40">
        <div className="text space-y-4">
          <h2 className=" text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug">
            Hidupkan Kembali Budaya Indonesia <br className="hidden md:block" />{" "}
          </h2>
          <div className="flex items-center gap-3  text-xl sm:text-2xl md:text-3xl font-bold -mt-3  text-black">
            Lewat
            <WordRotate
              className=" text-[#9c4712] dark:text-white"
              words={[
                "Dunia Digital",
                "3D Interaktif",
                "Artificial Intelegance",
              ]}
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed max-w-xl">
            <strong>Bukan cuma dilihat, tapi dirasakan.</strong>
            <br />
            Temukan keunikan budaya dari berbagai penjuru Nusantara lewat
            pengalaman interaktif yang{" "}
            <span className="text-blue-600 font-semibold">modern</span> dan{" "}
            <span className="text-pink-500 font-semibold">menyenangkan</span>.
          </p>
        </div>
        <div className="pt-4">
          <Button onclick={handleclick} className="animate-bounce rounded-sm">
            🚀 Pergi Belajar
          </Button>
        </div>
      </div>

      <div className=" min-h-max order-1 md:order-2 relative z-30 flex items-center justify-center">
        <ModelViewer
          src="/ui/maskotwelcome.glb"
          width={deviceName == "mobile" ? "90vw" : "600px"}
          height={deviceName == "mobile" ? "40vh" : "450px"}
          cameraOrbit="0deg 80deg 9m"
          cameraTarget="0m 2m 0m"
          alt="My 3D Object"
          isSpeak={isGo}
          cameraControls={false}
        />
      </div>

      {/* <AvatarCircle position={"centerBottom"} src="" alt="" size="lg" /> */}
    </div>
  );
}
