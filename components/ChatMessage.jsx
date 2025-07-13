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

          {!isUser && onPlayAudio && (
            <button
              onClick={handlePlayAudio}
              disabled={isLoadingAudio}
              className={`ml-1 p-1 rounded-full transition-colors flex-shrink-0
                ${
                  isPlayingAudio
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                }`}
              title={isPlayingAudio ? "Stop audio" : "Play audio"}
            >
              {isLoadingAudio ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : isPlayingAudio ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
