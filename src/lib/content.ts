// All site copy is sourced from /content.yaml at the repo root.
// Vite's `?raw` import gives us the file contents as a string at build time
// (and re-runs on HMR when the file changes), then js-yaml parses it.
import yaml from 'js-yaml';
import contentYaml from '../../content.yaml?raw';

import type {
	Project,
	ExperienceItem,
	Skills as SkillsData,
	Profile
} from './types';

interface ConsultingHero {
	title: string;
	subtitle: string;
	ctaLabel: string;
}
interface ConsultingService {
	icon: string;
	title: string;
	description: string;
	features: string[];
}
interface ConsultingWorkItem {
	id: string;
	title: string;
	description: string;
	tech: string[];
	expandable: boolean;
	examplesLabel?: string;
	examples?: { label: string; url: string }[];
}
interface ConsultingData {
	hero: ConsultingHero;
	services: { label: string; heading: string; items: ConsultingService[] };
	work: { label: string; heading: string; items: ConsultingWorkItem[] };
	cta: { heading: string; subheading: string; ctaLabel: string };
}

interface SiteContent {
	profile: Profile;
	skills: SkillsData;
	projects: Project[];
	experience: ExperienceItem[];
	consulting: ConsultingData;
}

const content = yaml.load(contentYaml) as SiteContent;

export const profile = content.profile;
export const skills = content.skills;
export const projects = content.projects;
export const experience = content.experience;
export const consulting = content.consulting;
