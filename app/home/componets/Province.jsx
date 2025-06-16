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

  return (
    <div className="flex flex-col h-screen -100 mt-[200px] text-blue-500">
      <h1 className="text-4xl font-bold mb-4">
        Selamat Datang di Halaman Provinsi
      </h1>
      <p className="text-lg text-gray-700 mt-2">
        Silakan pilih provinsi untuk melihat detail lebih lanjut.
      </p>
      <div className="flex gap-3 flex-wrap p-30 justify-around province realtive">
        {provinces.map((province, index) => (
          <div
            key={index}
            className="w-max bg-white text-gray-800 font-semibold cursor-pointer py-3 px-6 rounded-sm shadow-[0_4px_0_#e5e7eb] :translate-y-1.5 active:translate-y-1.5 active:shadow-[0_1px_0_#e5e7eb]  border border-gray-200 transition-all duration-180 "
          >
            <div className="img"></div>
            <div className="title">{province}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
