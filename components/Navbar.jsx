import Image from "next/image";
import logo from "@/public/images/logo.png";

export default function Navbar() {
  return (
    <nav>
      <div className=" bg-white/30 border border-white/30 backdrop-blur-sm fixed top-0 left-0 right-0 z-90 p-3">
        <div className="logo w-[60px] h-[60px} rounded-full overflow-hidden">
          <Image src={logo} alt="logo" />
        </div>
      </div>
    </nav>
  );
}
