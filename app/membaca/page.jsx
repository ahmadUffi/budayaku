"use client";

import React from "react";
import Button from "../components/ui/Button";
import RenderThree from "../components/RenderThree";
import FloatChat from "../chat/FloatChat.";
import ModelViewer from "../components/ModelViewer";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

const Literasi = () => {
  const aboutIndonesia = [
    {
      variant: "baju adat",
      title: "Indonesia",
      desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
      gambar3d: "/ui/bajuadatpapua.glb",
    },
    {
      variant: "rumah adat",

      title: "Indonesia",
      desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
      gambar3d: "/ui/rumahadatpapua.glb",
    },
    {
      variant: "alat musik",
      title: "Indonesia",
      desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
      gambar3d: "/ui/alatmusikpapua.glb",
    },
  ];
  const [selected, setSelected] = React.useState("baju adat");

  const filterdata = aboutIndonesia.filter((data) => data.variant === selected);

  return (
    <div className="flex justify-center items-center h-screen w-screen relative z-20">
      <NeonGradientCard>
        <div className="shadow-solid-red shadow-solid-blue relative overflow-hidden bg-white/30 z-10 backdrop-blur-md py-8 px-20 rounded-xl border-grey inset-shadow-xl w-[95vw] h-[90vh]">
          <div className="button flex gap-3 justify-center relative z-20 mb-5">
            <Button onclick={() => setSelected("baju adat")}>Baju adat</Button>
            <Button onclick={() => setSelected("rumah adat")}>
              Rumah Adat
            </Button>
            <Button
              onclick={() => setSelected("alat musik")}
              selected={selected}
            >
              Alat Musik
            </Button>
          </div>
          <div className="relative z-20 content grid lg:grid-cols-2 gap-10 items-center h-full w-full">
            <div className="relative gambar-3d overflow-hidden h-[50vh] ">
              <ModelViewer
                src={filterdata[0].gambar3d}
                width="600px"
                height="300px"
                alt="My 3D Object"
              />
            </div>
            <div className="text-black  ">
              <h3 className="text-3xl text-center text-katulistiwa mb-7 font">
                Daerah Provinsi Papua
              </h3>
              <p className="text-justify text-md leading-6">
                {filterdata[0].desc}
              </p>
            </div>
          </div>
        </div>
      </NeonGradientCard>
      <FloatChat />
    </div>
  );
};

export default Literasi;
