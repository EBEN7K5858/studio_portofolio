"use client";

import React from 'react';
import { useLang } from '@/contexts/LangContext';
import { motion } from 'framer-motion';

const LangToggle = () => {
  const { lang, toggleLang } = useLang();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLang}
      className="font-code text-xs px-3 py-1.5 rounded-sm border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-colors"
      aria-label="Toggle language"
    >
      {lang.toUpperCase()}
    </motion.button>
  );
};

export default LangToggle;
