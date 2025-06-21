"use client";
import { useEffect, useState } from "react";

export default function FloatChat() {
  const [chat, setChat] = useState([
    { from: "bot", text: "Hai! Ada yang bisa saya bantu?" },
  ]);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        { from: "user", text: message },
        { from: "bot", text: "Terima kasih atas pesanmu!" },
      ]);
    }, 800);
  };

  const squareStyle = {
    width: isMobile ? "95vw" : "400px",
    height: "80dvh",
    backgroundColor: "white",
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
    <div className="chat fixed bottom-6 right-3 z-50 flex flex-col items-end font-sans">
      <div
        onClick={() => setIsActive(!isActive)}
        style={isActive ? squareStyle : circleStyle}
        className="shadow-lg transition-all duration-300"
      >
        {!isActive ? (
          "💬"
        ) : (
          <>
            {/* Chat List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {chat.map((c, idx) => (
                <div
                  key={idx}
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                    c.from === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  {c.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-300 p-2 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik pesan..."
                className="flex-1 p-2 border rounded-md text-sm outline-none"
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
