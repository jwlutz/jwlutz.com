// Skills data for 3D keyboard - 4 rows x 6 columns
// Layout designed to showcase ML/AI, Data Science, and Full-Stack skills

export type KeyboardSkill = {
	id: number;
	name: string;
	label: string;
	shortDescription: string;
	color: string;
	icon: string;
	row: number;
	col: number;
};

// Row 1: Core Languages + Database
// Row 2: Infrastructure + ML Frameworks
// Row 3: Data Science Tools
// Row 4: Web Technologies

export const KEYBOARD_SKILLS_ARRAY: KeyboardSkill[] = [
	// === ROW 0: Languages + Database ===
	{
		id: 1,
		name: 'python',
		label: 'Python',
		shortDescription: 'The language of data science and ML',
		color: '#3776ab',
		icon: '/assets/icons/python.svg',
		row: 0,
		col: 0
	},
	{
		id: 2,
		name: 'r',
		label: 'R',
		shortDescription: 'Statistical computing and graphics',
		color: '#276dc3',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
		row: 0,
		col: 1
	},
	{
		id: 3,
		name: 'postgresql',
		label: 'PostgreSQL',
		shortDescription: 'Advanced open source database',
		color: '#4169e1',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
		row: 0,
		col: 2
	},
	{
		id: 4,
		name: 'typescript',
		label: 'TypeScript',
		shortDescription: 'Type-safe JavaScript at scale',
		color: '#3178c6',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
		row: 0,
		col: 3
	},
	{
		id: 5,
		name: 'go',
		label: 'Go',
		shortDescription: 'Simple, fast, and reliable',
		color: '#00add8',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
		row: 0,
		col: 4
	},
	{
		id: 6,
		name: 'cplusplus',
		label: 'C++',
		shortDescription: 'High-performance systems programming',
		color: '#00599c',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
		row: 0,
		col: 5
	},

	// === ROW 1: Infrastructure + ML Frameworks ===
	{
		id: 7,
		name: 'aws',
		label: 'AWS',
		shortDescription: 'Cloud computing at scale',
		color: '#ff9900',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
		row: 1,
		col: 0
	},
	{
		id: 8,
		name: 'git',
		label: 'Git',
		shortDescription: 'Distributed version control',
		color: '#f05032',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
		row: 1,
		col: 1
	},
	{
		id: 9,
		name: 'supabase',
		label: 'Supabase',
		shortDescription: 'Open source Firebase alternative',
		color: '#3fcf8e',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
		row: 1,
		col: 2
	},
	{
		id: 10,
		name: 'fastapi',
		label: 'FastAPI',
		shortDescription: 'Modern Python web framework',
		color: '#009688',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
		row: 1,
		col: 3
	},
	{
		id: 11,
		name: 'huggingface',
		label: 'Hugging Face',
		shortDescription: 'The AI community hub',
		color: '#ffcc00',
		icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
		row: 1,
		col: 4
	},
	{
		id: 12,
		name: 'pytorch',
		label: 'PyTorch',
		shortDescription: 'Deep learning framework',
		color: '#ee4c2c',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
		row: 1,
		col: 5
	},

	// === ROW 2: Data Science Tools ===
	{
		id: 13,
		name: 'pandas',
		label: 'pandas',
		shortDescription: 'Data analysis and manipulation',
		color: '#150458',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
		row: 2,
		col: 0
	},
	{
		id: 14,
		name: 'numpy',
		label: 'NumPy',
		shortDescription: 'Numerical computing with Python',
		color: '#013243',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
		row: 2,
		col: 1
	},
	{
		id: 15,
		name: 'scikitlearn',
		label: 'scikit-learn',
		shortDescription: 'Machine learning in Python',
		color: '#f7931e',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
		row: 2,
		col: 2
	},
	{
		id: 16,
		name: 'linux',
		label: 'Linux',
		shortDescription: 'Open source operating system',
		color: '#fcc624',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
		row: 2,
		col: 3
	},
	{
		id: 17,
		name: 'github',
		label: 'GitHub',
		shortDescription: 'Code collaboration platform',
		color: '#181717',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
		row: 2,
		col: 4
	},
	{
		id: 18,
		name: 'claude',
		label: 'Claude Code',
		shortDescription: 'AI-powered development',
		color: '#d4a27a',
		icon: 'https://cdn.simpleicons.org/anthropic',
		row: 2,
		col: 5
	},

	// === ROW 3: Web Technologies ===
	{
		id: 19,
		name: 'html',
		label: 'HTML',
		shortDescription: 'The backbone of the web',
		color: '#e34f26',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
		row: 3,
		col: 0
	},
	{
		id: 20,
		name: 'css',
		label: 'CSS',
		shortDescription: 'Styling the web beautifully',
		color: '#1572b6',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
		row: 3,
		col: 1
	},
	{
		id: 21,
		name: 'javascript',
		label: 'JavaScript',
		shortDescription: 'The language of the web',
		color: '#f7df1e',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
		row: 3,
		col: 2
	},
	{
		id: 22,
		name: 'svelte',
		label: 'Svelte',
		shortDescription: 'Cybernetically enhanced web apps',
		color: '#ff3e00',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
		row: 3,
		col: 3
	},
	{
		id: 23,
		name: 'nextjs',
		label: 'Next.js',
		shortDescription: 'React framework',
		color: '#000000',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
		row: 3,
		col: 4
	},
	{
		id: 24,
		name: 'vercel',
		label: 'Vercel',
		shortDescription: 'Deploy at the edge',
		color: '#000000',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
		row: 3,
		col: 5
	}
];

// Create lookup by name for quick access
export const KEYBOARD_SKILLS: Record<string, KeyboardSkill> = KEYBOARD_SKILLS_ARRAY.reduce(
	(acc, skill) => {
		acc[skill.name] = skill;
		return acc;
	},
	{} as Record<string, KeyboardSkill>
);

// Helper to get skills as array
export const getSkillsArray = () => KEYBOARD_SKILLS_ARRAY;

// Grid dimensions
export const KEYBOARD_ROWS = 4;
export const KEYBOARD_COLS = 6;
