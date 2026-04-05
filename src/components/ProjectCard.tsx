"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LangContext';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { lang, t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full bg-[var(--bg-surface)] border border-[var(--border)] transition-all duration-300 hover:border-accent hover:shadow-[var(--accent-glow)]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 font-code text-xs text-[var(--accent)] bg-black/40 px-2 py-1 backdrop-blur-md">
            {project.number}
          </div>
          <div className={`absolute top-4 right-4 font-code text-[10px] px-2 py-1 backdrop-blur-md ${project.status === 'Live' ? 'text-green-400' : 'text-amber-400'} bg-black/40`}>
            {project.status === 'Live' ? t.projects.status.live : t.projects.status.inProgress}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2">
            {project.subtitle[lang]}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="skill-tag scale-90 origin-left">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-xs font-code text-[var(--accent)]">
            {t.projects.viewProject} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
