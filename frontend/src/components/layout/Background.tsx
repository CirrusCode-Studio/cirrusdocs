import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC<{ x: number; y: number; size: number; duration: number }> = ({ x, y, size, duration }) => (
  <motion.div
    initial={{ x: `${x}%`, y: `${y}%`, opacity: 0 }}
    animate={{ 
      y: [`${y}%`, `${y - 10}%`, `${y}%`],
      opacity: [0.1, 0.4, 0.1] 
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className="absolute bg-blue-400/30 rounded-full blur-[1px]"
    style={{ width: size, height: size }}
  />
);

const particlesData = [
  { id: 1, x: 10, y: 20, size: 2, duration: 6 },
  { id: 2, x: 25, y: 40, size: 3, duration: 8 },
  { id: 3, x: 50, y: 30, size: 1.5, duration: 7 },
  { id: 4, x: 70, y: 50, size: 2.5, duration: 9 },
  { id: 5, x: 85, y: 15, size: 2, duration: 5 },
  { id: 6, x: 40, y: 70, size: 3, duration: 10 },
  { id: 7, x: 60, y: 10, size: 1.8, duration: 6 },
  { id: 8, x: 30, y: 80, size: 2.2, duration: 8 },
  // ... bạn có thể add thêm nếu muốn
];

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Signature Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,rgba(0,0,0,0)_60%)]" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Data Chunks (Particles) */}
      {particlesData.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />
    </div>
  );
};

export default Background;