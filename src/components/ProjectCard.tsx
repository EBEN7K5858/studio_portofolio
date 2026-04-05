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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link 
        href={`/projects/${project.slug}`} 
        className="group block h-full glass rounded-[var(--radius)] overflow-hidden transition-all duration-500 hover:shadow-[var(--accent-glow)] hover:-translate-y-2 p-3"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius)-0.75rem)]">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-5 left-5 font-code text-xs text-[var(--accent)] glass px-3 py-1.5 rounded-full">
            {project.number}
          </div>
          <div className={`absolute top-5 right-5 font-code text-[10px] px-3 py-1.5 rounded-full glass ${project.status === 'Live' ? 'text-green-400' : 'text-amber-400'}`}>
            {project.status === 'Live' ? t.projects.status.live : t.projects.status.inProgress}
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="text-2xl font-headline font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="text-base text-[var(--text-secondary)] mb-8 line-clamp-2 leading-relaxed">
            {project.subtitle[lang]}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="skill-tag px-3 py-1 text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm font-code text-[var(--accent)] font-bold">
            {t.projects.viewProject} <span className="ml-3 group-hover:translate-x-3 transition-transform text-lg">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
