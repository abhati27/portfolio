'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { themes } from '@/lib/themes';
import { track } from '@/lib/analytics';

export default function ThemeSlider() {
  const { themeName, setThemeName, theme } = useTheme();
  const themeNames: Theme[] = ['empire', 'jedi', 'outerrim', 'hyperspace'];

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-2 rounded-full backdrop-blur-md shadow-lg"
      style={{
        background: theme.colors.cardBg,
        borderColor: theme.colors.border,
        borderWidth: 1,
      }}
    >
      <span
        className="hidden lg:inline text-xs font-medium uppercase tracking-wider"
        style={{ color: theme.colors.foreground }}
      >
        Theme:
      </span>
      <div className="flex gap-1 sm:gap-2">
        {themeNames.map((t) => (
          <motion.button
            key={t}
            onClick={() => {
              track('theme_changed', { theme: t });
              setThemeName(t);
            }}
            className="relative px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: themeName === t ? theme.buttonGradient : 'transparent',
              color: themeName === t ? 'white' : theme.colors.foreground,
              boxShadow: themeName === t ? `0 0 15px ${theme.colors.primary}40` : 'none',
            }}
          >
            {themeName === t && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-full"
                style={{
                  background: theme.buttonGradient,
                  boxShadow: `0 0 20px ${theme.colors.primary}50`,
                }}
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{themes[t].icon}</span>
              <span className="hidden lg:inline">{themes[t].name}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}


