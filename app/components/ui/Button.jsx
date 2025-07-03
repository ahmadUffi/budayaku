// "use client";

export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
      {...props}
    >
      {children}
    </button>
  );
}
