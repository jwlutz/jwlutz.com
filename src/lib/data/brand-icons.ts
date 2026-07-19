import type { IconifyIcon } from '@iconify/types';
import { siClaude, siClerk, siHuggingface, siKeras, siLangchain, siN8n, siRailway, siScikitlearn } from 'simple-icons';
import aws from '@iconify-icons/logos/aws';
import airflow from '@iconify-icons/logos/airflow-icon';
import astro from '@iconify-icons/logos/astro-icon';
import bash from '@iconify-icons/logos/bash-icon';
import c from '@iconify-icons/logos/c';
import csharp from '@iconify-icons/logos/c-sharp';
import cplusplus from '@iconify-icons/logos/c-plusplus';
import css from '@iconify-icons/logos/css-3';
import docker from '@iconify-icons/logos/docker-icon';
import drizzle from '@iconify-icons/logos/drizzle-icon';
import expo from '@iconify-icons/logos/expo-icon';
import fastapi from '@iconify-icons/logos/fastapi-icon';
import figma from '@iconify-icons/logos/figma';
import git from '@iconify-icons/logos/git-icon';
import githubActions from '@iconify-icons/logos/github-actions';
import github from '@iconify-icons/logos/github-icon';
import go from '@iconify-icons/logos/go';
import google from '@iconify-icons/logos/google-icon';
import graphql from '@iconify-icons/logos/graphql';
import html from '@iconify-icons/logos/html-5';
import javascript from '@iconify-icons/logos/javascript';
import kafka from '@iconify-icons/logos/kafka-icon';
import linux from '@iconify-icons/logos/linux-tux';
import matplotlib from '@iconify-icons/logos/matplotlib-icon';
import mongodb from '@iconify-icons/logos/mongodb-icon';
import nextjs from '@iconify-icons/logos/nextjs-icon';
import nodejs from '@iconify-icons/logos/nodejs-icon';
import notion from '@iconify-icons/logos/notion-icon';
import numpy from '@iconify-icons/logos/numpy';
import nvidia from '@iconify-icons/logos/nvidia';
import obsidian from '@iconify-icons/logos/obsidian-icon';
import opencv from '@iconify-icons/logos/opencv';
import openai from '@iconify-icons/logos/openai-icon';
import pandas from '@iconify-icons/logos/pandas-icon';
import postgresql from '@iconify-icons/logos/postgresql';
import python from '@iconify-icons/logos/python';
import pytorch from '@iconify-icons/logos/pytorch-icon';
import react from '@iconify-icons/logos/react';
import redis from '@iconify-icons/logos/redis';
import rlang from '@iconify-icons/logos/r-lang';
import rust from '@iconify-icons/logos/rust';
import sentry from '@iconify-icons/logos/sentry-icon';
import solidity from '@iconify-icons/logos/solidity';
import spark from '@iconify-icons/logos/spark';
import sqlite from '@iconify-icons/logos/sqlite';
import stripe from '@iconify-icons/logos/stripe';
import streamlit from '@iconify-icons/logos/streamlit';
import supabase from '@iconify-icons/logos/supabase-icon';
import svelte from '@iconify-icons/logos/svelte-icon';
import swift from '@iconify-icons/logos/swift';
import tensorflow from '@iconify-icons/logos/tensorflow';
import threejs from '@iconify-icons/logos/threejs';
import typescript from '@iconify-icons/logos/typescript-icon';
import vercel from '@iconify-icons/logos/vercel-icon';
import vite from '@iconify-icons/logos/vitejs';
import vscode from '@iconify-icons/logos/visual-studio-code';
import websocket from '@iconify-icons/logos/websocket';

function fromSimpleIcon(icon: { hex: string; path: string }): IconifyIcon {
	const fill = ['000000', '181717'].includes(icon.hex.toUpperCase()) ? 'currentColor' : `#${icon.hex}`;
	return { body: `<path fill="${fill}" d="${icon.path}"/>`, width: 24, height: 24 };
}

export const brandIcons: Record<string, IconifyIcon> = {
	Python: python,
	TypeScript: typescript,
	JavaScript: javascript,
	R: rlang,
	Go: go,
	'C++': cplusplus,
	C: c,
	'C#': csharp,
	Rust: rust,
	Bash: bash,
	Solidity: solidity,
	Swift: swift,
	Svelte: svelte,
	SvelteKit: svelte,
	Vite: vite,
	React: react,
	'Node.js': nodejs,
	'Next.js': nextjs,
	HTML: html,
	CSS: css,
	Expo: expo,
	Astro: astro,
	WebSockets: websocket,
	'Three.js': threejs,
	PyTorch: pytorch,
	TensorFlow: tensorflow,
	'scikit-learn': fromSimpleIcon(siScikitlearn),
	matplotlib,
	'Hugging Face': fromSimpleIcon(siHuggingface),
	LangChain: fromSimpleIcon(siLangchain),
	OpenCV: opencv,
	Keras: fromSimpleIcon(siKeras),
	'Apache Spark': spark,
	Airflow: airflow,
	NumPy: numpy,
	pandas,
	FastAPI: fastapi,
	PostgreSQL: postgresql,
	SQLite: sqlite,
	Redis: redis,
	MongoDB: mongodb,
	Vercel: vercel,
	Railway: fromSimpleIcon(siRailway),
	GraphQL: graphql,
	Supabase: supabase,
	Docker: docker,
	AWS: aws,
	'AWS S3': aws,
	Linux: linux,
	Kafka: kafka,
	Drizzle: drizzle,
	Git: git,
	GitHub: github,
	'Claude Code': fromSimpleIcon(siClaude),
	Codex: openai,
	'VS Code': vscode,
	'GitHub Actions': githubActions,
	Sentry: sentry,
	Figma: figma,
	Clerk: fromSimpleIcon(siClerk),
	Stripe: stripe,
	Obsidian: obsidian,
	Notion: notion,
	n8n: fromSimpleIcon(siN8n),
	Streamlit: streamlit,
	CUDA: nvidia,
	'Google OR-Tools': google
};

export function getBrandIcon(tech: string): IconifyIcon | null {
	return brandIcons[tech] ?? null;
}
