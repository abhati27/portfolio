'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { track } from '@/lib/analytics';
import { ExternalLink, Github, Sparkles, Maximize2, X } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme, themeName } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
        style={{ background: theme.colors.cardBg }}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 group">
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Maximize Icon */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                style={{ 
                  background: `${theme.colors.background}80`,
                  borderColor: theme.colors.primary,
                  borderWidth: 1,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize2 className="w-5 h-5" style={{ color: theme.colors.primary }} />
              </motion.button>
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: theme.buttonGradient }}
            >
              <Sparkles className="w-20 h-20 text-white/50" />
            </div>
          )}
        </div>

      <div className="p-6">
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: theme.colors.foreground }}
        >
          {project.title}
        </h3>
        
        <p 
          className="text-sm mb-4 line-clamp-3"
          style={{ 
            color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
            opacity: 0.95
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: `${theme.colors.primary}20`,
                color: theme.colors.foreground,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2 mb-4">
          {project.highlights.slice(0, 3).map((highlight, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="text-xs mt-0.5"
                style={{ color: theme.colors.primary }}
              >
                ✓
              </span>
              <p 
                className="text-xs"
                style={{ 
                  color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
                  opacity: 0.95
                }}
              >
                {highlight}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('project_clicked', { title: project.title, type: 'github', url: project.github })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md"
              style={{ background: theme.buttonGradient }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
          )}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('project_clicked', { title: project.title, type: 'link', url: project.link })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: `${theme.colors.primary}20`,
                color: theme.colors.foreground,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              View
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && project.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl"
            style={{ 
              background: `${theme.colors.background}95`,
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md shadow-2xl z-10"
              style={{ 
                background: theme.colors.cardBg,
                borderColor: theme.colors.primary,
                borderWidth: 2,
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" style={{ color: theme.colors.primary }} />
            </motion.button>

            {/* Project Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 max-w-2xl"
            >
              <h3
                className="text-2xl font-bold mb-1"
                style={{ 
                  color: theme.colors.primary,
                  textShadow: `0 0 20px ${theme.colors.primary}40`,
                }}
              >
                {project.title}
              </h3>
              <p 
                className="text-sm"
                style={{ 
                  color: theme.colors.foreground,
                  opacity: 0.8,
                }}
              >
                {project.description}
              </p>
            </motion.div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                background: theme.colors.cardBg,
                borderColor: theme.colors.primary,
                borderWidth: 2,
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>

            {/* ESC to close hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md"
              style={{ 
                background: theme.colors.cardBg,
                borderColor: theme.colors.border,
                borderWidth: 1,
              }}
            >
              <p 
                className="text-xs font-medium"
                style={{ color: theme.colors.foreground, opacity: 0.7 }}
              >
                Click anywhere or press ESC to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


