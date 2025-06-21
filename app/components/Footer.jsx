// components/Footer.js

export default function Footer() {
  return (
    <footer className=" text-gray-700 py-8 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-xl font-bold mb-2">Nama Website</h2>
          <p className="text-sm">
            Platform edukasi interaktif untuk anak-anak Indonesia, belajar
            sambil bermain dan berbudaya.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/tentang" className="hover:underline">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/fitur" className="hover:underline">
                Fitur
              </a>
            </li>
            <li>
              <a href="/kontak" className="hover:underline">
                Kontak
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
          <ul className="flex space-x-4 text-xl">
            <li>
              <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                📘
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500"
              >
                📸
              </a>
            </li>
            <li>
              <a href="#" aria-label="YouTube" className="hover:text-red-600">
                ▶️
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Budayaku.id . Semua hak dilindungi.
      </div>
    </footer>
  );
}
