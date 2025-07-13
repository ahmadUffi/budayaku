import Hero from "../../components/componets/Hero";
import PilihanBelajar from "../../components/componets/PilihanBelajar";
import Province from "../../components/componets/Province";
import Footer from "../../components/Footer";

export default function HomePage() {
  return (
    <div className="">
      <Hero />

      <div className="lg:p-25 md:p-15 p-3 relative z-90 flex flex-col gap-20">
        <PilihanBelajar />
        <Province />
        {/* <OverviewIndonesia /> */}
      </div>
      <Footer />
    </div>
  );
}
