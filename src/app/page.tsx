"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Check, Download } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import ProjectCard from '@/components/ProjectCard';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  const { t, lang } = useLang();
  const [terminalText, setTerminalText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  const commands = [
    '> sansan.init()',
    '✓ flutter build  [TRALEY v2.1]',
    '✓ pipeline.run() [ClipMaker AI]',
    '✓ gemini.flash() [Chadah Academy]',
    '✓ deploy()       [Content Pipeline]',
    '→ status: building...'
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let currentText = '';

    const typeInterval = setInterval(() => {
      if (currentLine < commands.length) {
        if (currentChar < commands[currentLine].length) {
          currentText += commands[currentLine][currentChar];
          setTerminalText(currentText);
          currentChar++;
        } else {
          currentText += '\n';
          setTerminalText(currentText);
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(typeInterval);
      }
    }, 40);

    const handleScroll = () => {
      if (window.scrollY > 50) setShowScrollIcon(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(typeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const stack = {
    cat1: ['Flutter', 'Dart', 'Python', 'C', 'HTML/CSS', 'Git', 'Firebase'],
    cat2: ['Gemini API', 'Faster-Whisper', 'yt-dlp', 'FFmpeg', 'Google Colab', 'fre:ac/LAME'],
    cat3: ['Linux Ubuntu', 'CLI Administration', 'Firebase Auth', 'Security Rules', 'Cybersecurity']
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION */}
      <section className="min-h-[100svh] flex items-center px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
          <div className="lg:col-span-6 z-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-code text-xs text-[var(--accent)] mb-6 uppercase tracking-widest"
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-hero font-bold tracking-tighter mb-6 whitespace-pre-line"
            >
              {t.hero.title1} <span className="text-[var(--accent)]">{lang === 'en' ? 'things' : 'construis'}</span>{"\n"}{t.hero.title2}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[var(--text-secondary)] mb-8 font-medium"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md text-[var(--text-secondary)] mb-12"
            >
              {t.hero.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects" className="btn-primary">{t.hero.ctaPrimary}</Link>
              <a href="/assets/CV_Sansan_KAMBOU.pdf" download className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block lg:col-span-4"
          >
            <div className="terminal-card p-6 min-h-[240px] relative">
              <div className="flex space-x-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <pre className="font-code text-sm text-[var(--text-secondary)] leading-relaxed">
                <code>
                  {terminalText}
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-1.5 h-4 bg-[var(--accent)] align-middle ml-1"
                  />
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showScrollIcon && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-[var(--text-muted)]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5]">
              <Image 
                src="https://picsum.photos/seed/kambou/800/1000" 
                alt="Sansan Eben-Ezer KAMBOU"
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[var(--accent)] z-0 rounded-sm" />
          </motion.div>

          <div>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-code text-xs text-[var(--accent)] mb-4"
            >
              {t.about.label}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl mb-8"
            >
              {t.about.title}
            </motion.h2>
            <div className="space-y-6 text-[var(--text-secondary)] mb-12">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>{t.about.p1}</motion.p>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>{t.about.p2}</motion.p>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>{t.about.p3}</motion.p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { val: '4+', lbl: t.about.stat1 },
                { val: '2nd', lbl: t.about.stat2 },
                { val: '2', lbl: t.about.stat3 }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm"
                >
                  <div className="text-2xl font-headline font-bold text-[var(--accent)] mb-1">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-code">{stat.lbl}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK SECTION */}
      <section id="stack" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-4">{t.stack.label}</motion.p>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl mb-16">{t.stack.title}</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: t.stack.cat1, items: stack.cat1 },
              { title: t.stack.cat2, items: stack.cat2 },
              { title: t.stack.cat3, items: stack.cat3 }
            ].map((cat, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-headline font-bold mb-8 flex items-center">
                  <span className="w-8 h-[1px] bg-[var(--accent)] mr-4" />
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item, i) => (
                    <motion.span 
                      key={item}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="skill-tag"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-[var(--bg-secondary)]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-4">{t.projects.label}</motion.p>
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl">{t.projects.title}</motion.h2>
            </div>
            <Link href="/projects" className="hidden md:block text-sm font-code text-[var(--accent)] hover:opacity-70 transition-opacity">
              {t.projects.viewAll} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
          
          <Link href="/projects" className="md:hidden block text-center mt-12 text-sm font-code text-[var(--accent)]">
            {t.projects.viewAll} →
          </Link>
        </div>
      </section>

      {/* 5. WRITING SECTION */}
      <section id="blog" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-4">{t.writing.label}</motion.p>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl mb-16">{t.writing.title}</motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[var(--bg-secondary)]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-4">{t.contact.label}</motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl mb-8">{t.contact.title}</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[var(--text-secondary)] mb-12 max-w-md">
              {t.contact.availability}
            </motion.p>
            
            <div className="space-y-8">
              {[
                { name: 'Email', val: 'eben.kambou@gmail.com', href: 'mailto:eben.kambou@gmail.com' },
                { name: 'LinkedIn', val: 'eben-ezer-kambou-63594321b', href: 'https://www.linkedin.com/in/eben-ezer-kambou-63594321b' },
                { name: 'GitHub', val: 'EBEN7K5858', href: 'https://github.com/EBEN7K5858' }
              ].map((link, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-[10px] font-code text-[var(--text-muted)] uppercase mb-2">{link.name}</div>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xl font-headline font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    {link.val}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="p-12 bg-[var(--bg-surface)] border border-[var(--border)] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-dim)] flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-2">{t.contact.success}</h3>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input 
                    type="text" 
                    placeholder={t.contact.placeholderName} 
                    required 
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] p-4 outline-none focus:border-[var(--accent)] focus:shadow-[var(--accent-glow)] transition-all" 
                  />
                  <input 
                    type="email" 
                    placeholder={t.contact.placeholderEmail} 
                    required 
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] p-4 outline-none focus:border-[var(--accent)] focus:shadow-[var(--accent-glow)] transition-all" 
                  />
                  <textarea 
                    rows={5} 
                    placeholder={t.contact.placeholderMessage} 
                    required 
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] p-4 outline-none focus:border-[var(--accent)] focus:shadow-[var(--accent-glow)] transition-all resize-none" 
                  />
                  <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>{t.contact.send}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
