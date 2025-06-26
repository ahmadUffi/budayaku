'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import ProvinceSelector from '../components/ProvinceSelector';
import { ApiService } from '../services/api';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('DKI Jakarta');
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [chatMode, setChatMode] = useState('text');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = 'auto';
      audioRef.current.volume = 1.0;

      audioRef.current.onerror = (e) => {
        console.error("Audio playback error:", e);
        setPlayingAudioId(null);
        setAudioLoading(false);
      };

      audioRef.current.onloadeddata = () => {
        console.log("Audio loaded, duration:", audioRef.current.duration);
      };
    }
  }, []);

  const generateChatHistory = () => {
    const history = [];
    for (let i = 0; i < messages.length; i += 2) {
      if (messages[i] && messages[i + 1]) {
        history.push({
          user: messages[i].text,
          bot: messages[i + 1].text,
        });
      }
    }
    return history;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || isGeneratingImage) return;

    const userMessage = {
      text: inputText,
      isUser: true,
      id: Date.now().toString(),
      type: chatMode,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    if (chatMode === 'text') {
      setIsLoading(true);
      try {
        const history = generateChatHistory();
        const response = await ApiService.generateText({
          history,
          province: selectedProvince,
          new_chat: inputText,
        });

        const botMessage = {
          text: response.response,
          isUser: false,
          id: (Date.now() + 1).toString(),
          type: 'text',
        };

        setMessages(prev => [...prev, botMessage]);

        setTimeout(() => {
          autoPlayLastBotMessage(botMessage);
        }, 100);
      } catch (error) {
        console.error('Error generating text:', error);
        const errorMessage = {
          text: 'Maaf, terjadi kesalahan saat memproses pesan Anda.',
          isUser: false,
          id: (Date.now() + 1).toString(),
          type: 'text',
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    } else if (chatMode === 'image') {
      setIsGeneratingImage(true);
      try {
        const response = await ApiService.generateImage({
          prompt: inputText,
          province: selectedProvince,
        });

        const botMessage = {
          text: response.description || 'Gambar berhasil dibuat!',
          isUser: false,
          id: (Date.now() + 1).toString(),
          type: 'image',
          imageBase64: response.image_base64,
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error generating image:', error);
        const errorMessage = {
          text: 'Maaf, terjadi kesalahan saat membuat gambar. Pastikan permintaan Anda berkaitan dengan budaya Indonesia.',
          isUser: false,
          id: (Date.now() + 1).toString(),
          type: 'text',
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsGeneratingImage(false);
      }
    }
  };

  const autoPlayLastBotMessage = async (botMessage) => {
    if (!botMessage || !botMessage.text || botMessage.type === 'image') return;

    if (botMessage.text.length < 5) {
      console.log("Text too short for audio generation");
      return;
    }

    await handlePlayAudio(botMessage.text, botMessage.id);
  };

  const handlePlayAudio = async (text, messageId) => {
    if (playingAudioId === messageId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAudioId(null);
      }
      return;
    }

    try {
      setAudioLoading(true);
      setPlayingAudioId(messageId);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      console.log("Generating audio for text:", text.substring(0, 50) + "...");

      const audioBlob = await ApiService.generateAudio({ text });

      if (audioBlob.size === 0) {
        throw new Error("Audio blob is empty");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("Audio URL created:", audioUrl);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;

        audioRef.current.onended = () => {
          console.log("Audio playback ended");
          setPlayingAudioId(null);
          setAudioLoading(false);
          URL.revokeObjectURL(audioUrl);
        };

        audioRef.current.oncanplaythrough = () => {
          console.log("Audio can play through");
          setAudioLoading(false);
        };

        audioRef.current.onerror = (e) => {
          console.error("Audio error:", e);
          setPlayingAudioId(null);
          setAudioLoading(false);
          URL.revokeObjectURL(audioUrl);
        };

        try {
          await audioRef.current.play();
          console.log("Audio started playing");
        } catch (playError) {
          console.error("Play error:", playError);
          throw playError;
        }
      } else {
        throw new Error("Audio ref not available");
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setPlayingAudioId(null);
      setAudioLoading(false);

      alert("Gagal memutar audio. Silakan coba lagi.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleModeChange = (mode) => {
    setChatMode(mode);
    setIsLoading(false);
    setIsGeneratingImage(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Budayaku Chat</h1>
            <p className="text-blue-100">Chat dengan AI tentang budaya Indonesia</p>
          </div>

          {/* Province Selector */}
          <div className="p-4 border-b">
            <ProvinceSelector
              selectedProvince={selectedProvince}
              onProvinceChange={setSelectedProvince}
            />
          </div>

          {/* Mode Selector */}
          <div className="p-4 border-b">
            <div className="flex space-x-2">
              <button
                onClick={() => handleModeChange('text')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${chatMode === 'text'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Chat Teks</span>
              </button>
              <button
                onClick={() => handleModeChange('image')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${chatMode === 'image'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Generate Gambar</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {chatMode === 'text'
                ? 'Mode chat teks dengan audio otomatis'
                : 'Mode generate gambar budaya Indonesia'
              }
            </p>
          </div>

          {/* Chat Messages */}
          <div className="chat-container">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>
                  {chatMode === 'text'
                    ? 'Mulai percakapan dengan mengirim pesan!'
                    : 'Deskripsikan gambar budaya Indonesia yang ingin dibuat!'
                  }
                </p>
                <p className="text-sm mt-2">
                  {chatMode === 'text'
                    ? 'Audio akan diputar otomatis untuk setiap respons bot'
                    : 'Contoh: "Gambar tari kecak di Bali" atau "Batik motif Jogja"'
                  }
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                {message.type === 'image' && !message.isUser ? (
                  <div className="flex justify-start mb-4">
                    <div className="bg-purple-50 rounded-lg p-4 max-w-md">
                      {message.imageBase64 && (
                        <div className="mb-3">
                          <img
                            src={`data:image/png;base64,${message.imageBase64}`}
                            alt="Generated image"
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      )}
                      <p className="text-sm text-purple-800">{message.text}</p>
                    </div>
                  </div>
                ) : (
                  <ChatMessage
                    message={message.text}
                    isUser={message.isUser}
                    onPlayAudio={
                      !message.isUser && message.type !== 'image'
                        ? () => handlePlayAudio(message.text, message.id)
                        : undefined
                    }
                    isPlayingAudio={playingAudioId === message.id}
                    isLoadingAudio={audioLoading && playingAudioId === message.id}
                    messageType={message.type}
                  />
                )}
              </div>
            ))}

            {(isLoading || isGeneratingImage) && (
              <div className="flex justify-start mb-4">
                <div className={`rounded-lg px-4 py-2 ${isGeneratingImage ? 'bg-purple-200' : 'bg-gray-200'}`}>
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                  <p className="text-xs mt-2 text-gray-600">
                    {isGeneratingImage ? 'Membuat gambar...' : 'Mengetik...'}
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${chatMode === 'image' ? 'bg-purple-50' : 'bg-white'}`}>
            <div className="flex space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  chatMode === 'text'
                    ? 'Ketik pesan Anda di sini...'
                    : 'Deskripsikan gambar budaya Indonesia yang ingin dibuat...'
                }
                className="flex-1 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={2}
                disabled={isLoading || isGeneratingImage}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || isGeneratingImage || !inputText.trim()}
                className={`px-4 py-2 text-white rounded-md font-medium transition-colors ${isLoading || isGeneratingImage || !inputText.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : chatMode === 'image'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isLoading
                  ? 'Sending...'
                  : isGeneratingImage
                    ? 'Creating...'
                    : chatMode === 'image'
                      ? 'Generate'
                      : 'Send'
                }
              </button>
            </div>

            {/* Status Indicators */}
            {audioLoading && (
              <div className="mt-2 text-sm text-blue-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Memuat audio...
              </div>
            )}

            {isGeneratingImage && (
              <div className="mt-2 text-sm text-purple-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                Membuat gambar... (ini mungkin memakan waktu beberapa detik)
              </div>
            )}
          </div>
        </div>

        {/* Audio Element - dengan controls untuk debugging */}
        <audio
          ref={audioRef}
          controls={process.env.NODE_ENV === 'development'}
          className={process.env.NODE_ENV === 'development' ? 'mt-4' : 'hidden'}
          preload="auto"
        />
      </div>
    </div>
  );
}