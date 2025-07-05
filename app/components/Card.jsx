import Image from "next/image";

export default function Card({ image = "", title = "", description = "" }) {
  return (
    <div className="relative cursor-pointer w-xs max-h-2xl h-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transform transition duration-500">
      <Image
        src={image}
        alt="Card Image"
        className="w-full h-53 object-cover relative"
      />

      {/* Overlay Gradient + Text */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent text-white">
        <h3 className="text-base font-bold leading-tight drop-shadow-sm">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-light leading-snug drop-shadow-sm mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
