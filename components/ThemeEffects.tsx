'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { memo } from 'react';

const ThemeEffects = memo(() => {
  const { themeName } = useTheme();

  // Empire theme - add scanline effect
  if (themeName === 'empire') {
    return (
      <>
        {/* Scanlines - behind content */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.05) 2px, rgba(255, 255, 255, 0.05) 4px)',
            }}
          />
        </div>
        {/* Vignette - behind content */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          }}
        />
      </>
    );
  }

  // Jedi theme - add light dust particles
  if (themeName === 'jedi') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  }

  // Hyperspace theme - add glow overlay
  if (themeName === 'hyperspace') {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
        }}
      />
    );
  }

  return null;
});
ThemeEffects.displayName = 'ThemeEffects';

export default ThemeEffects;

