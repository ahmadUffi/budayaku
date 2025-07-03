"use client";
import { useEffect, useRef, useState } from "react";
import RenderThree from "../components/RenderThree";

export default function FloatChat() {
  const [chat, setChat] = useState([
    { from: "bot", text: "Hai! Ada yang bisa saya bantu?" },
  ]);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSend = () => {
    if (message.trim() === "") return;

    // Tambahkan pesan user
    setChat([...chat, { from: "user", text: message }]);
    setMessage("");

    // Simulasi respons bot
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "Terima kasih atas pesanmu!" },
      ]);
    }, 800);
  };

  const squareStyle = {
    width: isMobile ? "93vw" : "500px",
    height: "80dvh",
    // backgroundColor: "white",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const circleStyle = {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    border: "2px solid rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "24px",
  };

  return (
    <div className="realtive  bg-white/30 backdrop-blur chat fixed bottom-6 right-3 z-50 flex flex-col items-end font-sans">
      <div
        onClick={() => {
          if (!isActive) setIsActive(true);
        }}
        style={isActive ? squareStyle : circleStyle}
        className="shadow-lg transition-all duration-300"
      >
        {!isActive ? (
          "💬"
        ) : (
          <>
            {/* Chat List */}
            <div className="flex-1 relative p-4 overflow-y-auto space-y-2">
              <div
                className="sticky top-0 left-0 mb-3 cursor-pointer close text-sm text-black font bold p-2 w-8 h-8 flex justify-center items-center font-bold rounded-full bg-white shadow-md"
                onClick={() => {
                  if (isActive) setIsActive(false);
                }}
              >
                ❌
              </div>
              <RenderThree
                glb={"/ui/maskotfix.glb"}
                scale={0.8}
                py={-0.2}
                rt={0}
                scaleShadow={5}
                opacityShadow={0.1}
                positionShadow={-1.6}
                height="100%"
                classname="sticky -z-10 top-0 left-0 "
              />
              <div className="flex flex-col gap-5">
                {chat.map((c, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                      c.from === "user"
                        ? "bg-white text-black self-end ml-auto"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    {c.text}
                  </div>
                ))}
                <div className="" ref={ref}></div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t bg-white border-gray-300 p-2 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik pesan..."
                className="text-black flex-1 p-2 border rounded-md text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Kirim
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
