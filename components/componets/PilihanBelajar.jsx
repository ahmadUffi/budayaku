import Card from "../Card";
import membaca from "@/public/images/membaca.jpeg";
import berbicara from "@/public/images/berbicara.jpeg";
import createGambar from "@/public/images/createGambar.png";
import Link from "next/link";

export default function PilihanBelajar() {
  const listPilihan = [
    {
      judul: "Yuk belajar dengan membaca sambil berdiskusi dengan Saraswati",
      image: membaca,
      navigate: "/membaca",
    },
    {
      judul: "yuk lihat versi kamu, saat jadi menggunakan baju adat",
      image: createGambar,
      navigate: "/imagegenerator",
    },
    {
      judul: "Yuk belajaar sambil ngobrol langusng dengan saraswati",
      image: berbicara,
      navigate: "/",
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
    <div className="w-full " id="start">
      <h5
        className={`lg:text-4xl md:text-3xl text-2xl text-center mt-15`}
        style={threeDEffect}
      >
        Rasakan Pengalaman Belajar <br /> Yang Berbeda dengan BudiBot
      </h5>
      <p className="text-black text-center mt-4 font-bold text-lg">
        Pilih Metode Pembalajaran Yang Kamu Mau
      </p>
      <div className="pilihan bg-white gap-5 md:flex-nowrap flex-wrap flex flex-row w-full justify-center mt-12">
        {listPilihan.map((list, index) =>
          index != 2 ? (
            <Link key={index} href={list.navigate} aria-disabled={true}>
              <Card
                id={index}
                title={list.judul}
                image={list.image}
                description={list.desk}
              />
            </Link>
          ) : (
            <Card
              key={index}
              id={index}
              title={list.judul}
              image={list.image}
              description={list.desk}
            />
          )
        )}
      </div>
    </div>
  );
}
