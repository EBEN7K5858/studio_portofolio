"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { damping: 20, stiffness: 200, restDelta: 0.001 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  if (shouldReduceMotion) return null;

  return (
    <>
      <div 
        className="custom-cursor cursor-dot md:block hidden"
        style={{ left: mousePosition.x - 3, top: mousePosition.y - 3 }}
      />
      <motion.div 
        className="custom-cursor cursor-ring md:block hidden"
        style={{ x: cursorX, y: cursorY, translateX: -14, translateY: -14 }}
      />
    </>
  );
};

export default CustomCursor;
