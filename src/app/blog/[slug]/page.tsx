"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { blogPosts } from '@/data/blog';

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

          <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-8 text-lg leading-relaxed">
            <p className="text-xl text-[var(--text-primary)] font-medium italic">
              {post.excerpt[lang]}
            </p>
            <p>
              This is a placeholder for the blog post content. In a production environment, 
              this would be populated from a Markdown file or a headless CMS. 
              The surgical minimalism design ensures that the focus remains entirely 
              on the typography and the quality of the content.
            </p>
            <h2 className="text-2xl font-headline font-bold text-[var(--text-primary)] pt-8">The core concept</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="p-8 bg-[var(--bg-secondary)] border-l-2 border-l-[var(--accent)] font-code text-sm">
              // Technical insight placeholder<br />
              console.log("Engineering + Security = Quality");
            </div>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
