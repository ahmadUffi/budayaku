import React from "react";
import Section from "../components/Section";
import mainbg from "@/public/images/bg-color.png";
import FloatChat from "../chat/FloatChat.";

const aboutIndonesia = [
  {
    title: "Indonesia",
    desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
    gambar3d: "/ui/petaIndonesia.glb",
  },
  {
    title: "Indonesia",
    desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
    gambar3d: "/ui/hero.glb",
  },
  {
    title: "Indonesia",
    desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
    gambar3d: "/ui/petaIndonesia.glb",
  },
];

const Literasi = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${mainbg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      className="p-7 md:p-10 lg:p-15"
    >
      <FloatChat />
      {aboutIndonesia.map((e, index) => (
        <Section
          key={index}
          reverse={index % 2 === 0 ? true : false}
          desc={e.desc}
          title={e.title}
          gambar3d={e.gambar3d}
        />
      ))}
    </div>
  );
};

export default Literasi;
