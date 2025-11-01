"use client";

import { Input } from "@/components/ui/input";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import mainbg from "@/public/images/bg-color.png";
import ButtonLink from "@/components/ButtonLink";
import { ApiService } from "@/service/api";

export default function AnimatedListS(className) {
  const [selected, setSelected] = useState("");
  const [ListPorivinces, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // mulai loading
        const data = await ApiService.getAllDatas();
        setDatas(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false); // selesai loading
      }
    };

    getData();
  }, []);

  const CardGambar = ({ title, image }) => {
    return (
      <div
        className={`
        
         relative z-10 cursor-pointer min-w-[230px] w-[250px] max-w-[280px]  h-2xl bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transform transition duration-500`}
      >
        <img
          src={image}
          width={100}
          height={100}
          alt={title}
          className="w-full h-53 object-cover relative"
        />

        {/* Overlay Gradient + Text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="text-base font-bold leading-tight drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>
    );
  };

  const list = ListPorivinces.filter((list) =>
    list.nama_provinsi.toLowerCase().includes(selected.toLowerCase())
  );
  return (
    <div
      style={{
        backgroundImage: `url(${mainbg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-[100vh] flex flex-col "
    >
      <ButtonLink href="/" />
      <div className="p-2 md:p-10 mt-10 text-blue-500 flex flex-col justify-center items-center mb-5 flex-wrap">
        <SparklesText>
          <h5 className=" mt-2 lg:text-4xl md:text-3xl text-2xl mb-5 text-center">
            38 Provinsi Yang Ada Di Indonesia
          </h5>
        </SparklesText>

        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            className={"bg-white shadow"}
            type="text"
            placeholder="Cari Provinsi"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap gap-7 justify-center">
          {loading ? (
            <p className="text-gray-500 italic">
              Sedang memuat data provinsi...
            </p>
          ) : (
            list.map((list, index) => (
              <BlurFade key={index} delay={0.25 + index * 0.05} inView>
                <Link href={`/membaca/${list.slug}`}>
                  <CardGambar
                    title={list.nama_provinsi}
                    image={list.url_image}
                  />
                </Link>
              </BlurFade>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
