'use client';

import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types';
import { useEffect, useState, memo } from 'react';
import TieFighterIcon from '@/components/icons/TieFighterIcon';

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
      {/* Drifting TIE fighter silhouettes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`tie-${i}`}
          className="absolute text-red-500 opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.06, 0.16, 0.06],
          }}
          transition={{
            duration: Math.random() * 10 + 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          <TieFighterIcon className="w-8 h-8" />
        </motion.div>
      ))}
    </>
  );
});
EmpireParticles.displayName = 'EmpireParticles';

const JediParticles = memo(() => {
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
      {/* Soft floating light orbs */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 6,
            height: 6,
            background: 'radial-gradient(circle, rgba(255,215,120,0.9) 0%, rgba(255,215,120,0) 70%)',
            filter: 'blur(1px)',
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
        />
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

  return (
    <>
      {/* Drifting mechanical debris */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-orange-500 opacity-20"
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
          <Wrench className="w-6 h-6" />
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
      {/* Comet heads */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`comet-${i}`}
          className="absolute rounded-full"
          style={{
            width: 5,
            height: 5,
            background: 'radial-gradient(circle, #fff 0%, #00D9FF 60%, transparent 100%)',
            boxShadow: '0 0 8px 2px rgba(0, 217, 255, 0.8)',
          }}
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
        />
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


