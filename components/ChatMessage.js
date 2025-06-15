export default function ChatMessage({
    message,
    isUser,
    onPlayAudio,
    isPlayingAudio
}) {
    return (
        <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                    }`}
            >
                <p className="text-sm">{message}</p>
                {!isUser && onPlayAudio && (
                    <button
                        onClick={onPlayAudio}
                        disabled={isPlayingAudio}
                        className={`mt-2 px-2 py-1 text-white text-xs rounded transition-colors ${isPlayingAudio
                            ? 'bg-green-300 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        {isPlayingAudio ? '🎵 Playing...' : '🔊 Play Audio'}
                    </button>
                )}
            </div>
        </div>
    );
}