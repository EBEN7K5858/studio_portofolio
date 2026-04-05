"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { blogPosts } from '@/data/blog';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  const { t } = useLang();

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-code text-xs text-[var(--accent)] mb-4"
          >
            {t.writing.label}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-hero font-bold tracking-tighter"
          >
            {t.writing.title}
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <BlogCard key={post.slug} post={post} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
