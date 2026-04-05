export interface BlogPost {
  slug: string;
  title: { en: string; fr: string };
  date: string;
  read_time: { en: string; fr: string };
  tag: { en: string; fr: string };
  excerpt: { en: string; fr: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-before-the-brief',
    title: {
      en: 'Building before the brief: lessons from 4 real-world projects',
      fr: 'Construire avant le brief : leçons de 4 projets réels'
    },
    date: 'March 2025',
    read_time: { en: '5 min', fr: '5 min' },
    tag: { en: 'Reflection', fr: 'Réflexion' },
    excerpt: {
      en: 'What I learned shipping real systems for real clients in my first two years of engineering school...',
      fr: 'Ce que j’ai appris en livrant de vrais systèmes pour de vrais clients au cours de mes deux premières années...'
    }
  },
  {
    slug: 'gemini-api-automation',
    title: {
      en: 'How I use the Gemini API to automate content at scale',
      fr: 'Comment j’utilise l’API Gemini pour automatiser du contenu à grande échelle'
    },
    date: 'February 2025',
    read_time: { en: '7 min', fr: '7 min' },
    tag: { en: 'Technical', fr: 'Technique' },
    excerpt: {
      en: 'A deep dive into the Chadah Academy pipeline architecture...',
      fr: 'Une plongée profonde dans l’architecture du pipeline de la Chadah Academy...'
    }
  },
  {
    slug: 'firebase-security-introduction',
    title: {
      en: 'Firebase Security Rules: a builder’s introduction to access control',
      fr: 'Firebase Security Rules : introduction à la gestion des accès'
    },
    date: 'January 2025',
    read_time: { en: '4 min', fr: '4 min' },
    tag: { en: 'Security', fr: 'Sécurité' },
    excerpt: {
      en: 'How protecting client data in TRALEY taught me core cybersecurity concepts...',
      fr: 'Comment la protection des données clients dans TRALEY m’a appris les concepts de base...'
    }
  }
];
