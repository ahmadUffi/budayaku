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
          <p className="text-justify opacity-85">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            officia non nam veritatis corrupti alias suscipit consequuntur
            aperiam esse voluptate nulla dolorum sit consectetur illum possimus,
            iste voluptatibus, quisquam eveniet.
          </p>
        </div>
      </div>
      <Province />
    </div>
  );
}
