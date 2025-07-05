// "use client";

export default function Button({ children, value, onclick, selected }) {
  console.log("Button clicked with value:", selected);
  return (
    <button
      className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
      onClick={onclick}
    >
      {children}
    </button>
  );
}
