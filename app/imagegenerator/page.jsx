"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/public/images/logo.png";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { ApiService } from "@/service/api"; // pastikan path-nya sesuai
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import ButtonLink from "@/components/ButtonLink";

const provinsiIndonesia = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Bangka Belitung",
  "Kepulauan Riau",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "NTB",
  "NTT",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
];

export default function ImageGenerator() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [province, setProvince] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorSize, setErrorSize] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const mapped = provinsiIndonesia.map((prov) => ({
      label: prov,
      value: prov,
    }));
    setOptions(mapped);
  }, []);

  const handleImageChange = (e) => {
    const maxSize = 5 * 1024 * 1024;
    const file = e.target.files[0];

    if (file) {
      if (file.size > maxSize) {
        setErrorSize("Ukuran gambar tidak boleh lebih dari 5 MB.");
        setImage(null);
        setPreview(null);
        return;
      }

      setErrorSize("");
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1]; // ambil isi setelah "data:image/...;base64,"
        setUploadedImage({ base64, name: file.name });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !province) {
      setError(
        !image && !province
          ? "Upload Gambar dan Pilih Provinsi dulu yahh"
          : !image
          ? "Upload Gambar Keren mu dulu yahh"
          : "Pilih Provinsi mu dulu yahh"
      );
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await ApiService.generateImageFromTextAndImage({
        image_base64: uploadedImage.base64,
        province,
      });

      if (response && response.image_base64) {
        setResult(response.image_base64);
      } else {
        setError("Gagal menerima gambar dari server.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonLink />
      <div className="relative z-10 shadow-solid-red shadow-solid-blue  min-h-screen  flex items-center justify-center p-6">
        <Card className="relative z-20 w-full max-w-6xl backdrop-blur-xl bg-white/50 border border-white/30 shadow-2xl rounded-3xl p-8">
          <CardContent>
            <h1 className="lg:text-4xl md:text-2xl text-xl font-extrabold text-center text-blue-800 drop-shadow-sm mb-8">
              Yuk Lihat Dirimu di Berbagai kebudayaan
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hasil Gambar */}
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                  Hasil Gambar:
                </h2>
                {result ? (
                  <div className="">
                    <ScratchToReveal
                      width={300}
                      height={300}
                      minScratchPercentage={70}
                      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
                      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
                    >
                      <img
                        src={`data:image/jpeg;base64,${result}`}
                        alt="Generated Result"
                        className="object-cover"
                      />
                    </ScratchToReveal>
                  </div>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl bg-white/60 text-gray-500 text-center font-medium">
                    Belum ada hasil
                  </div>
                )}
              </div>

              {/* Form Upload */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-inner"
              >
                {/* Upload Gambar */}
                <div className="overflow-hidden">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Upload Foto Anda
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                  />
                  {errorSize && (
                    <p className="mt-2 text-sm text-red-600 font-medium">
                      {errorSize}
                    </p>
                  )}
                  {preview && (
                    <Image
                      src={preview}
                      width={100}
                      height={100}
                      alt="Preview"
                      className="mt-4 rounded-xl h-34 w-34 object-cover border border-gray-300 shadow"
                    />
                  )}
                </div>

                {/* Pilih Provinsi */}
                <div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full h-10 justify-between border-blue-400"
                      >
                        {value
                          ? options.find((e) => e.value === value)?.label
                          : `Pilih Provinsi...`}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search Provinsi...`}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Nama Provinsi Tidak Ada</CommandEmpty>
                          <CommandGroup>
                            {options.map((e) => (
                              <CommandItem
                                key={e.value}
                                value={e.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue);
                                  setProvince(currentValue);
                                  setOpen(false);
                                }}
                              >
                                {e.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === e.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-600 font-semibold">{error}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Menghasilkan..." : "Kirim & Generate"}
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
