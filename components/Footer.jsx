// components/Footer.js
"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);
  return (
    <footer id="footer" className="  text-gray-700 py-8 mt-12 border-t">
      <div className=" justify-center max-w-6xl mx-auto px-4 grid grid-cols-1  gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-center">Budayaku.id</h2>
          <p className="text-sm text-center">
            Platform edukasi interaktif untuk anak-anak Indonesia, belajar
            sambil bermain dan berbudaya Berbasis AI.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {date} Budayaku.id . Semua hak dilindungi.
      </div>
    </footer>
  );
}
