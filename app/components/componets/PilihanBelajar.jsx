import Image from "next/image";
import membaca from "@/public/images/membaca.jpeg";
import berbicara from "@/public/images/berbicara.jpeg";
import Card from "@/app/components/Card";

export default function PilihanBelajar() {
  const listPilihan = [
    {
      judul: "Membca Sambil Bertanya",
      desk: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore soluta in labore doloribus consequatur id.",
      image: membaca,
    },
    {
      judul: "Berbicara Dengan AI",
      desk: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore soluta in labore doloribus consequatur id.",
      image: berbicara,
    },
    {
      judul: "Membca Sambil Bertanya",
      desk: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore soluta in labore doloribus consequatur id.",
      image: membaca,
    },
  ];

  const threeDEffect = {
    color: "rgb(156, 71, 18)",
    fontWeight: "900",
    textShadow: `
    0.0075em 0.0075em 0 rgba(156, 71, 18, 0.1),
    0.005em 0.005em 0 rgba(156, 71, 18, 0.2),
    0.01em 0.01em 0 rgba(156, 71, 18, 0.3),
    0.015em 0.015em 0 rgba(156, 71, 18, 0.4),
    0.02em 0.02em 0 rgba(156, 71, 18, 0.5),
  `,
  };

  return (
    <div className="">
      <h5
        className={`lg:text-4xl md:text-3xl text-2xl text-center mt-15`}
        style={threeDEffect}
      >
        Rasakan Pengalaman Belajar <br /> Yang Berbeda dengan BudiBot
      </h5>
      <p className="text-black text-center mt-4 font-bold text-lg">
        Pilih Metode Pembalajaran Yang Kamu Mau
      </p>
      <div className="pilihan flex flex-wrap mt-12 gap-8">
        {listPilihan.map((list, index) => (
          <Card
            key={index}
            title={list.judul}
            image={list.image}
            description={list.desk}
          />
        ))}
      </div>
    </div>
  );
}
