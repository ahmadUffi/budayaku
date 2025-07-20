"use client";

import logo from "@/public/images/logo.png";
import { Input } from "@/components/ui/input";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import mainbg from "@/public/images/bg-color.png";
import ButtonLink from "@/components/ButtonLink";
import { ApiService } from "@/service/api";

export default function AnimatedListS(className) {
  const [selected, setSelected] = useState("");
  const [ListPorivinces, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await ApiService.getAllDatas();
      setDatas(data);
    };

    getData();
  }, []);

  console.log(ListPorivinces);

  const list = ListPorivinces.filter((list) =>
    list.nama_provinsi.toLowerCase().includes(selected.toLowerCase())
  );
  return (
    <div
      style={{
        backgroundImage: `url(${mainbg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-[100vh] flex flex-col "
    >
      <ButtonLink href="/" />
      <div className="p-2 md:p-10 mt-10 text-blue-500 flex flex-col justify-center items-center mb-5 flex-wrap">
        <SparklesText>
          <h5 className=" mt-2 lg:text-4xl md:text-3xl text-2xl mb-5 text-center">
            38 Provinsi Yang Ads Di Indonesia
          </h5>
        </SparklesText>

        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            className={"bg-white shadow"}
            type="text"
            placeholder="Cari Provinsi"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap gap-7 justify-center">
          {list.map((list, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.05} inView>
              <Link href={`/membaca/${list.slug}`}>
                <Card title={list.nama_provinsi} image={list.url_image} />
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}
