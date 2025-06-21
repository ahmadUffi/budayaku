import FloatChat from "../chat/FloatChat.";
import AvatarCircle from "../components/AvatarCircle";
import Footer from "../components/Footer";
import RenderThree from "../components/RenderThree";
import Hero from "./componets/Hero";
import OverviewIndonesia from "./componets/OverviewIndonesia";
import PilihanBelajar from "./componets/PilihanBelajar";
import Province from "./componets/Province";
import mainbg from "@/public/images/bg-color.png";

export default function Page() {
  return (
    <div className="relative z-20">
      <Hero />
      <div
        className="lg:p-25 md:p-15 p-3 "
        style={{
          // backgroundImage: `url(${mainbg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <PilihanBelajar />
        <Province />
        <OverviewIndonesia />
      </div>
      <Footer />
      <FloatChat />
    </div>
  );
}
