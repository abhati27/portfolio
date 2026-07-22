'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'volunteering', label: 'Volunteering' },
];

export default function ScrollSpyNav() {
  const { theme } = useTheme();
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Configuration for IntersectionObserver
    const observerOptions: IntersectionObserverInit = {
      // Account for fixed header (adjust rootMargin to offset header height)
      rootMargin: '-100px 0px -40% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      setActiveSections((prev) => {
        const updated = new Set(prev);
        
        entries.forEach((entry) => {
          // Section is considered active when intersectionRatio is positive
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            updated.add(entry.target.id);
          } else {
            // Remove from active set when no longer intersecting
            updated.delete(entry.target.id);
          }
        });
        
        return updated;
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup: disconnect observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSections.has(section.id);

        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center justify-end gap-3 py-1"
            aria-current={isActive ? 'location' : undefined}
            aria-label={section.label}
          >
            {/* Label chip: hidden until hover, so nothing sits over the content */}
            <span
              className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium opacity-0 translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: theme.colors.cardBg,
                color: isActive ? theme.colors.primary : theme.colors.foreground,
                border: `1px solid ${theme.colors.border}55`,
              }}
            >
              {section.label}
            </span>

            {/* Dot / bar indicator (the only always-visible part) */}
            <span
              className="rounded-full transition-all duration-300 group-hover:opacity-100"
              style={{
                height: '8px',
                width: isActive ? '26px' : '8px',
                backgroundColor: isActive
                  ? theme.colors.primary
                  : `${theme.colors.foreground}55`,
                boxShadow: isActive ? `0 0 12px ${theme.colors.primary}99` : 'none',
                opacity: isActive ? 1 : 0.75,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

