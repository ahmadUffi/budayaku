import FloatChat from "../chat/FloatChat.";
import Hero from "../components/componets/Hero";
import OverviewIndonesia from "../components/componets/OverviewIndonesia";
import PilihanBelajar from "../components/componets/PilihanBelajar";
import Province from "../components/componets/Province";
import Footer from "../components/Footer";

export default function HomePage() {
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
