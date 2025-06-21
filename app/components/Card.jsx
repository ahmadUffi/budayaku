import Image from "next/image";

export default function Card({ image = "", title = "", description = "" }) {
  return (
    <div className="cursor-pointer max-w-xs max-h-2xl h-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:rotate-1">
      <Image
        src={image}
        alt="Card Image"
        className="w-full h-53 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
        <p className="text-gray-700 mb-4 text-justify">{description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Aku Mau Coba Ini
        </button>
      </div>
    </div>
  );
}
