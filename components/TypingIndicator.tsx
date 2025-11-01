'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  const { theme, themeName } = useTheme();
  const dotColor = (themeName === 'jedi') ? '#1A202C' : '#FFFFFF';

  return (
    <div className="flex gap-3 justify-start">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: theme.buttonGradient }}
      >
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      
      <div
        className="px-4 py-3 rounded-2xl shadow-md backdrop-blur-sm"
        style={{ background: theme.colors.chatBubbleAI }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dotColor }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


