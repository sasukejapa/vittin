/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#f29f8d] will-change-[opacity,transform]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: p.opacity, y: 0 }}
          animate={{
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            y: [0, -50, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#264039]">
      
      <ParticleField />

      {/* Blob 1: Olive Green #507306 */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#507306] rounded-full mix-blend-soft-light filter blur-[80px] opacity-40 will-change-transform"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Earth Brown #8c4c27 */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[90vw] h-[70vw] bg-[#8c4c27] rounded-full mix-blend-soft-light filter blur-[60px] opacity-30 will-change-transform"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Primary Orange #f29849 (Subtle glow) */}
      <motion.div
        className="absolute top-[40%] left-[20%] w-[50vw] h-[50vw] bg-[#f29849] rounded-full mix-blend-overlay filter blur-[100px] opacity-10 will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay for "Roots" Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#264039]/50 to-[#264039] pointer-events-none" />
    </div>
  );
};

export default FluidBackground;