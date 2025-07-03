"use client";

import React, { useState } from "react";
// import Button from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export default function ImageGenerator() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate image generation delay
    setTimeout(() => {
      setResult("/example-result.jpg"); // Replace with actual API response
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-yellow-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl backdrop-blur-md bg-white/40 shadow-xl rounded-2xl p-6">
        <CardContent>
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            AI Lahan Generator
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hasil Gambar */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                Hasil Gambar:
              </h2>
              {result ? (
                <img
                  src={result}
                  alt="Generated Result"
                  className="rounded-xl w-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-400 rounded-xl bg-white/50 text-gray-500">
                  Belum ada hasil
                </div>
              )}
            </div>

            {/* Form Upload & Provinsi */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Upload Foto Anda
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white/60 border border-gray-300 rounded-xl p-2 shadow-sm w-full"
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 rounded-xl max-h-64 w-full object-cover border border-gray-300"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Pilih Provinsi
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="bg-white/60 border border-gray-300 rounded-xl p-2 shadow-sm w-full"
                  required
                >
                  <option value="">-- Pilih Provinsi --</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="Sumatera Utara">Sumatera Utara</option>
                  <option value="Bali">Bali</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="mt-4 w-full">
                {loading ? "Menghasilkan..." : "Kirim & Generate"}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
