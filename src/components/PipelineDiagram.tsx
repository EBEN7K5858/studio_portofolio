"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

interface Step {
  tool: string;
  desc: { en: string; fr: string };
}

interface PipelineDiagramProps {
  steps: Step[];
}

const PipelineDiagram = ({ steps }: PipelineDiagramProps) => {
  const { lang } = useLang();

  return (
    <div className="py-12 overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-4 min-w-max pb-4">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-4 bg-[var(--bg-surface)] border border-[var(--border)] min-w-[160px]"
            >
              <span className="font-code text-xs text-[var(--accent)] mb-1">{step.tool}</span>
              <span className="text-[10px] text-[var(--text-secondary)]">{step.desc[lang]}</span>
            </motion.div>
            
            {idx < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.05 }}
              >
                <ArrowRight className="w-5 h-5 text-accent-50" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PipelineDiagram;
