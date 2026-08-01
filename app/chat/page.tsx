'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Send, Briefcase, Download, Bot } from 'lucide-react';
import { Message } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { generateId, getImagePath } from '@/lib/utils';
import { askAnmol, warmUpSpace, ChatTurn } from '@/lib/chat-api';
import { track } from '@/lib/analytics';
import SeasonalBackground from '@/components/SeasonalBackground';
import ThemeSlider from '@/components/SeasonSlider';
import ChatMessage from '@/components/ChatMessage';
import TypingIndicator from '@/components/TypingIndicator';
import ThemeEffects from '@/components/ThemeEffects';

const SUGGESTED_PROMPTS = [
  "Tell me about your R&R Awards at Incedo",
  "What AI solutions have you built?",
  "Tell me about your AI/ML Enablement role",
  "What are your technical skills and certifications?",
];

const GREETING = "👋 Hi there, I'm Anmol Vijay Bhatia — Software Engineer focused on AI/ML Enablement at Incedo Inc.\n\n🏆 Two-time recipient of the R&R Individual Excellence Award (2024 & 2025)\n☁️ AWS Certified Cloud Practitioner\n🎓 Incoming MS in Artificial Intelligence at NJIT\n\nFeel free to ask me about my experience, projects, skills, awards, or anything you'd like to know about my professional journey!";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: GREETING,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasProcessedInitialMessage, setHasProcessedInitialMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef(false); // Prevent double processing
  const router = useRouter();
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Wake the Space as soon as the chat opens, so the first reply isn't cold.
  useEffect(() => {
    warmUpSpace();
  }, []);

  // Append the user's message, ask the Space, then append the reply (or a
  // friendly error). History is every turn so far except the opening greeting.
  const respond = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const history: ChatTurn[] = messages
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }]);
    setIsLoading(true);
    track('ai_twin_message_sent', { source: 'chat', question: trimmed, turn: history.length / 2 + 1 });

    try {
      const answer = await askAnmol(trimmed, history);
      track('ai_twin_response_received', { chars: answer.length });
      setMessages((prev) => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: answer,
        timestamp: new Date(),
      }]);
    } catch (error) {
      track('ai_twin_error', { message: error instanceof Error ? error.message : 'unknown' });
      console.error('Chat request failed:', error);
      setMessages((prev) => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: "Sorry — I couldn't reach my chat service just now. It may be waking up from sleep or briefly offline. Give it a moment and try again!",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle an initial question passed in via ?message= (from the home page).
  useEffect(() => {
    const initialMessage = searchParams.get('message');
    if (initialMessage && !hasProcessedInitialMessage && !processingRef.current) {
      processingRef.current = true;
      setHasProcessedInitialMessage(true);
      respond(initialMessage);
    }
    // Only depend on searchParams/flag to avoid re-processing on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, hasProcessedInitialMessage]);

  const handleSendMessage = (content: string = input) => {
    if (!content.trim() || isLoading) return;
    if (content === input) setInput('');
    respond(content);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative">
      <SeasonalBackground />
      <ThemeEffects />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${theme.colors.background}40`,
          borderColor: `${theme.colors.border}40`,
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-4 min-w-0"
          >
            <div
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
              style={{
                borderColor: theme.colors.primary,
              }}
            >
              <Image
                src={getImagePath("/portfolio.png")}
                alt="Anmol Vijay Bhatia"
                width={48}
                height={48}
                className="object-contain w-full h-full scale-110"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className="text-lg sm:text-xl font-bold whitespace-nowrap"
                  style={{ color: theme.colors.foreground }}
                >
                  Anmol's AI Twin
                </h1>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex-shrink-0"
                  style={{
                    background: `${theme.colors.primary}22`,
                    color: theme.colors.primary,
                    border: `1px solid ${theme.colors.primary}55`,
                  }}
                >
                  <Bot className="w-3 h-3" />
                  AI
                </span>
              </div>
              <p
                className="hidden sm:block text-sm"
                style={{
                  color: theme.colors.foreground,
                  opacity: 0.85
                }}
              >
                An AI trained on Anmol's real background
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden md:block">
              <ThemeSlider />
            </div>

            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full text-white font-medium shadow-lg flex-shrink-0 whitespace-nowrap"
              style={{ background: theme.buttonGradient }}
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${theme.colors.primary}40` }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to Portfolio"
            >
              <Briefcase className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="pt-20 sm:pt-24 pb-28 sm:pb-32 px-3 sm:px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-6">
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 mt-6 sm:mt-8"
            >
              {SUGGESTED_PROMPTS.map((prompt) => (
                <motion.button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="p-4 rounded-xl text-left text-sm backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: theme.colors.cardBg,
                    borderColor: theme.colors.border,
                    borderWidth: 1,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ color: theme.colors.foreground }}>{prompt}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Input Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 backdrop-blur-md border-t z-40"
        style={{
          backgroundColor: `${theme.colors.background}60`,
          borderColor: `${theme.colors.border}40`,
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything…"
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-full backdrop-blur-sm shadow-lg outline-none transition-all text-base"
              style={{
                background: theme.colors.cardBg,
                borderColor: theme.colors.border,
                borderWidth: 2,
                color: theme.colors.foreground,
              }}
              disabled={isLoading}
            />
          </div>

          <motion.button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>

          <motion.a
            href={getImagePath("/resume.pdf")}
            download="Anmol_Bhatia_Resume.pdf"
            onClick={() => track('resume_downloaded', { source: 'chat' })}
            aria-label="Download Resume"
            className="flex items-center justify-center gap-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-6 sm:py-4 rounded-full text-white font-medium shadow-lg flex-shrink-0"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">Resume</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
