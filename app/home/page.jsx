import { ShineBorder } from "@/components/magicui/shine-border";
import FloatChat from "../chat/FloatChat.";
import AvatarCircle from "../components/AvatarCircle";
import Hero from "../components/componets/Hero";
import OverviewIndonesia from "../components/componets/OverviewIndonesia";
import PilihanBelajar from "../components/componets/PilihanBelajar";
import Province from "../components/componets/Province";
import Footer from "../components/Footer";
import RenderThree from "../components/RenderThree";

export default function HomePage() {
  return (
    <div className="">
      <Hero />
      <AvatarCircle position={"centerBottom"} src="" alt="" size="lg" />

      <div
        className="lg:p-25 md:p-15 p-3 relative z-90 flex flex-col gap-20"
        style={{
          // backgroundImage: `url(${mainbg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <PilihanBelajar />
        <Province />
        {/* <OverviewIndonesia /> */}
      </div>
      <Footer />
    </div>
  );
}
