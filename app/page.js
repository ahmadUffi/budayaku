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
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize audio element with proper settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = 'auto';
      audioRef.current.volume = 1.0;

      // Add error handling for audio
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
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      text: inputText,
      isUser: true,
      id: Date.now().toString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
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
      };

      setMessages(prev => [...prev, botMessage]);

      // Tunggu DOM update selesai, lalu putar audio
      setTimeout(() => {
        autoPlayLastBotMessage(botMessage);
      }, 100);
    } catch (error) {
      console.error('Error generating text:', error);
      const errorMessage = {
        text: 'Maaf, terjadi kesalahan saat memproses pesan Anda.',
        isUser: false,
        id: (Date.now() + 1).toString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const autoPlayLastBotMessage = async (botMessage) => {
    if (!botMessage || !botMessage.text) return;

    // Skip jika teks terlalu pendek
    if (botMessage.text.length < 5) {
      console.log("Text too short for audio generation");
      return;
    }

    await handlePlayAudio(botMessage.text, botMessage.id);
  };

  const handlePlayAudio = async (text, messageId) => {
    if (playingAudioId === messageId) {
      // Jika audio yang sama sedang diputar, stop
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAudioId(null);
      }
      return;
    }

    try {
      setAudioLoading(true);
      setPlayingAudioId(messageId);

      // Stop audio yang sedang diputar
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

        // Setup event handlers
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

        // Play audio
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

      // Show user-friendly error
      alert("Gagal memutar audio. Silakan coba lagi.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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

          {/* Chat Messages */}
          <div className="chat-container">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>Mulai percakapan dengan mengirim pesan!</p>
                <p className="text-sm mt-2">Audio akan diputar otomatis untuk setiap respons bot</p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                onPlayAudio={
                  !message.isUser
                    ? () => handlePlayAudio(message.text, message.id)
                    : undefined
                }
                isPlayingAudio={playingAudioId === message.id}
                isLoadingAudio={audioLoading && playingAudioId === message.id}
              />
            ))}

            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 rounded-lg px-4 py-2">
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda di sini..."
                className="flex-1 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className={`px-4 py-2 text-white rounded-md font-medium transition-colors ${isLoading || !inputText.trim()
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {/* Audio Status Indicator */}
            {audioLoading && (
              <div className="mt-2 text-sm text-blue-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Memuat audio...
              </div>
            )}
          </div>
        </div>

        {/* Audio Element - dengan controls untuk debugging */}
        <audio
          ref={audioRef}
          controls={process.env.NODE_ENV === 'development'} // Show controls in development
          className={process.env.NODE_ENV === 'development' ? 'mt-4' : 'hidden'}
          preload="auto"
        />
      </div>
    </div>
  );
}