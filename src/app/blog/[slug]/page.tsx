"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { blogPosts } from '@/data/blog';
import ReactMarkdown from 'react-markdown';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const { lang, t } = useLang();
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-sm font-code text-[var(--accent)] hover:opacity-70 transition-opacity mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.projects.back}</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4 font-code text-xs text-[var(--accent)] mb-6">
            <span>{post.date}</span>
            <span className="opacity-30">/</span>
            <span className="uppercase">{post.tag[lang]}</span>
            <span className="opacity-30">/</span>
            <span>{post.read_time[lang]}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-12 leading-tight">
            {post.title[lang]}
          </h1>

          <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-8 text-lg leading-relaxed mt-12">
            <ReactMarkdown>{post.content[lang]}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
