import RenderThree from "../components/RenderThree";
import Hero from "./componets/Hero";
import Province from "./componets/Province";

export default function Page() {
  return (
    <div className="relative z-20">
      <Hero />
      <div
        className="grid md:grid-cols-2 mt-5 items-center overview-indonesia relative z-40 shadow-blur-blue"
        id="shadow-blur"
      >
        <div className="threed relative z-30">
          <RenderThree
            glb="/ui/petaindonesia.glb"
            scale={0.2}
            rt={30}
            rz={-0.6}
            shadow={true}
            height="400px"
            scaleShadow={6}
            opacityShadow={0.2}
            positionShadow={-1}
          />
        </div>
        <div className="text-black flex flex-col items-center p-20 relative z-30 ">
          <h1 className="text-katulistiwa font-bold tracking-widest md:text-6xl uppercase text-3xl">
            Inodenssia
          </h1>
          <p className="text-justify opacity-85 mt-5">
            Indonesia adalah negara kepulauan terbesar di dunia yang terdiri
            dari 38 provinsi dan sekitar 17.000 pulau yang membentang dari
            Sabang hingga Merauke. Kekayaan budayanya tercermin dari keberadaan
            lebih dari 1.300 suku bangsa dan penggunaan lebih dari 700 bahasa
            daerah. Keberagaman ini menjadikan Indonesia sebagai salah satu
            negara paling majemuk dan kaya budaya di dunia.
          </p>
        </div>
      </div>
      <Province />
    </div>
  );
}
