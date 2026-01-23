<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { KEYBOARD_SKILLS, type KeyboardSkill } from '$lib/data/keyboard-skills';

	// State
	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let isInView = $state(false);
	let isLoading = $state(true);
	let loadError = $state<string | null>(null);
	let selectedSkill = $state<KeyboardSkill | null>(null);

	// Spline app reference (loaded dynamically)
	let splineApp: any = null;
	let observer: IntersectionObserver | null = null;

	// Audio
	let audioContext: AudioContext | null = null;
	let pressBuffer: AudioBuffer | null = null;
	let releaseBuffer: AudioBuffer | null = null;

	async function initAudio() {
		if (!browser) return;
		try {
			const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
			if (!AudioContextClass) return;

			audioContext = new AudioContextClass();

			const [pressRes, releaseRes] = await Promise.all([
				fetch('/assets/keycap-sounds/press.mp3'),
				fetch('/assets/keycap-sounds/release.mp3')
			]);

			const [pressData, releaseData] = await Promise.all([
				pressRes.arrayBuffer(),
				releaseRes.arrayBuffer()
			]);

			[pressBuffer, releaseBuffer] = await Promise.all([
				audioContext.decodeAudioData(pressData),
				audioContext.decodeAudioData(releaseData)
			]);
		} catch (e) {
			console.warn('Audio init failed:', e);
		}
	}

	function playSound(buffer: AudioBuffer | null) {
		if (!audioContext || !buffer) return;
		try {
			if (audioContext.state === 'suspended') audioContext.resume();

			const source = audioContext.createBufferSource();
			source.buffer = buffer;
			source.detune.value = Math.random() * 200 - 100;

			const gain = audioContext.createGain();
			gain.gain.value = 0.4;

			source.connect(gain);
			gain.connect(audioContext.destination);
			source.start(0);
		} catch (e) {
			// Ignore audio errors
		}
	}

	// Lazy load Spline only when in view
	async function loadSpline() {
		if (!canvas || splineApp) return;

		isLoading = true;
		loadError = null;

		try {
			// Dynamic import - only loads when needed
			const { Application } = await import('@splinetool/runtime');

			const app = new Application(canvas);
			await app.load('/assets/skills-keyboard.spline');

			splineApp = app;

			// Setup event listeners for hover/click interactions
			app.addEventListener('mouseHover', handleHover);
			app.addEventListener('mouseDown', handleClick);

			// Get all objects and make keycaps visible
			const allObjects = app.getAllObjects();
			console.log(
				'Spline objects:',
				allObjects.map((o) => o.name)
			);

			// Make all keycaps visible (they're hidden by default)
			allObjects.forEach((obj) => {
				// Show desktop keycaps and base keycaps
				if (
					obj.name === 'keycap' ||
					obj.name === 'keycap-desktop' ||
					obj.name.startsWith('keycap')
				) {
					obj.visible = true;
				}
				// Also show skill-named objects (js, ts, react, etc.)
				if (KEYBOARD_SKILLS[obj.name]) {
					obj.visible = true;
				}
			});

			isLoading = false;
		} catch (e) {
			console.error('Failed to load Spline:', e);
			loadError = 'Failed to load 3D keyboard';
			isLoading = false;
		}
	}

	function handleHover(e: { target: { name: string } }) {
		const name = e.target.name;
		if (name === 'body' || name === 'platform' || name === 'keyboard') {
			if (selectedSkill) playSound(releaseBuffer);
			selectedSkill = null;
			return;
		}

		const skill = KEYBOARD_SKILLS[name];
		if (skill && skill.name !== selectedSkill?.name) {
			if (selectedSkill) playSound(releaseBuffer);
			playSound(pressBuffer);
			selectedSkill = skill;
		}
	}

	function handleClick(e: { target: { name: string } }) {
		const skill = KEYBOARD_SKILLS[e.target.name];
		if (skill) {
			playSound(pressBuffer);
			selectedSkill = skill;
		}
	}

	onMount(() => {
		if (!browser) return;

		// Intersection Observer - only load when visible
		observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !isInView) {
					isInView = true;
					initAudio();
					loadSpline();
				}
			},
			{ rootMargin: '200px', threshold: 0.1 }
		);

		if (container) observer.observe(container);
	});

	onDestroy(() => {
		observer?.disconnect();
		splineApp?.dispose();
		audioContext?.close();
	});
</script>

<div class="keyboard-3d" bind:this={container}>
	{#if isLoading && isInView}
		<div class="loading-state">
			<div class="spinner"></div>
			<p>Loading 3D keyboard...</p>
		</div>
	{/if}

	{#if loadError}
		<div class="error-state">
			<p>{loadError}</p>
		</div>
	{/if}

	<canvas
		bind:this={canvas}
		class="keyboard-canvas"
		class:visible={!isLoading && !loadError && isInView}
	></canvas>

	{#if selectedSkill}
		<div class="skill-tooltip">
			<img src={selectedSkill.icon} alt={selectedSkill.label} />
			<div>
				<h4 style="color: {selectedSkill.color}">{selectedSkill.label}</h4>
				<p>{selectedSkill.shortDescription}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.keyboard-3d {
		position: relative;
		width: 100%;
		max-width: 1000px;
		height: 500px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	}

	.keyboard-canvas {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.5s ease;
		will-change: opacity;
	}

	.keyboard-canvas.visible {
		opacity: 1;
	}

	.loading-state,
	.error-state {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: var(--color-text-secondary);
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--color-surface);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.skill-tooltip {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-accent);
		border-radius: 12px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		animation: fadeInUp 0.3s ease;
	}

	.skill-tooltip img {
		width: 40px;
		height: 40px;
	}

	.skill-tooltip h4 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.skill-tooltip p {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
