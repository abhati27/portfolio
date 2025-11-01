'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Send, Briefcase, Download, Sparkles } from 'lucide-react';
import { client } from '@gradio/client';
import { Message } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { generateId } from '@/lib/utils';
import SeasonalBackground from '@/components/SeasonalBackground';
import ThemeSlider from '@/components/SeasonSlider';
import ChatMessage from '@/components/ChatMessage';
import TypingIndicator from '@/components/TypingIndicator';
import ThemeEffects from '@/components/ThemeEffects';

const SUGGESTED_PROMPTS = [
  "Tell me about your R&R Award at Incedo",
  "What AI solutions have you built?",
  "Tell me about your Product Manager role",
  "What are your technical skills and certifications?",
];

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      role: 'assistant',
      content: "👋 Hi there, I'm Anmol Vijay Bhatia — Software Engineer & Product Manager specializing in AI Solutions at Incedo Inc.\n\n🏆 Proud recipient of the R&R Individual Excellence Award (June 2024)\n☁️ AWS Certified Cloud Practitioner\n\nFeel free to ask me about my experience, projects, skills, awards, or anything you'd like to know about my professional journey!",
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

  // Handle initial message from URL
  useEffect(() => {
    const initialMessage = searchParams.get('message');
    if (initialMessage && !hasProcessedInitialMessage && !processingRef.current) {
      processingRef.current = true; // Set flag immediately
      setHasProcessedInitialMessage(true);
      console.log('🚀 Processing initial message from URL:', initialMessage);
      
      // Process the initial message
      const processInitialMessage = async () => {
        const userMessage: Message = {
          id: generateId(),
          role: 'user',
          content: initialMessage.trim(),
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
          // Connect to Hugging Face Space
          const app = await client('abhati27/Career_Conversation_Anmol');
          
          // View available API endpoints
          const apiInfo = await app.view_api();
          console.log('Hugging Face Space API Info:', apiInfo);
          
          // Try different possible input formats
          let result;
          const userInput = initialMessage.trim();
          
          try {
            // Try the discovered /chat endpoint first (from API info)
            console.log('Trying /chat endpoint with array...');
            result = await app.predict('/chat', [userInput]);
          } catch (e) {
            console.log('/chat with array failed, trying with object...', e);
            try {
              // Try /chat with object
              result = await app.predict('/chat', { message: userInput });
            } catch (e2) {
              console.log('/chat with object failed, trying index 0...', e2);
              try {
                // Format: Array with single string
                result = await app.predict(0, [userInput]);
              } catch (e3) {
                console.log('Format with index 0 failed, trying /predict...', e3);
                try {
                  // Format: Named /predict endpoint with array
                  result = await app.predict('/predict', [userInput]);
                } catch (e4) {
                  console.log('/predict failed, trying text parameter...', e4);
                  try {
                    // Format: Object with 'text' key
                    result = await app.predict(0, { text: userInput });
                  } catch (e5) {
                    console.log('All formats failed!', e5);
                    throw new Error('Could not find working endpoint format');
                  }
                }
              }
            }
          }

          // Extract response from result
          console.log('Raw result from Hugging Face:', result);
          console.log('Result data:', result.data);
          
          // Handle different response formats
          let responseText: string;
          const firstData = (result.data as any)?.[0];
          
          console.log('First data type:', typeof firstData);
          console.log('First data value:', firstData);
          
          if (typeof firstData === 'string') {
            // Direct string response
            console.log('✅ Using format: Direct string');
            responseText = firstData;
          } else if (firstData && typeof firstData === 'object' && 'value' in firstData) {
            // Object with 'value' property (common in Gradio)
            console.log('✅ Using format: Object with value property');
            console.log('Extracted value:', firstData.value);
            responseText = String(firstData.value);
            
            // If value is empty, check if there are other fields with content
            if (!responseText || responseText.trim() === '') {
              console.warn('⚠️ Value is empty! Checking other fields...');
              console.log('Full firstData object:', firstData);
              
              // Check if there's a different field with the response
              if (firstData.text) responseText = String(firstData.text);
              else if (firstData.content) responseText = String(firstData.content);
              else if (firstData.response) responseText = String(firstData.response);
              else {
                console.error('❌ Empty value and no alternative fields found');
                responseText = "I received an empty response from the chatbot. The Space might need to warm up or there could be a configuration issue. Please try again or check the Space status on Hugging Face.";
              }
            }
          } else if (typeof (result.data as any) === 'string') {
            // Data is directly a string
            console.log('✅ Using format: result.data as string');
            responseText = result.data as string;
          } else if ((result.data as any) && typeof (result.data as any) === 'object' && 'value' in (result.data as any)) {
            // Data object with 'value' property
            console.log('✅ Using format: result.data.value');
            responseText = String((result.data as any).value);
          } else {
            // Fallback: try to stringify or use default message
            console.error('❌ Unexpected response format:', result);
            responseText = "I apologize, but I couldn't generate a response. Please try again!";
          }
          
          console.log('Final response text to display:', responseText);
          
          const assistantMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: responseText,
            timestamp: new Date(),
          };

          console.log('Creating assistant message:', assistantMessage);
          setMessages((prev) => {
            const newMessages = [...prev, assistantMessage];
            console.log('Updated messages array:', newMessages);
            return newMessages;
          });
        } catch (error) {
          console.error('Failed to send message:', error);
          const errorMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: "I apologize, but I'm having trouble connecting to the chatbot. Please check the console for API details and try again!",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
          console.log('✅ Finished processing initial message');
        }
      };
      processInitialMessage();
    } else if (initialMessage && (hasProcessedInitialMessage || processingRef.current)) {
      console.log('⏭️ Skipping duplicate processing of initial message');
    }
    // Only depend on searchParams and hasProcessedInitialMessage to avoid duplicate runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, hasProcessedInitialMessage]);

  const handleSendMessage = async (content: string = input) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Connect to Hugging Face Space directly
      const app = await client('abhati27/Career_Conversation_Anmol');
      
      // View available API endpoints
      const apiInfo = await app.view_api();
      console.log('Hugging Face Space API Info:', apiInfo);
      
      // Try different possible input formats
      let result;
      const userInput = content.trim();
      
      try {
        // Try the discovered /chat endpoint first (from API info)
        console.log('Trying /chat endpoint with array...');
        result = await app.predict('/chat', [userInput]);
      } catch (e) {
        console.log('/chat with array failed, trying with object...', e);
        try {
          // Try /chat with object
          result = await app.predict('/chat', { message: userInput });
        } catch (e2) {
          console.log('/chat with object failed, trying index 0...', e2);
          try {
            // Format: Array with single string
            result = await app.predict(0, [userInput]);
          } catch (e3) {
            console.log('Format with index 0 failed, trying /predict...', e3);
            try {
              // Format: Named /predict endpoint with array
              result = await app.predict('/predict', [userInput]);
            } catch (e4) {
              console.log('/predict failed, trying text parameter...', e4);
              try {
                // Format: Object with 'text' key
                result = await app.predict(0, { text: userInput });
              } catch (e5) {
                console.log('All formats failed!', e5);
                throw new Error('Could not find working endpoint format');
              }
            }
          }
        }
      }

      // Extract response from result
      console.log('Raw result from Hugging Face:', result);
      console.log('Result data:', result.data);
      
      // Handle different response formats
      let responseText: string;
      const firstData = (result.data as any)?.[0];
      
      console.log('First data type:', typeof firstData);
      console.log('First data value:', firstData);
      
      if (typeof firstData === 'string') {
        // Direct string response
        console.log('✅ Using format: Direct string');
        responseText = firstData;
      } else if (firstData && typeof firstData === 'object' && 'value' in firstData) {
        // Object with 'value' property (common in Gradio)
        console.log('✅ Using format: Object with value property');
        console.log('Extracted value:', firstData.value);
        responseText = String(firstData.value);
        
        // If value is empty, check if there are other fields with content
        if (!responseText || responseText.trim() === '') {
          console.warn('⚠️ Value is empty! Checking other fields...');
          console.log('Full firstData object:', firstData);
          
          // Check if there's a different field with the response
          if (firstData.text) responseText = String(firstData.text);
          else if (firstData.content) responseText = String(firstData.content);
          else if (firstData.response) responseText = String(firstData.response);
          else {
            console.error('❌ Empty value and no alternative fields found');
            responseText = "I received an empty response from the chatbot. The Space might need to warm up or there could be a configuration issue. Please try again or check the Space status on Hugging Face.";
          }
        }
      } else if (typeof (result.data as any) === 'string') {
        // Data is directly a string
        console.log('✅ Using format: result.data as string');
        responseText = result.data as string;
      } else if ((result.data as any) && typeof (result.data as any) === 'object' && 'value' in (result.data as any)) {
        // Data object with 'value' property
        console.log('✅ Using format: result.data.value');
        responseText = String((result.data as any).value);
      } else {
        // Fallback: try to stringify or use default message
        console.error('❌ Unexpected response format:', result);
        responseText = "I apologize, but I couldn't generate a response. Please try again!";
      }
      
      console.log('Final response text to display:', responseText);
      
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      console.log('Creating assistant message:', assistantMessage);
      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage];
        console.log('Updated messages array:', newMessages);
        return newMessages;
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to the chatbot. Please check the console for API details and try again!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div 
              className="relative w-12 h-12 rounded-full overflow-hidden border-2"
              style={{ 
                borderColor: theme.colors.primary,
              }}
            >
              <Image
                src="/portfolio.png"
                alt="Anmol Vijay Bhatia"
                width={48}
                height={48}
                className="object-contain w-full h-full scale-110"
                priority
              />
            </div>
            <div>
              <h1
                className="text-xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Anmol Vijay Bhatia
              </h1>
              <p 
                className="text-sm"
                style={{ 
                  color: theme.colors.foreground,
                  opacity: 0.85
                }}
              >
                GenAI Software Engineer
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <ThemeSlider />
            
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg"
              style={{ background: theme.buttonGradient }}
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${theme.colors.primary}40` }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-5 h-5" />
              Back to Portfolio
            </motion.button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="pt-24 pb-32 px-4 relative z-10">
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
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
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
        className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md border-t z-40"
        style={{
          backgroundColor: `${theme.colors.background}60`,
          borderColor: `${theme.colors.border}40`,
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about my experience, projects, or resume..."
              className="w-full px-6 py-4 rounded-full backdrop-blur-sm shadow-lg outline-none transition-all"
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
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-4 rounded-full text-white font-medium shadow-lg"
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

