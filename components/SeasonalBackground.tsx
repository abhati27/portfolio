'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useEffect, useState, memo } from 'react';

const EmpireParticles = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particles = ['🛸', '🌟', '💥', '🔴'];

  return (
    <>
      {/* Starfield background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      {/* Floating emojis */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`emoji-${i}`}
          className="absolute text-3xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </>
  );
});
EmpireParticles.displayName = 'EmpireParticles';

const JediParticles = memo(() => {
  const particles = ['✨', '🪐', '🕊️', '🌿'];

  return (
    <>
      {/* Light rays */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute h-full w-32 opacity-10"
          style={{
            left: `${i * 33}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
          }}
          animate={{
            x: [-100, window.innerWidth || 1920],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: i * 7,
            ease: 'linear',
          }}
        />
      ))}
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute text-2xl opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </>
  );
});
JediParticles.displayName = 'JediParticles';

const OuterRimParticles = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const particles = ['🛰️', '🔧', '🪨', '🌌'];

  return (
    <>
      {/* Asteroids and debris */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-30"
          initial={{
            x: -50,
            y: Math.random() * dimensions.height,
            rotate: 0,
          }}
          animate={{
            x: dimensions.width + 50,
            rotate: 720,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </>
  );
});
OuterRimParticles.displayName = 'OuterRimParticles';

const HyperspaceParticles = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const particles = ['🌠', '✨', '🪐', '🚀'];

  return (
    <>
      {/* Hyperspace streaks */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute h-0.5 bg-cyan-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
          }}
          animate={{
            x: [0, dimensions.width],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        />
      ))}
      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute text-2xl"
          initial={{
            x: -50,
            y: Math.random() * dimensions.height,
            scale: 0.5,
          }}
          animate={{
            x: dimensions.width + 50,
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </>
  );
});
HyperspaceParticles.displayName = 'HyperspaceParticles';

const particleComponents: Record<Theme, React.ComponentType> = {
  empire: EmpireParticles,
  jedi: JediParticles,
  outerrim: OuterRimParticles,
  hyperspace: HyperspaceParticles,
};

const SeasonalBackground = memo(() => {
  const { themeName, theme } = useTheme();
  const ParticleComponent = particleComponents[themeName];

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: theme.gradient }}
    >
      <ParticleComponent />
    </div>
  );
});
SeasonalBackground.displayName = 'SeasonalBackground';

export default SeasonalBackground;


