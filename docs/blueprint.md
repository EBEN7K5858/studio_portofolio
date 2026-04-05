# **App Name**: Eben-Ezer Kambou: Builder's Portfolio

## Core Features:

- Dynamic Content Management: Showcase projects and blog posts from local JavaScript data files, supporting dynamic routing and rendering for individual items.
- Bi-directional Localization: Enable instant switching between English and French UI strings using a simple context, with the selected language persisting across sessions.
- Themable UI (Dark/Light Mode): Allow users to toggle between a default dark mode and an alternative light mode, with their preference stored in local storage.
- Rich Interactive Animations: Implement Framer Motion for sophisticated animations including page transitions, scroll-triggered reveals, a custom cursor, and dynamic element hovers.
- Hero Section Code Typewriter Tool: Display a dynamic, faux terminal-style code snippet in the hero section that 'types out' characters one by one with a blinking cursor, providing a generative UI element.
- Frontend Contact Form: Provide a contact form that captures user input for Name, Email, and Message, displaying a success animation upon submission without requiring a backend.
- Full Responsiveness and Accessibility: Ensure the application is fully responsive using a mobile-first approach with Tailwind CSS breakpoints and meets WCAG AA accessibility standards, including reduced motion support.

## Style Guidelines:

- Primary color: A measured, technical blue (#6BA9DB), offering a sense of stability and depth while maintaining visibility against a dark backdrop, supporting the 'Surgical Minimalism' aesthetic. Its hue was derived analogous to the accent.
- Background color: A deep, almost-black blue-grey (#14181A) that creates significant negative space and a clean, unobtrusive foundation, complementing the overall dark theme and the blue tint described in the prompt. This color is a heavily desaturated variant of the primary hue.
- Accent color: A vivid, electric cyan (#00FFFF), carefully chosen to be analogous to the primary color's hue and significantly contrasting in brightness and saturation, aligning with the user's request for a sharp and modern highlight.
- Headline font: 'Space Grotesk' (sans-serif) for its razor-sharp and tech-savvy character; Body text font: 'Inter' (sans-serif) for neutral readability across all content; Monospace/code font: 'JetBrains Mono' (monospace) for displaying code snippets. Note: currently only Google Fonts are supported.
- Utilize Lucide React exclusively for all icons, favoring clean lines and a functional, uncluttered visual appeal that supports the minimalist design philosophy.
- Implement a 'Surgical Minimalism' layout characterized by ample negative space. A responsive grid system powered by Tailwind CSS ensures optimal viewing across all breakpoints (sm, md, lg, xl). Spacing follows a 4px base unit, used in carefully considered multiples for harmony and structure.
- All interactions are enhanced by Framer Motion, featuring elegant staggered fade-up on page load, subtle 150ms ease transitions for interactive elements, gentle fade and y-shift for page routing, and controlled scroll-triggered reveals (`whileInView`, `once: true`). A custom cursor dot and ring effect is also included, with all animations adhering to `useReducedMotion` preferences for accessibility.