"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const { lang, t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link 
        href={`/blog/${post.slug}`}
        className="flex flex-col h-full p-8 glass rounded-[var(--radius)] transition-all duration-300 hover:shadow-[var(--accent-glow)] hover:-translate-y-1"
      >
        <div className="flex items-center space-x-3 mb-6 font-code text-[10px] text-[var(--accent)]">
          <span className="glass px-2 py-1 rounded-full">{post.date}</span>
          <span className="opacity-30">/</span>
          <span className="uppercase tracking-widest">{post.tag[lang]}</span>
        </div>
        
        <h3 className="text-xl font-headline font-bold mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors">
          {post.title[lang]}
        </h3>
        
        <p className="text-sm text-[var(--text-secondary)] mb-10 line-clamp-3 leading-relaxed">
          {post.excerpt[lang]}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-[var(--accent)]/10">
          <span className="text-[10px] font-code text-[var(--text-muted)] tracking-wider">{post.read_time[lang]}</span>
          <span className="text-sm font-bold text-[var(--accent)] flex items-center">
            {t.writing.read} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
