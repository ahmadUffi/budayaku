import RenderThree from "@/app/components/RenderThree";
import Section from "../Section";

export default function OverviewIndonesia() {
  const aboutIndonesia = {
    title: "Indonesia",
    desc: `Indonesia adalah negara kepulauan terbesar di dunia yang terdiri dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu negara paling majemuk dan kaya budaya di dunia.`,
    gambar3d: "/ui/petaIndonesia.glb",
  };
  return (
    <Section
      reverse={true}
      desc={aboutIndonesia.desc}
      title={aboutIndonesia.title}
      gambar3d={aboutIndonesia.gambar3d}
    />
  );
}
