import React from 'react';

const ChatMessage = ({
    message,
    isUser,
    onPlayAudio,
    isPlayingAudio = false,
    isLoadingAudio = false,
    messageType = 'text'
}) => {
    const handlePlayAudio = () => {
        if (onPlayAudio) {
            onPlayAudio();
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
                    ? messageType === 'image'
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-600 text-white'
                    : messageType === 'image'
                        ? 'bg-purple-50 text-purple-900'
                        : 'bg-gray-200 text-gray-900'
                }`}>
                <div className="flex items-start justify-between">
                    <p className="text-sm whitespace-pre-wrap break-words flex-1">
                        {message}
                    </p>

                    {/* Audio button for bot messages (text only) */}
                    {!isUser && onPlayAudio && messageType === 'text' && (
                        <button
                            onClick={handlePlayAudio}
                            disabled={isLoadingAudio}
                            className={`ml-2 p-1 rounded-full transition-colors flex-shrink-0 ${isPlayingAudio
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                                }`}
                            title={isPlayingAudio ? 'Stop audio' : 'Play audio'}
                        >
                            {isLoadingAudio ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            ) : isPlayingAudio ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>

                {/* Message type indicator for user messages */}
                {isUser && (
                    <div className="text-xs opacity-75 mt-1">
                        {messageType === 'image' ? '🖼️ Generate Gambar' : '💬 Chat Teks'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;