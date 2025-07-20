"use client";

import ModelViewer from "../ModelViewer";
import useResponsive from "../../hooks/useResponsive";
import { useState, useEffect } from "react";
import Button from "../Button";

export default function Hero({ className = "" }) {
  const [size, setSize] = useState(500);

  const { deviceName } = useResponsive();
  console.log(deviceName);

  useEffect(() => {
    if (deviceName === "mobile") setSize(300);
    else if (deviceName === "tablet") setSize(700);
    else setSize(500);
  }, [deviceName]);

  console.log(deviceName);

  return (
    <div
      className=" lg:h-[100vh] sm:h-[100vh] md:h-max overflow-hidden bg-transparent lg:items-center bg-cover bg-center grid md:grid-cols-2 relative z-80 shadow-solid-red shadow-solid-blue"
      // style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <div className="title order-2 md:order-1 px-6 lg:pl-35 py-16 flex flex-col gap-8 relative z-40">
        <div className="text space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug">
            Hidupkan Kembali Budaya Indonesia <br className="hidden md:block" />{" "}
            Lewat Dunia Digital
          </h2>
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
          <Button className={"animate-bounce rounded-sm "}>
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
          isSpeak={true}
        />
      </div>

      {/* <AvatarCircle position={"centerBottom"} src="" alt="" size="lg" /> */}
    </div>
  );
}
