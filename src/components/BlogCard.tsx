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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex flex-col h-full p-6 bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-center space-x-3 mb-4 font-code text-[10px] text-[var(--accent)]">
        <span>{post.date}</span>
        <span className="opacity-30">|</span>
        <span className="uppercase tracking-widest">{post.tag[lang]}</span>
      </div>
      
      <h3 className="text-lg font-headline font-medium mb-4 leading-tight">
        {post.title[lang]}
      </h3>
      
      <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-3">
        {post.excerpt[lang]}
      </p>
      
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] font-code text-[var(--text-muted)]">{post.read_time[lang]}</span>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity"
        >
          {t.writing.read} →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
