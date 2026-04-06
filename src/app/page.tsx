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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/mojpyywn', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        form.reset();
      }
    } catch (error) {
      console.error("Erreur d'envoi :", error);
    }
  };

  const stack = {
    cat1: ['Flutter', 'Dart', 'Python', 'C', 'HTML/CSS', 'Git', 'Firebase'],
    cat2: ['Gemini API', 'Faster-Whisper', 'yt-dlp', 'FFmpeg', 'Google Colab', 'fre:ac/LAME'],
    cat3: ['Linux Ubuntu', 'CLI Administration', 'Firebase Auth', 'Security Rules', 'Cybersecurity']
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex items-center px-6 md:px-12 pt-40 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 z-10"
          >
            <motion.p
              variants={fadeInUp}
              className="font-code text-xs text-[var(--accent)] mb-10 uppercase tracking-[0.4em] block"
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-hero font-bold tracking-tighter mb-6 md:mb-10 leading-tight"
            >
              {t.hero.title1} <span className="text-[var(--accent)]">{lang === 'en' ? 'things' : 'des choses'}</span> {t.hero.title2}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 font-medium leading-relaxed max-w-2xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-lg text-[var(--text-secondary)]/80 mb-14 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8"
            >
              <Link href="/projects" className="btn-primary">{t.hero.ctaPrimary}</Link>
              <a href="/assets/CV_Sansan_KAMBOU.pdf" download className="btn-secondary flex items-center gap-3">
                <Download className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:col-span-4 animate-float"
          >
            <div className="terminal-card p-10 min-h-[350px] relative">
              <div className="flex space-x-3 mb-10">
                <div className="w-4 h-4 rounded-full bg-red-500/40" />
                <div className="w-4 h-4 rounded-full bg-amber-500/40" />
                <div className="w-4 h-4 rounded-full bg-green-500/40" />
              </div>
              <pre className="font-code text-sm text-[var(--text-secondary)] leading-loose">
                <code>
                  {terminalText}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2.5 h-6 bg-[var(--accent)] align-middle ml-2"
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
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-10 h-10 text-[var(--accent)] opacity-40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-[var(--bg-secondary)]/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[var(--radius)] glass p-3">
              <Image
                src="/assets/profile.jpg"
                alt="Sansan Eben-Ezer KAMBOU"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[calc(var(--radius)-1rem)]"
                priority
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-3/4 h-3/4 bg-[var(--accent)]/15 blur-[120px] -z-10" />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-code text-xs text-[var(--accent)] mb-8 tracking-[0.3em]"
            >
              {t.about.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl mb-12 leading-tight font-bold"
            >
              {t.about.title}
            </motion.h2>
            <div className="space-y-10 text-lg text-[var(--text-secondary)] mb-14 leading-relaxed">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{t.about.p1}</motion.p>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{t.about.p2}</motion.p>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{t.about.p3}</motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {[
                { val: '4+', lbl: t.about.stat1 },
                { val: '2nd', lbl: t.about.stat2 },
                { val: '2', lbl: t.about.stat3 }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-6 md:p-10 glass rounded-[var(--radius)] flex md:flex-col items-center md:text-center hover:scale-105 transition-transform duration-300 gap-6 md:gap-3"
                >
                  <div className="text-3xl md:text-4xl font-headline font-bold text-[var(--accent)]">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-code leading-tight font-bold">{stat.lbl}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK SECTION */}
      <section id="stack" className="py-24 md:py-40 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-8 tracking-[0.3em]">{t.stack.label}</motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold">{t.stack.title}</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
            {[
              { title: t.stack.cat1, items: stack.cat1 },
              { title: t.stack.cat2, items: stack.cat2 },
              { title: t.stack.cat3, items: stack.cat3 }
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass p-8 md:p-12 rounded-[var(--radius)] hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[var(--accent)]/10"
              >
                <h3 className="text-2xl font-headline font-bold mb-12 flex items-center justify-center text-[var(--accent)]">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-5 justify-center">
                  {cat.items.map((item, i) => (
                    <motion.span
                      key={item}
                      className="skill-tag"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-24 md:py-40 px-6 md:px-12 bg-[var(--bg-secondary)]/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-10">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-8 tracking-[0.3em]">{t.projects.label}</motion.p>
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold">{t.projects.title}</motion.h2>
            </div>
            <Link href="/projects" className="text-sm font-code font-bold text-[var(--accent)] hover:opacity-70 transition-all flex items-center group bg-[var(--accent-dim)] px-6 py-3 rounded-full">
              {t.projects.viewAll} <span className="ml-4 group-hover:translate-x-3 transition-transform text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {projects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WRITING SECTION */}
      <section id="blog" className="py-24 md:py-40 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-10">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-8 tracking-[0.3em]">{t.writing.label}</motion.p>
              <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold">{t.writing.title}</motion.h2>
            </div>
            <Link href="/blog" className="text-sm font-code font-bold text-[var(--accent)] hover:opacity-70 transition-all flex items-center group bg-[var(--accent-dim)] px-6 py-3 rounded-full">
              {lang === 'en' ? 'Visit Blog' : 'Visiter le Blog'} <span className="ml-4 group-hover:translate-x-3 transition-transform text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {blogPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-40 px-6 md:px-12 bg-[var(--bg-secondary)]/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-code text-xs text-[var(--accent)] mb-8 tracking-[0.3em]">{t.contact.label}</motion.p>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl md:text-6xl mb-12 font-bold leading-tight">{t.contact.title}</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xl text-[var(--text-secondary)] mb-16 max-w-md leading-relaxed">
              {t.contact.availability}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
              {[
                { name: 'Email', val: 'eben.kambou@gmail.com', href: 'mailto:eben.kambou@gmail.com' },
                { name: 'LinkedIn', val: 'eben-ezer-kambou-63594321b', href: 'https://www.linkedin.com/in/eben-ezer-kambou-63594321b' },
                { name: 'GitHub', val: 'EBEN7K5858', href: 'https://github.com/EBEN7K5858' }
              ].map((link, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="text-[10px] font-code text-[var(--text-muted)] uppercase mb-4 tracking-[0.3em] font-bold">{link.name}</div>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xl font-headline font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors break-words block">
                    {link.val}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 glass rounded-[var(--radius)] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="flex flex-col items-center justify-center h-full text-center py-24"
                >
                  <div className="w-24 h-24 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-10">
                    <Check className="w-12 h-12 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-6">{t.contact.success}</h3>
                  <p className="text-[var(--text-secondary)] text-lg">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <div className="space-y-6">
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contact.placeholderName}
                      required
                      className="w-full bg-[var(--bg-primary)]/50 rounded-[var(--radius)] border border-[var(--border)] p-6 outline-none focus:border-[var(--accent)] focus:ring-8 focus:ring-[var(--accent-dim)] transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contact.placeholderEmail}
                      required
                      className="w-full bg-[var(--bg-primary)]/50 rounded-[var(--radius)] border border-[var(--border)] p-6 outline-none focus:border-[var(--accent)] focus:ring-8 focus:ring-[var(--accent-dim)] transition-all"
                    />
                    <textarea
                      rows={5}
                      name="message"
                      placeholder={t.contact.placeholderMessage}
                      required
                      className="w-full bg-[var(--bg-primary)]/50 rounded-[var(--radius)] border border-[var(--border)] p-6 outline-none focus:border-[var(--accent)] focus:ring-8 focus:ring-[var(--accent-dim)] transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-4 py-6 text-xl">
                    <Send className="w-6 h-6" />
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
}// Cache Buster Build
// Final Harden Build
// Glass UI Build
// Final Polish Build
// Lock & Border Build
