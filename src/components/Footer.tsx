"use client";

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLang();

  const socialLinks = [
    { icon: <Mail className="w-4 h-4" />, href: 'mailto:eben.kambou@gmail.com' },
    { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/eben-ezer-kambou-63594321b' },
    { icon: <Github className="w-4 h-4" />, href: 'https://github.com/EBEN7K5858' },
  ];

  return (
    <footer className="mt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-[1px] bg-accent-20 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-code text-[var(--text-muted)]">
            {t.footer.rights}
          </div>
          
          <div className="flex items-center space-x-8 text-[10px] font-code text-[var(--text-muted)]">
            <Link href="/#about" className="hover:text-[var(--accent)] transition-colors">{t.nav.about}</Link>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">{t.nav.projects}</Link>
            <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">{t.nav.blog}</Link>
            <Link href="/#contact" className="hover:text-[var(--accent)] transition-colors">{t.nav.contact}</Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
