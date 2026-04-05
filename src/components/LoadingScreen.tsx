"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const fullText = 'SEK';

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      if (current <= fullText.length) {
        setText(fullText.substring(0, current));
        current++;
      } else {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 1200);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-headline font-bold text-[var(--accent)] mb-8 tracking-tighter">
              {text}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </h1>
            <div className="w-48 h-[1px] bg-[var(--border)] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-[var(--accent)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
