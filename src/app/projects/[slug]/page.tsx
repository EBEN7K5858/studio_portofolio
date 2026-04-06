"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';
import { projects } from '@/data/projects';
import PipelineDiagram from '@/components/PipelineDiagram';

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const { lang, t } = useLang();
  
  const projectIdx = projects.findIndex(p => p.slug === slug);
  const project = projects[projectIdx];

  if (!project) return <div>Project not found</div>;

  const prevProject = projects[(projectIdx - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIdx + 1) % projects.length];

  return (
    <div className="min-h-screen">
      {/* Hero Block */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
        
        <div className="absolute top-32 left-6 md:left-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-sm font-code text-[var(--accent)] hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.projects.back}</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.08, x: 0 }}
            className="absolute right-0 bottom-24 font-headline text-[12rem] font-bold select-none pointer-events-none hidden lg:block"
          >
            {project.number}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`inline-block font-code text-[10px] px-3 py-1 mb-6 border ${project.status === 'Live' ? 'border-green-400 text-green-400' : 'border-amber-400 text-amber-400'}`}>
              {project.status === 'Live' ? t.projects.status.live : t.projects.status.inProgress}
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl">{project.subtitle[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto space-y-24">
          {/* Overview */}
          <div>
            <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.overview}</h3>
            <div className="text-lg text-[var(--text-secondary)] space-y-6 leading-relaxed">
              {project.description[lang].split('\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.architecture}</h3>
            <PipelineDiagram steps={project.architecture} />
          </div>

          {/* Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.challenges}</h3>
              <ul className="space-y-4">
                {project.challenges[lang].map((item, i) => (
                  <li key={i} className="flex items-start text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] mt-2 mr-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.learned}</h3>
              <ul className="space-y-4">
                {project.learned[lang].map((item, i) => (
                  <li key={i} className="flex items-start text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 bg-[var(--accent)] mt-2 mr-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Security (conditional) */}
          {project.security && (
            <div>
              <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.security}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.security[lang].map((item, i) => (
                  <div key={i} className="p-6 bg-[var(--bg-secondary)]/50 border border-[var(--border)]">
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <h3 className="text-[10px] font-code text-[var(--accent)] uppercase tracking-[0.2em] mb-8">{t.projects.nextSteps}</h3>
            <ul className="space-y-4">
              {project.nextSteps[lang].map((item, i) => (
                <li key={i} className="flex items-start text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 border border-[var(--accent)] mt-2 mr-4 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto flex">
          <Link 
            href={`/projects/${prevProject.slug}`}
            className="flex-1 p-12 flex flex-col items-start border-r border-[var(--border)] hover:bg-[var(--accent-dim)] transition-colors group"
          >
            <span className="text-[10px] font-code text-[var(--text-muted)] mb-2 flex items-center">
              <ChevronLeft className="w-3 h-3 mr-1" /> {t.projects.prev}
            </span>
            <span className="text-xl font-headline font-bold group-hover:text-[var(--accent)]">{prevProject.title}</span>
          </Link>
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="flex-1 p-12 flex flex-col items-end hover:bg-[var(--accent-dim)] transition-colors group text-right"
          >
            <span className="text-[10px] font-code text-[var(--text-muted)] mb-2 flex items-center">
              {t.projects.next} <ChevronRight className="w-3 h-3 ml-1" />
            </span>
            <span className="text-xl font-headline font-bold group-hover:text-[var(--accent)]">{nextProject.title}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
