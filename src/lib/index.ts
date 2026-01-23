// Components
export { default as Nav } from './components/Nav.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as Projects } from './components/Projects.svelte';
export { default as ProjectCard } from './components/ProjectCard.svelte';
export { default as Experience } from './components/Experience.svelte';
export { default as Skills } from './components/Skills.svelte';
export { default as TechStack } from './components/TechStack.svelte';
export { default as Contact } from './components/Contact.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as StickyHeader } from './components/StickyHeader.svelte';
// KeyboardScene removed - using CSS-based skills grid instead

// Actions
export { inview } from './actions/inview';

// Types
export type { Project, ExperienceItem, Skills as SkillsData, Profile } from './types';

// Data
import projectsData from './data/projects.json';
import experienceData from './data/experience.json';
import skillsData from './data/skills.json';
import profileData from './data/profile.json';

export const projects = projectsData;
export const experience = experienceData;
export const skills = skillsData;
export const profile = profileData;
