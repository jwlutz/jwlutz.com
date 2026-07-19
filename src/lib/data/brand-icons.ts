import type { IconifyIcon } from '@iconify/types';
import aws from '@iconify-icons/logos/aws';
import cplusplus from '@iconify-icons/logos/c-plusplus';
import docker from '@iconify-icons/logos/docker-icon';
import fastapi from '@iconify-icons/logos/fastapi-icon';
import git from '@iconify-icons/logos/git-icon';
import github from '@iconify-icons/logos/github-icon';
import go from '@iconify-icons/logos/go';
import google from '@iconify-icons/logos/google-icon';
import javascript from '@iconify-icons/logos/javascript';
import linux from '@iconify-icons/logos/linux-tux';
import numpy from '@iconify-icons/logos/numpy';
import nvidia from '@iconify-icons/logos/nvidia';
import pandas from '@iconify-icons/logos/pandas-icon';
import postgresql from '@iconify-icons/logos/postgresql';
import python from '@iconify-icons/logos/python';
import pytorch from '@iconify-icons/logos/pytorch-icon';
import react from '@iconify-icons/logos/react';
import redis from '@iconify-icons/logos/redis';
import rlang from '@iconify-icons/logos/r-lang';
import sqlite from '@iconify-icons/logos/sqlite';
import streamlit from '@iconify-icons/logos/streamlit';
import supabase from '@iconify-icons/logos/supabase-icon';
import svelte from '@iconify-icons/logos/svelte-icon';
import typescript from '@iconify-icons/logos/typescript-icon';

export const brandIcons: Record<string, IconifyIcon> = {
	Python: python,
	TypeScript: typescript,
	JavaScript: javascript,
	R: rlang,
	Go: go,
	'C++': cplusplus,
	Svelte: svelte,
	SvelteKit: svelte,
	React: react,
	PyTorch: pytorch,
	NumPy: numpy,
	pandas,
	FastAPI: fastapi,
	PostgreSQL: postgresql,
	SQLite: sqlite,
	Redis: redis,
	Supabase: supabase,
	Docker: docker,
	AWS: aws,
	'AWS S3': aws,
	Linux: linux,
	Git: git,
	GitHub: github,
	Streamlit: streamlit,
	CUDA: nvidia,
	'Google OR-Tools': google
};

export function getBrandIcon(tech: string): IconifyIcon | null {
	return brandIcons[tech] ?? null;
}
