import AvatarCircle from "@/app/components/AvatarCircle";
import Button from "@/app/components/Button";
import RenderThree from "@/app/components/RenderThree";
import mainbg from "@/public/images/bg-color.png";

export default function Hero() {
  return (
    <div
      className="h-[100dvh] items-center bg-cover bg-center grid md:grid-cols-2 relative z-80 shadow-solid-red shadow-solid-blue"
      // style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <div className="title lg:py-30 pl-40 flex flex-col gap-10 relative z-40">
        <div className="text">
          <h2 className="text-3xl text-green-400 font-bold">
            Indonesi is Wonderfull
          </h2>
          <h1 className="text-katulistiwa  text-8xl text-black ">
            BUDAYAKU.ID
          </h1>
          <h2 className="text-xl text-black">
            Jelajahi kekayaan budaya lewat platform digital yang interaktif,
            seru, dan edukatif!
          </h2>
        </div>
        <Button animate={false} bgColorClass={"primary"}>
          Pergi Belajar
        </Button>
      </div>

      <div className="images h-full md:mt-[-10px] relative z-30">
        <RenderThree
          glb={"/ui/hero.glb"}
          scale={1.7}
          py={-1.5}
          rt={12}
          scaleShadow={5}
          opacityShadow={0.1}
          positionShadow={-1.6}
        />
      </div>

      <AvatarCircle position={"centerBottom"} src="" alt="" size="lg" />
    </div>
  );
}
