"use client";

import { Marquee } from "@/components/magicui/marquee";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import mainbg from "@/public/images/bg-color.png";
import { useState } from "react";

export default function Province() {
  const [selected, setSelected] = useState("");
  const provinces = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Sumatera Selatan",
    "Bangka Belitung",
    "Bengkulu",
    "Lampung",
    "DKI Jakarta",
    "Banten",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Tengah",
    "Kalimantan Selatan",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Sulawesi Utara",
    "Gorontalo",
    "Sulawesi Tengah",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Maluku",
    "Maluku Utara",
    "Papua",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat",
    "Papua Barat Daya",
    "Papua Selatan",
  ];

  const isMatch = (province) =>
    selected && province.toLowerCase().includes(selected.toLowerCase());

  const threed = {
    color: "#2b7fff",
    fontWeight: "900",
    textShadow: `
    0.0075em 0.0075em 0 rgba(20, 60, 120, 0.2),
    0.005em 0.005em 0 rgba(20, 60, 120, 0.3),
    0.01em 0.01em 0 rgba(20, 60, 120, 0.4),
    0.015em 0.015em 0 rgba(20, 60, 120, 0.5),
    0.02em 0.02em 0 rgba(20, 60, 120, 0.6),
    0.025em 0.025em 0 rgba(20, 60, 120, 0.7),
    0.03em 0.03em 0 rgba(20, 60, 120, 0.8),
    0.035em 0.035em 0 rgba(20, 60, 120, 0.9)
  `,
  };
  // devide province into 4 rows
  const firstRow = provinces.slice(0, 10);
  const secondRow = provinces.slice(10, 20);
  const thirdRow = provinces.slice(20, 30);
  const fourthRow = provinces.slice(30, 38);

  return (
    <div
      className=" lg:h-max h-99 flex flex-col mt-20 text-blue-500 relative z-30  backdrop-blur bg-white/60 border border-white/20 rounded-xl shadow-lg p-6 "
      // style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <ShineBorder
        borderWidth={2.5}
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      />
      <div className="flex justify-between items-center mb-5">
        <SparklesText>
          <h5
            className=" mt-2 lg:text-4xl md:text-3xl text-2xl mb-5 "
            style={threed}
          >
            38 Provinsi Yang Ads Di Indonesia
          </h5>
        </SparklesText>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="text"
            placeholder="Cari Provinsi"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Button type="submit" variant="outline" className="cursor-pointer">
            Cari
          </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-auto flex-wrap justify-center province realtive z-80 ">
        <Marquee pauseOnHover className="[--duration:45s]">
          {firstRow.map((province, index) => (
            <div
              key={index}
              className={`w-max h-max bg-white text-gray-800  cursor-pointer py-3 px-6 rounded-sm 
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-transform duration-200 ease-in-out ${
            isMatch(province)
              ? "opacity-100 font-bold"
              : "opacity-50 font-semibold"
          } `}
            >
              <div className="img"></div>
              <div className="title">{province}</div>
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {secondRow.map((province, index) => (
            <div
              key={index}
              className={`w-max h-max bg-white text-gray-800  cursor-pointer py-3 px-6 rounded-sm 
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-transform duration-200 ease-in-out ${
            isMatch(province)
              ? "opacity-100 font-bold"
              : "opacity-50 font-semibold"
          } `}
            >
              <div className="img"></div>
              <div className="title">{province}</div>
            </div>
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:45s]">
          {thirdRow.map((province, index) => (
            <div
              key={index}
              className={`w-max h-max bg-white text-gray-800  cursor-pointer py-3 px-6 rounded-sm 
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-transform duration-200 ease-in-out ${
            isMatch(province)
              ? "opacity-100 font-bold"
              : "opacity-50 font-semibold"
          } `}
            >
              <div className="img"></div>
              <div className="title">{province}</div>
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {fourthRow.map((province, index) => (
            <div
              key={index}
              className={`w-max h-max bg-white text-gray-800  cursor-pointer py-3 px-6 rounded-sm 
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-transform duration-200 ease-in-out ${
            isMatch(province)
              ? "opacity-100 font-bold"
              : "opacity-50 font-semibold"
          } `}
            >
              <div className="img"></div>
              <div className="title">{province}</div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
