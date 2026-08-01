'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import { User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const { theme, themeName } = useTheme();
  const isAI = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: theme.buttonGradient }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isAI ? 'items-start' : 'items-end'}`}>
        <div
          className="px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm prose prose-sm max-w-none"
          style={{
            background: isAI ? theme.colors.chatBubbleAI : theme.colors.chatBubbleUser,
            color: isAI 
              ? (themeName === 'jedi' ? '#1A202C' : '#FFFFFF')
              : theme.colors.foreground,
          }}
        >
          {isAI ? (
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-3" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-1 mt-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-sm font-bold mb-1 mt-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold" style={{ color: theme.colors.primary }} {...props} />,
                code: ({ node, inline, ...props }: any) => 
                  inline ? (
                    <code 
                      className="px-1.5 py-0.5 rounded text-xs font-mono" 
                      style={{ 
                        background: `${theme.colors.primary}20`,
                        color: theme.colors.primary 
                      }}
                      {...props} 
                    />
                  ) : (
                    <code 
                      className="block p-2 rounded text-xs font-mono overflow-x-auto" 
                      style={{ 
                        background: `${theme.colors.background}40`,
                      }}
                      {...props} 
                    />
                  ),
                pre: ({ node, ...props }) => <pre className="mb-2 overflow-x-auto" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote 
                    className="border-l-4 pl-3 italic my-2" 
                    style={{ borderColor: theme.colors.primary }}
                    {...props} 
                  />
                ),
                a: ({ node, ...props }) => (
                  <a 
                    className="underline hover:no-underline" 
                    style={{ color: theme.colors.primary }}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props} 
                  />
                ),
                hr: ({ node, ...props }) => <hr className="my-3" style={{ borderColor: theme.colors.border }} {...props} />,
              }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          )}
        </div>
        <span 
          className="text-xs mt-1 px-2"
          style={{ 
            color: themeName === 'empire' || themeName === 'hyperspace' ? '#AAAAAA' : '#718096' 
          }}
        >
          {formatDate(message.timestamp)}
        </span>
      </div>

      {!isAI && (
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-white/80"
          style={{ borderColor: theme.colors.primary, borderWidth: 2 }}
        >
          <User className="w-5 h-5" style={{ color: theme.colors.primary }} />
        </div>
      )}
    </motion.div>
  );
}


