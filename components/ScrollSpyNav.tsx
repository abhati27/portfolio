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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-2">
        {sections.map((section) => {
          const isActive = activeSections.has(section.id);

          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-right px-3 py-1.5 rounded-md transition-all duration-300 ease-in-out hover:-translate-x-1"
                style={{
                  backgroundColor: isActive 
                    ? `${theme.colors.primary}15` 
                    : 'transparent',
                  color: isActive 
                    ? theme.colors.primary 
                    : theme.colors.foreground,
                  borderRight: isActive 
                    ? `2px solid ${theme.colors.primary}` 
                    : '2px solid transparent',
                  opacity: isActive ? 1 : 0.85,
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.75rem',
                  paddingRight: '0.75rem',
                }}
                aria-current={isActive ? 'location' : undefined}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
      
      {/* Background panel for better visibility */}
      <div
        className="absolute inset-0 -inset-x-1.5 -inset-y-2 rounded-lg backdrop-blur-sm -z-10"
        style={{
          backgroundColor: `${theme.colors.cardBg}80`,
          border: `1px solid ${theme.colors.border}30`,
        }}
      />
    </nav>
  );
}

