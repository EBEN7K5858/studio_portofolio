"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.projects, href: '/projects' },
    { name: t.nav.stack, href: '/#stack' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/#contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-500 rounded-full px-8 ${scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group hover:scale-105 transition-transform">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-[var(--accent)]/50 group-hover:border-[var(--accent)] transition-colors">
            <Image 
              src="/assets/profile.jpg" 
              alt="Sansan Eben-Ezer KAMBOU Profile" 
              fill 
              sizes="40px"
              className="object-cover"
            />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter text-[var(--accent)] hidden sm:block">
            SEK
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-xs font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-all relative group ${pathname === link.href ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`} />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-5">
          <LangToggle />
          <ThemeToggle />
          <a 
            href="/assets/CV_Sansan_KAMBOU.pdf" 
            download
            className="btn-primary py-2.5 px-6 text-[10px] uppercase tracking-widest flex items-center space-x-2"
          >
            <Download className="w-3 h-3" />
            <span>{t.nav.cv}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-3 glass rounded-full text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>

    {/* Mobile Menu Overlay - Full Screen with Scroll Lock */}
    <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-2xl z-[100] lg:hidden flex flex-col p-10 h-screen w-screen overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-headline text-3xl font-bold text-[var(--accent)]">SEK</span>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-4 glass rounded-full text-[var(--text-primary)]"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-4xl font-headline font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto pt-20 border-t border-[var(--accent)]/10 flex flex-col space-y-10">
              <div className="flex items-center space-x-12 px-2">
                <LangToggle />
                <ThemeToggle />
              </div>
              <a 
                href="/assets/CV_Sansan_KAMBOU.pdf" 
                download
                className="btn-primary py-5 px-10 text-center text-sm rounded-full w-full font-bold shadow-2xl"
              >
                {t.nav.cv}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
