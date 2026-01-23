<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Application, type SPEObject } from '@splinetool/runtime';
	import { KEYBOARD_SKILLS, type KeyboardSkill } from '$lib/data/keyboard-skills';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register GSAP plugins
	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	// Props
	interface Props {
		splineUrl?: string;
	}

	let { splineUrl = '/assets/skills-keyboard.spline' }: Props = $props();

	// State
	let canvas: HTMLCanvasElement;
	let splineApp: Application | null = $state(null);
	let selectedSkill: KeyboardSkill | null = $state(null);
	let isLoaded = $state(false);
	let activeSection = $state<'hero' | 'skills' | 'experience' | 'projects' | 'contact'>('hero');

	// Web Audio API for sounds (like reference)
	let audioContext: AudioContext | null = null;
	let pressBuffer: AudioBuffer | null = null;
	let releaseBuffer: AudioBuffer | null = null;

	async function initSounds() {
		try {
			const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
			if (!AudioContextClass) return;

			audioContext = new AudioContextClass();

			// Load press sound
			const pressResponse = await fetch('/assets/keycap-sounds/press.mp3');
			const pressArrayBuffer = await pressResponse.arrayBuffer();
			pressBuffer = await audioContext.decodeAudioData(pressArrayBuffer);

			// Load release sound
			const releaseResponse = await fetch('/assets/keycap-sounds/release.mp3');
			const releaseArrayBuffer = await releaseResponse.arrayBuffer();
			releaseBuffer = await audioContext.decodeAudioData(releaseArrayBuffer);
		} catch (error) {
			console.error('Failed to load keycap sounds', error);
		}
	}

	function playSoundBuffer(buffer: AudioBuffer | null, baseDetune = 0) {
		try {
			if (!audioContext || !buffer) return;

			// Resume if suspended (browser autoplay policy)
			if (audioContext.state === 'suspended') {
				audioContext.resume();
			}

			const source = audioContext.createBufferSource();
			source.buffer = buffer;

			// Add slight pitch variation for realism
			source.detune.value = baseDetune + (Math.random() * 200 - 100);

			const gainNode = audioContext.createGain();
			gainNode.gain.value = 0.4;

			source.connect(gainNode);
			gainNode.connect(audioContext.destination);

			source.start(0);
		} catch (err) {
			console.error('Sound playback error:', err);
		}
	}

	function playPressSound() {
		playSoundBuffer(pressBuffer);
	}

	function playReleaseSound() {
		playSoundBuffer(releaseBuffer);
	}

	// Keyboard state configs for different sections
	// Page order: Hero -> Skills -> Experience -> Projects -> Contact
	// Keyboard stays visible in all sections (like reference)
	const KEYBOARD_STATES = {
		hero: {
			// Small in corner during hero
			scale: { x: 0.20, y: 0.20, z: 0.20 },
			position: { x: 225, y: -100, z: 0 },
			rotation: { x: 0, y: 0, z: 0 }
		},
		skills: {
			// Main showcase - centered and interactive
			scale: { x: 0.25, y: 0.25, z: 0.25 },
			position: { x: 0, y: -40, z: 0 },
			rotation: { x: 0, y: Math.PI / 12, z: 0 }
		},
		experience: {
			// Tilted view during experience
			scale: { x: 0.22, y: 0.22, z: 0.22 },
			position: { x: 0, y: -40, z: 0 },
			rotation: { x: Math.PI / 12, y: -Math.PI / 4, z: 0 }
		},
		projects: {
			// Flipped view during projects (like reference)
			scale: { x: 0.25, y: 0.25, z: 0.25 },
			position: { x: 0, y: -40, z: 0 },
			rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI }
		},
		contact: {
			// Small in corner during contact
			scale: { x: 0.2, y: 0.2, z: 0.2 },
			position: { x: 350, y: -250, z: 0 },
			rotation: { x: 0, y: 0, z: 0 }
		}
	};

	// Get responsive scale offset
	function getScaleOffset(): number {
		if (typeof window === 'undefined') return 1;
		const width = window.innerWidth;
		const isMobile = width < 768;
		const refWidth = isMobile ? 390 : 1280;
		const targetScale = width / refWidth;
		const minScale = isMobile ? 0.5 : 0.5;
		const maxScale = isMobile ? 0.6 : 1.15;
		return Math.min(Math.max(targetScale, minScale), maxScale);
	}

	// Get current keyboard state with responsive scaling
	function getKeyboardState(section: typeof activeSection) {
		const baseState = KEYBOARD_STATES[section];
		const scaleOffset = getScaleOffset();
		return {
			...baseState,
			scale: {
				x: Math.abs(baseState.scale.x * scaleOffset),
				y: Math.abs(baseState.scale.y * scaleOffset),
				z: Math.abs(baseState.scale.z * scaleOffset)
			}
		};
	}

	// Handle mouse hover on keycaps
	function handleMouseHover(e: { target: { name: string } }) {
		if (!splineApp || activeSection !== 'skills') return;

		const targetName = e.target.name;
		if (targetName === 'body' || targetName === 'platform' || targetName === 'keyboard') {
			if (selectedSkill) {
				playReleaseSound();
			}
			selectedSkill = null;
			return;
		}

		const skill = KEYBOARD_SKILLS[targetName];
		if (skill && skill.name !== selectedSkill?.name) {
			if (selectedSkill) {
				playReleaseSound();
			}
			playPressSound();
			selectedSkill = skill;
		}
	}

	// Handle mouse click on keycaps
	function handleMouseDown(e: { target: { name: string } }) {
		if (!splineApp || activeSection !== 'skills') return;

		const targetName = e.target.name;
		const skill = KEYBOARD_SKILLS[targetName];
		if (skill) {
			playPressSound();
			selectedSkill = skill;
		}
	}

	// Setup scroll-triggered section transitions
	// Page order: Hero -> Skills -> Experience -> Projects -> Contact
	function setupScrollAnimations() {
		if (!splineApp) return;

		const kbd = splineApp.findObjectByName('keyboard');
		if (!kbd) {
			console.warn('Keyboard object not found in Spline scene');
			return;
		}

		// Set initial state
		const heroState = getKeyboardState('hero');
		gsap.set(kbd.scale, heroState.scale);
		gsap.set(kbd.position, heroState.position);
		gsap.set(kbd.rotation, heroState.rotation);

		// Hero -> Skills transition
		ScrollTrigger.create({
			trigger: '#skills',
			start: 'top 70%',
			end: 'top 20%',
			onEnter: () => {
				activeSection = 'skills';
				const state = getKeyboardState('skills');
				gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: 'elastic.out(1, 0.5)' });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			},
			onLeaveBack: () => {
				activeSection = 'hero';
				const state = getKeyboardState('hero');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
				selectedSkill = null;
			}
		});

		// Skills -> Experience transition
		ScrollTrigger.create({
			trigger: '#experience',
			start: 'top 70%',
			end: 'top 30%',
			onEnter: () => {
				activeSection = 'experience';
				const state = getKeyboardState('experience');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
				selectedSkill = null;
			},
			onLeaveBack: () => {
				activeSection = 'skills';
				const state = getKeyboardState('skills');
				gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: 'elastic.out(1, 0.5)' });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			}
		});

		// Experience -> Projects transition
		ScrollTrigger.create({
			trigger: '#projects',
			start: 'top 70%',
			end: 'top 30%',
			onEnter: () => {
				activeSection = 'projects';
				const state = getKeyboardState('projects');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			},
			onLeaveBack: () => {
				activeSection = 'experience';
				const state = getKeyboardState('experience');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			}
		});

		// Projects -> Contact transition
		ScrollTrigger.create({
			trigger: '#contact',
			start: 'top 50%',
			onEnter: () => {
				activeSection = 'contact';
				const state = getKeyboardState('contact');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			},
			onLeaveBack: () => {
				activeSection = 'projects';
				const state = getKeyboardState('projects');
				gsap.to(kbd.scale, { ...state.scale, duration: 1 });
				gsap.to(kbd.position, { ...state.position, duration: 1 });
				gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
			}
		});
	}

	// Helper to wait
	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Initialize Spline
	async function initSpline() {
		if (!canvas) return;

		try {
			const app = new Application(canvas);
			await app.load(splineUrl);

			splineApp = app;
			isLoaded = true;

			// Initialize sounds
			initSounds();

			// Setup event listeners
			app.addEventListener('mouseHover', handleMouseHover);
			app.addEventListener('mouseDown', handleMouseDown);

			// Get all objects to find keycaps
			const allObjects = app.getAllObjects();
			console.log(
				'All Spline objects:',
				allObjects.map((o) => o.name)
			);

			// Make keyboard visible
			const kbd = app.findObjectByName('keyboard');
			console.log('Keyboard found:', !!kbd);
			if (kbd) {
				kbd.visible = true;

				// Reveal animation for keyboard
				const heroState = getKeyboardState('hero');
				gsap.fromTo(
					kbd.scale,
					{ x: 0.01, y: 0.01, z: 0.01 },
					{
						...heroState.scale,
						duration: 1.5,
						ease: 'elastic.out(1, 0.6)'
					}
				);
			}

			// Wait a bit then reveal keycaps with bounce animation (like reference)
			await sleep(500);

			// Find and reveal all keycap objects with bounce animation
			const keycaps = allObjects.filter(
				(obj) =>
					obj.name === 'keycap' ||
					obj.name === 'keycap-desktop' ||
					obj.name === 'keycap-mobile' ||
					obj.name.includes('keycap')
			);

			keycaps.forEach(async (keycap, idx) => {
				await sleep(idx * 70);
				keycap.visible = true;
				// Bounce animation like reference
				gsap.fromTo(
					keycap.position,
					{ y: 200 },
					{ y: 50, duration: 0.5, delay: 0.1, ease: 'bounce.out' }
				);
			});

			// Also make sure all the key containers are visible
			const keyContainers = allObjects.filter((obj) =>
				Object.keys(KEYBOARD_SKILLS).includes(obj.name)
			);

			keyContainers.forEach((key) => {
				key.visible = true;
			});

			// Setup scroll animations after everything is visible
			await sleep(300);
			setupScrollAnimations();
		} catch (err) {
			console.error('Failed to load Spline scene:', err);
		}
	}

	onMount(() => {
		initSpline();
	});

	onDestroy(() => {
		// Cleanup
		ScrollTrigger.getAll().forEach((t) => t.kill());
		splineApp?.dispose();
		audioContext?.close();
	});
</script>

<div class="keyboard-scene fixed inset-0 z-0 {activeSection === 'skills' ? 'pointer-events-auto' : 'pointer-events-none'}">
	<canvas bind:this={canvas} class="w-full h-full"></canvas>

	{#if !isLoaded}
		<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
			<div class="text-gray-400 animate-pulse">Loading 3D scene...</div>
		</div>
	{/if}
</div>

<!-- Skill tooltip overlay -->
{#if selectedSkill && activeSection === 'skills'}
	<div
		class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none
           bg-surface/90 backdrop-blur-sm border border-border rounded-xl
           px-6 py-4 shadow-xl transition-all duration-300"
	>
		<div class="flex items-center gap-4">
			<img src={selectedSkill.icon} alt={selectedSkill.label} class="w-10 h-10" />
			<div>
				<h3 class="font-semibold text-lg" style="color: {selectedSkill.color}">
					{selectedSkill.label}
				</h3>
				<p class="text-text-secondary text-sm">{selectedSkill.shortDescription}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.keyboard-scene {
		perspective: 1000px;
	}
</style>
