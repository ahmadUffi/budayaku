import mainbg from "@/public/images/bg-color.png";

export default function Province() {
  const provinces = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Sumatera Selatan",
    "Bangka Belitung",
    "Bengkulu",
    "Lampung",
    "DKI Jakarta",
    "Banten",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Tengah",
    "Kalimantan Selatan",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Sulawesi Utara",
    "Gorontalo",
    "Sulawesi Tengah",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Maluku",
    "Maluku Utara",
    "Papua",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat",
    "Papua Barat Daya",
    "Papua Selatan",
  ];

  const threed = {
    color: "#2b7fff",
    fontWeight: "900",
    textShadow: `
    0.0075em 0.0075em 0 rgba(20, 60, 120, 0.2),
    0.005em 0.005em 0 rgba(20, 60, 120, 0.3),
    0.01em 0.01em 0 rgba(20, 60, 120, 0.4),
    0.015em 0.015em 0 rgba(20, 60, 120, 0.5),
    0.02em 0.02em 0 rgba(20, 60, 120, 0.6),
    0.025em 0.025em 0 rgba(20, 60, 120, 0.7),
    0.03em 0.03em 0 rgba(20, 60, 120, 0.8),
    0.035em 0.035em 0 rgba(20, 60, 120, 0.9)
  `,
  };

  return (
    <div
      className=" lg:h-max h-99 flex flex-col mt-20 text-blue-500 relative z-30  backdrop-blur bg-white/60 border border-white/20 rounded-xl shadow-lg p-6 shadow-blur-blue"
      // style={{ backgroundImage: `url(${mainbg.src})` }}
    >
      <h5
        className=" text-gray-700 mt-2 lg:text-4xl md:text-3xl text-2xl mb-5 "
        style={threed}
      >
        38 Provinsi Yang Ads Di Indonesia
      </h5>
      <div className="flex gap-3 overflow-auto flex-wrap justify-center province realtive z-80 ">
        {provinces.map((province, index) => (
          <div
            key={index}
            className="w-max h-max bg-white text-gray-800 font-semibold cursor-pointer py-3 px-6 rounded-sm 
            shadow-[0_4px_0_#e5e7eb] border border-gray-200 
            active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb] 
            transition-transform duration-200 ease-in-out "
          >
            <div className="img"></div>
            <div className="title">{province}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
