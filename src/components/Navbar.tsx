"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-[var(--accent)] hover:opacity-80 transition-opacity">
          SEK
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium tracking-wide hover:text-[var(--accent)] transition-colors ${pathname === link.href ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <LangToggle />
          <ThemeToggle />
          <a 
            href="/assets/CV_Sansan_KAMBOU.pdf" 
            download
            className="btn-secondary py-1.5 px-4 text-xs flex items-center space-x-2"
          >
            <Download className="w-3 h-3" />
            <span>{t.nav.cv}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-[var(--bg-primary)] z-[60] lg:hidden flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-headline text-2xl font-bold text-[var(--accent)]">SEK</span>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-4xl font-headline font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-[var(--border)] flex items-center justify-between">
              <div className="flex space-x-4">
                <LangToggle />
                <ThemeToggle />
              </div>
              <a 
                href="/assets/CV_Sansan_KAMBOU.pdf" 
                download
                className="btn-primary py-2 px-6 text-sm"
              >
                {t.nav.cv}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
