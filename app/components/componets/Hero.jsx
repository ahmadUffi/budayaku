import AvatarCircle from "@/app/components/AvatarCircle";
import Button from "@/app/components/Button";
import RenderThree from "@/app/components/RenderThree";
import mainbg from "@/public/images/bg-color.png";

export default function Hero({ className = "" }) {
  return (
    <div
      className=" h-[100dvh] overflow-hidden bg-transparent items-center bg-cover bg-center grid grid-cols-2 relative z-80 shadow-solid-red shadow-solid-blue"
      style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <div className="title  lg:py-30 lg:pl-40 p-20 flex flex-col gap-10 lg:relative z-40 absolute">
        <div className="text">
          <h2 className="md:text-3xl text-2xl text-blue-500 font-bold">
            Indonesi is Wonderfull
          </h2>
          <h1 className=" text-katulistiwa  lg:text-8xl  text-5xl text-black ">
            BUDAYAKU.ID
          </h1>
          <h2 className="text-xl text-black text-[15px] md-[text-18px]">
            Jelajahi kekayaan budaya lewat platform digital yang interaktif,
            seru, dan edukatif!
          </h2>
        </div>
        <Button animate={false} bgColorClass={"primary"}>
          Pergi Belajar
        </Button>
      </div>

      <div className=" h-full w-[100vw] lg:w-2xl relative z-30  flex justify-center items-center ">
        <RenderThree
          glb={"../ui/maskotfix.glb"}
          scale={0.8}
          rt={0}
          rz={0}
          height="100%"
          scaleShadow={9}
          opacityShadow={0.2}
          positionShadow={-2}
        />
      </div>

      <AvatarCircle position={"centerBottom"} src="" alt="" size="lg" />
    </div>
  );
}
