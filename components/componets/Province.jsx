"use client";

import { Marquee } from "../magicui/marquee";
import { ShineBorder } from "../magicui/shine-border";
import { SparklesText } from "../magicui/sparkles-text";
import { Input } from "../ui/input";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useEffect, useState } from "react";
import { ApiService } from "@/service/api";
import Link from "next/link";

export default function Province() {
  const [selected, setSelected] = useState("");
  const [provinces, setProvince] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await ApiService.getAllDatas();
      setProvince(data);
    };
    getData();
  }, []);

  console.log(provinces);

  const isMatch = (name) =>
    selected && name.toLowerCase().includes(selected.toLowerCase());

  const threed = {
    color: "#2b7fff",
    fontWeight: "900",
    textShadow: `0.0075em 0.0075em 0 rgba(20, 60, 120, 0.2),
      0.005em 0.005em 0 rgba(20, 60, 120, 0.3),
      0.01em 0.01em 0 rgba(20, 60, 120, 0.4),
      0.015em 0.015em 0 rgba(20, 60, 120, 0.5),
      0.02em 0.02em 0 rgba(20, 60, 120, 0.6),
      0.025em 0.025em 0 rgba(20, 60, 120, 0.7),
      0.03em 0.03em 0 rgba(20, 60, 120, 0.8),
      0.035em 0.035em 0 rgba(20, 60, 120, 0.9)`,
  };

  const rows = [
    provinces.slice(0, 10),
    provinces.slice(10, 20),
    provinces.slice(20, 30),
    provinces.slice(30, 38),
  ];

  const Card = ({ id, province }) => {
    const name = province.nama_provinsi;
    const slug = province.slug;
    const image = province.url_image;
    console.log(province);
    return (
      <Link href={`/membaca/${slug}`}>
        <div
          key={id}
          className={`w-max h-max bg-white text-gray-800 cursor-pointer py-3 px-6 rounded-sm
          shadow-[0_4px_0_#e5e7eb] border border-gray-200 
          active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
          transition-transform flex items-center duration-200 ease-in-out ${
            isMatch(name) ? "opacity-100 font-bold" : "opacity-50 font-semibold"
          }`}
        >
          <div className="flex size-12 items-center justify-center rounded-full overflow-hidden mr-2">
            <Image src={image} width={100} height={100} alt={name} />
          </div>
          <div className="title">{name}</div>
        </div>
      </Link>
    );
  };

  return (
    <div className="lg:h-max min-h-[600px] flex flex-col mt-20 text-blue-500 relative z-30 backdrop-blur bg-white/60 border border-white/20 rounded-xl shadow-lg p-6">
      <ShineBorder
        borderWidth={2.5}
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      />

      <div className="flex justify-between items-center mb-5 flex-wrap">
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
        </div>
      </div>
      <div className="flex flex-col gap-6 overflow-hidden">
        {rows.map((row, idx) => (
          <Marquee
            key={idx}
            reverse={idx % 2 !== 0}
            pauseOnHover
            className="[--duration:45s]"
          >
            {row.map((province) => (
              <Card key={province.id} id={province.id} province={province} />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}
