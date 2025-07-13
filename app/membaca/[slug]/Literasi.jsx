"use client";

import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import FloatChat from "@/app/chat/FloatChat";
import ModelViewer from "@/components/ModelViewer";
import useResponsive from "@/hooks/useResponsive";
import { ApiService } from "@/service/api";
import ButtonLink from "@/components/ButtonLink";

const Literasi = ({ slug }) => {
  const [datas, setDatas] = useState({});

  console.log("data", slug);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Fetching for slug:", slug);
        const data = await ApiService.getDataBySlug(slug);
        console.log("Fetched data:", data);
        setDatas(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError(err.message);
      }
    };
    if (slug) {
      getData();
    }
  }, [slug]);
  const { deviceName } = useResponsive();

  const aboutIndonesia = [
    {
      variant: "baju adat",
      title: datas.nama_provinsi,
      desc: datas.pakaian_adat?.deskripsi_pakaian_adat || "",
      gambar3d: datas.pakaian_adat?.url_pakaian_adat || "",
    },
    {
      variant: "rumah adat",
      title: datas.nama_provinsi,
      desc: datas.rumah_adat?.deskripsi_rumah_adat || "",
      gambar3d: datas.rumah_adat?.url_rumah_adat || "",
    },
    {
      variant: "alat musik",
      title: datas.nama_provinsi,
      desc: datas.alat_musik?.deskripsi_alat_musik || "",
      gambar3d: datas.alat_musik?.url_alat_musik || "",
    },
  ];

  const [selected, setSelected] = React.useState("baju adat");

  const filterdata = aboutIndonesia.filter((data) => data.variant === selected);

  return (
    <>
      <div className="flex  flex-col justify-center min-h-screen w-screen relative z-20 px-3">
        <ButtonLink href="/membaca" />
        <div className="flex  flex-col shadow-solid-red overvlow-scrollbar-none overflow-x-hidden shadow-solid-blue relative overflow-y-scroll bg-white/30 z-10 backdrop-blur-md py-8 md:px-20 rounded-xl border-grey inset-shadow-xl  h-[90vh]">
          <div className="button mt-10 flex gap-3 justify-center relative z-20 mb-5">
            <Button
              className={"bg-red-500 p-2"}
              onclick={() => setSelected("baju adat")}
            >
              Baju adat
            </Button>
            <Button
              className={"p-2 "}
              onclick={() => setSelected("rumah adat")}
            >
              Rumah Adat
            </Button>
            <Button
              className={"bg-amber-700 p-2"}
              onclick={() => setSelected("alat musik")}
              selected={selected}
            >
              Alat Musik
            </Button>
          </div>
          <div className="relative h-full z-20 content grid lg:grid-cols-2 grid-cols-1 items-start lg:items-center lg:gap-20 md:gap-0 gap-20 w-full">
            <div className="relative  gambar-3d overflow-hidden h-max ">
              {filterdata[0]?.gambar3d?.trim() ? (
                <ModelViewer
                  src={filterdata[0].gambar3d}
                  width={deviceName == "mobile" ? "90vw" : "600px"}
                  height={deviceName == "mobile" ? "250px" : "450px"}
                  cameraOrbit="0deg 75deg 0"
                  alt="3D Object"
                />
              ) : (
                <div className="text-center text-gray-600 italic">
                  Gambar 3D belum tersedia
                </div>
              )}
            </div>
            <div className="text-black  -mt-20 p-5">
              <h3 className="text-3xl text-center text-katulistiwa mb-2 md:mb-7 font">
                Daerah Provinsi {filterdata[0].title}
              </h3>
              <p className="text-justify text-md leading-6">
                {/* <TextAnimate animation="slideLeft" by="character"> */}
                {filterdata[0].desc}
                {/* </TextAnimate> */}
              </p>
            </div>
          </div>
        </div>
        <FloatChat provinsi={datas.nama_provinsi} />
      </div>
    </>
  );
};

export default Literasi;
