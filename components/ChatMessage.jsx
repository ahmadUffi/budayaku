import React from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
const ChatMessage = ({
  message,
  isUser,
  onPlayAudio,
  isPlayingAudio = false,
  isLoadingAudio = false,
}) => {
  const handlePlayAudio = () => {
    if (onPlayAudio) {
      onPlayAudio();
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end " : "justify-start"} mb-4`}>
      <div
        className={` ${
          isUser ? "bg-blue-600 text-white" : "bg-white"
        } max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-md transition-all duration-300 text-sm whitespace-pre-wrap break-words
          `}
      >
        <div className="flex items-start gap-2">
          {!isUser ? (
            <TypingAnimation
              duration={85}
              startOnView={true}
              className="flex-1 text-sm font-normal"
            >
              {message}
            </TypingAnimation>
          ) : (
            <p className="flex-1">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
