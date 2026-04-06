export interface Project {
  slug: string;
  number: string;
  status: 'In Progress' | 'Live';
  title: string;
  subtitle: { en: string; fr: string };
  description: { en: string; fr: string };
  tags: string[];
  color_accent: string;
  image: string;
  architecture: { tool: string; desc: { en: string; fr: string } }[];
  challenges: { en: string[]; fr: string[] };
  learned: { en: string[]; fr: string[] };
  nextSteps: { en: string[]; fr: string[] };
  security?: { en: string[]; fr: string[] };
}

export const projects: Project[] = [
  {
    slug: 'traley',
    number: '01',
    status: 'In Progress',
    title: 'TRALEY Ecosystem',
    subtitle: {
      en: 'End-to-end digitalization of a bespoke tailoring studio',
      fr: "Digitalisation complète d'un studio de couture sur-mesure"
    },
    description: {
      en: 'A Flutter/Dart mobile app for internal operations (client measurements, production workflow, Firebase backend) paired with a customer-facing web platform for collections, bookings, and order tracking. Firebase Security Rules protect sensitive client data — a direct application of cybersecurity principles.',
      fr: "Une application mobile Flutter/Dart pour les opérations internes (mesures clients, flux de production, backend Firebase) couplée à une plateforme web orientée client pour les collections, les réservations et le suivi des commandes. Les règles de sécurité Firebase protègent les données sensibles des clients — une application directe des principes de cybersécurité."
    },
    tags: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'UX Design'],
    color_accent: '#00D4FF',
    image: '/assets/traley.png',
    architecture: [
      { tool: 'Flutter', desc: { en: 'Mobile Interface', fr: 'Interface Mobile' } },
      { tool: 'Firebase Auth', desc: { en: 'Secure Access', fr: 'Accès Sécurisé' } },
      { tool: 'Firestore', desc: { en: 'Real-time DB', fr: 'Base de données temps réel' } },
      { tool: 'Cloud Storage', desc: { en: 'Media Assets', fr: 'Actifs Médias' } }
    ],
    challenges: {
      en: [
        'Defining a flexible measurement schema for highly varied tailoring styles.',
        'Implementing complex Firebase Security Rules for multi-role access.',
        'Synchronizing offline data capture with live backend.'
      ],
      fr: [
        'Définir un schéma de mesure flexible pour des styles de couture variés.',
        'Implémenter des règles de sécurité Firebase complexes pour des accès multi-rôles.',
        'Synchroniser la capture de données hors ligne avec le backend en direct.'
      ]
    },
    learned: {
      en: [
        'Granular data permission management is the foundation of security.',
        'User experience for staff differs significantly from end-consumer UX.'
      ],
      fr: [
        'La gestion granulaire des permissions de données est le fondement de la sécurité.',
        "L'expérience utilisateur pour le personnel diffère de celle du consommateur final."
      ]
    },
    nextSteps: {
      en: ['Integrating AI-based measurement prediction.', 'Adding automated client notification via WhatsApp.'],
      fr: ["Intégrer la prédiction des mesures basée sur l'IA.", "Ajouter la notification client via WhatsApp."]
    },
    security: {
      en: ['Firebase Security Rules audit.', 'Identity protection for client profiles.', 'Strict data scoping.'],
      fr: ['Audit des règles de sécurité Firebase.', 'Protection de l’identité des profils clients.', 'Scoping strict des données.']
    }
  },
  {
    slug: 'clipmaker-ai',
    number: '02',
    status: 'In Progress',
    title: 'ClipMaker AI',
    subtitle: {
      en: 'Automated highlight extraction from long-form video',
      fr: 'Extraction automatisée de highlights depuis des vidéos longue durée'
    },
    description: {
      en: 'A zero-intervention Python pipeline: yt-dlp downloads the source video, FFmpeg handles processing, Faster-Whisper (large-v3-turbo) transcribes locally, and the Gemini API performs semantic analysis to identify key moments. Output clips are exported automatically. Deployed and iterated on Google Colab.',
      fr: "Un pipeline Python sans intervention : yt-dlp télécharge la vidéo source, FFmpeg gère le traitement, Faster-Whisper (large-v3-turbo) transcrit localement et l'API Gemini effectue une analyse sémantique pour identifier les moments clés. Les clips de sortie sont exportés automatiquement. Déployé sur Google Colab."
    },
    tags: ['Python', 'yt-dlp', 'FFmpeg', 'Faster-Whisper', 'Gemini API', 'Google Colab'],
    color_accent: '#00FFB3',
    image: '/assets/clipmaker.png',
    architecture: [
      { tool: 'yt-dlp', desc: { en: 'Source Fetcher', fr: 'Récupérateur Source' } },
      { tool: 'FFmpeg', desc: { en: 'Audio Extractor', fr: 'Extracteur Audio' } },
      { tool: 'Faster-Whisper', desc: { en: 'Local Transcriber', fr: 'Transcripteur Local' } },
      { tool: 'Gemini API', desc: { en: 'Semantic Analysis', fr: 'Analyse Sémantique' } },
      { tool: 'FFmpeg', desc: { en: 'Clip Export', fr: 'Export de Clip' } }
    ],
    challenges: {
      en: [
        'Handling audio quality variations across different sources.',
        'Optimizing local inference speeds for Faster-Whisper on consumer GPUs.',
        'Fine-tuning Gemini prompts for precise timestamp detection.'
      ],
      fr: [
        'Gérer les variations de qualité audio selon les sources.',
        'Optimiser la vitesse d’inférence locale de Faster-Whisper sur GPU grand public.',
        'Affiner les prompts Gemini pour une détection précise des horodatages.'
      ]
    },
    learned: {
      en: [
        'Local model hosting (Whisper) drastically reduces costs vs API calls.',
        'Semantic chunking is more accurate than simple duration-based split.'
      ],
      fr: [
        'L’hébergement local (Whisper) réduit les coûts par rapport aux appels API.',
        'Le chunking sémantique est plus précis que le découpage par durée.'
      ]
    },
    nextSteps: {
      en: ['Adding face-tracking for auto-reframe to 9:16.', 'Multi-language translation of highlights.'],
      fr: ['Ajouter le tracking de visage pour l’auto-reframe en 9:16.', 'Traduction multi-langue des highlights.']
    }
  },
  {
    slug: 'chadah-academy',
    number: '03',
    status: 'Live',
    title: 'Chadah Academy Pipeline',
    subtitle: {
      en: 'AI-generated curriculum for a music e-learning platform',
      fr: 'Génération automatique de curriculum pour une plateforme e-learning musicale'
    },
    description: {
      en: 'An automated pedagogical content pipeline for a Christian music e-learning platform in Casablanca. YouTube videos are transcribed locally via Faster-Whisper, then processed by Gemini Flash to produce 7 structured pedagogical columns across 7 disciplines: Singing, Piano, Guitar, Sound Engineering, Worship Leading, Composition, Administration.',
      fr: "Un pipeline de contenu pédagogique automatisé pour une plateforme d'apprentissage de la musique chrétienne à Casablanca. Les vidéos YouTube sont transcrites localement via Faster-Whisper, puis traitées par Gemini Flash pour produire 7 colonnes pédagogiques structurées à travers 7 disciplines : Chant, Piano, Guitare, Ingénierie du Son, Conduite de Louange, Composition, Administration."
    },
    tags: ['Python', 'Faster-Whisper', 'Gemini Flash', 'NLP', 'Curriculum Design'],
    color_accent: '#FFB300',
    image: '/assets/chadah.png',
    architecture: [
      { tool: 'Faster-Whisper', desc: { en: 'Transcription', fr: 'Transcription' } },
      { tool: 'Gemini Flash', desc: { en: 'Curriculum Gen', fr: 'Génération Curriculum' } },
      { tool: 'Markdown', desc: { en: 'Structured Output', fr: 'Sortie Structurée' } }
    ],
    challenges: {
      en: [
        'Extracting specific music terminology in French and Arabic.',
        'Maintaining consistent structure across 7 different disciplines.',
        'Reducing hallucinations in technical sound engineering topics.'
      ],
      fr: [
        'Extraire la terminologie musicale spécifique en français et arabe.',
        'Maintenir une structure cohérente sur 7 disciplines différentes.',
        'Réduire les hallucinations sur les sujets techniques d’ingénierie du son.'
      ]
    },
    learned: {
      en: [
        'Gemini Flash is ideal for cost-efficient bulk text processing.',
        'Few-shot prompting is essential for maintaining strict pedagogical tone.'
      ],
      fr: [
        'Gemini Flash est idéal pour le traitement de texte en masse.',
        'Le few-shot prompting est essentiel pour maintenir un ton pédagogique strict.'
      ]
    },
    nextSteps: {
      en: ['Automating quiz generation from transcription.', 'Integration with a custom CMS.'],
      fr: ['Automatiser la génération de quiz à partir de la transcription.', 'Intégration avec un CMS personnalisé.']
    }
  },
  {
    slug: 'content-pipeline',
    number: '04',
    status: 'Live',
    title: 'Automated Content Production Pipeline',
    subtitle: {
      en: 'Recurring generation and multi-channel distribution of structured content',
      fr: 'Génération récurrente et distribution multi-canal de contenu structuré'
    },
    description: {
      en: 'A modular content automation pipeline: structured .docx document production, platform-ready messages for distribution channels (WhatsApp, social), and a long-form audio processing pipeline (compression, format conversion, voice optimization via fre:ac/LAME). Reusable and adaptable to any organization or recurring content workflow.',
      fr: "Un pipeline modulaire d'automatisation de contenu : production structurée de documents .docx, messages adaptés pour les canaux de distribution (WhatsApp, réseaux sociaux) et traitement audio longue durée (compression, conversion de format, optimisation vocale via fre:ac/LAME). Réutilisable et adaptable à toute organisation ou flux de production de contenu récurrent."
    },
    tags: ['Python-docx', 'FFmpeg', 'fre:ac/LAME', 'Automation', 'Content Distribution'],
    color_accent: '#FF6B6B',
    image: '/assets/content.png',
    architecture: [
      { tool: 'Python-docx', desc: { en: 'Doc Generation', fr: 'Génération Doc' } },
      { tool: 'LAME', desc: { en: 'Audio Optimization', fr: 'Optimisation Audio' } },
      { tool: 'Webhooks', desc: { en: 'Distribution', fr: 'Distribution' } }
    ],
    challenges: {
      en: [
        'Normalizing voice levels in low-budget field recordings.',
        'Preserving document formatting during automated injection.',
        'Building a generic config system for multiple platforms.'
      ],
      fr: [
        'Normaliser les niveaux de voix dans des enregistrements de terrain.',
        'Préserver le formatage du document pendant l’injection automatique.',
        'Construire un système de config générique pour plusieurs plateformes.'
      ]
    },
    learned: {
      en: [
        'CLI tools (LAME/FFmpeg) are far more reliable than GUI equivalents for mass processing.',
        'Automation is only as good as the input validation.'
      ],
      fr: [
        'Les outils CLI sont bien plus fiables que les interfaces graphiques pour le traitement de masse.',
        "L'automatisation ne vaut que par la validation des entrées."
      ]
    },
    nextSteps: {
      en: ['Adding automated video summary generation.', 'Secure cloud archiving integration.'],
      fr: ['Ajouter la génération automatique de résumés vidéo.', 'Intégration de l’archivage cloud sécurisé.']
    }
  }
];
