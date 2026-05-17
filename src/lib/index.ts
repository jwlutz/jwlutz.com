// Components
export { default as Nav } from './components/Nav.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as Projects } from './components/Projects.svelte';
export { default as ProjectCard } from './components/ProjectCard.svelte';
export { default as Experience } from './components/Experience.svelte';
export { default as TechStack } from './components/TechStack.svelte';
export { default as Contact } from './components/Contact.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as Backdrop } from './components/Backdrop.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';

// Actions
export { inview } from './actions/inview';

// Types
export type { Project, ExperienceItem, Skills as SkillsData, Profile } from './types';

// All site content (profile, skills, projects, experience, consulting) is
// sourced from /content.yaml at the repo root. See src/lib/content.ts.
export { profile, skills, projects, experience, consulting } from './content';
