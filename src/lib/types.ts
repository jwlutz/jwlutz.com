export interface Project {
	id: string;
	title: string;
	description: string;
	tech: string[];
	highlights?: string[];
	github: string | null;
	live: string | null;
	image: string | null;
	featured?: boolean;
	codeStatus?: string;
}

export interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	location: string;
	description: string[];
}

export interface Skills {
	languages: string[];
	technologies: string[];
	coursework: string[];
}

export interface Profile {
	name: string;
	tagline: string;
	subtitle: string;
	location: string;
	email: string;
	social: {
		github: string;
		linkedin: string;
	};
}
