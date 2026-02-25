<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { prefersReducedMotion } from '$lib/stores/mediaQuery';
	import {
		KEYBOARD_SKILLS_ARRAY,
		KEYBOARD_SKILLS,
		KEYBOARD_ROWS,
		KEYBOARD_COLS,
		type KeyboardSkill
	} from '$lib/data/keyboard-skills';

	// State
	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let isInView = $state(false);
	let isLoading = $state(true);
	let loadError = $state<string | null>(null);
	let selectedSkill = $state<KeyboardSkill | null>(null);
	let hoveredSkill = $state<string | null>(null);

	// Three.js references
	let THREE: any = null;
	let scene: any = null;
	let camera: any = null;
	let renderer: any = null;
	let controls: any = null;
	let keyboardGroup: any = null;
	let keycapMeshes: Map<string, any> = new Map();
	let raycaster: any = null;
	let mouse: any = null;
	let animationId: number | null = null;
	let observer: IntersectionObserver | null = null;
	let clock: any = null;
	let isDragging = false;
	let unsubscribeReducedMotion: (() => void) | null = null;
	let reducedMotionEnabled = false;

	// Audio
	let audioContext: AudioContext | null = null;
	let pressBuffer: AudioBuffer | null = null;
	let releaseBuffer: AudioBuffer | null = null;

	// Helper to determine if a hex color is dark (for text contrast)
	function isColorDark(hexColor: string): boolean {
		const hex = hexColor.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		// Using relative luminance formula
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance < 0.5;
	}

	// Keyboard dimensions - bigger keys, minimal gaps for tight fit
	const KEY_SIZE = 1.25;
	const KEY_HEIGHT = 0.5;
	const KEY_GAP = 0.04;
	const BOARD_PADDING = 0.35;
	const BOARD_HEIGHT = 0.25;

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
			gain.gain.value = 0.3;
			source.connect(gain);
			gain.connect(audioContext.destination);
			source.start(0);
		} catch (e) {}
	}

	async function loadThree() {
		if (!canvas) return;
		isLoading = true;
		loadError = null;

		try {
			THREE = await import('three');
			const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
			const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

			clock = new THREE.Clock();

			// Scene with transparent background
			scene = new THREE.Scene();
			scene.background = null;

			// Camera - top-down angled view
			const aspect = canvas.clientWidth / canvas.clientHeight;
			camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
			camera.position.set(0, 10, 7);
			camera.lookAt(0, 0, 0);

			// Renderer with transparency
			renderer = new THREE.WebGLRenderer({
				canvas,
				antialias: true,
				alpha: true
			});
			renderer.setClearColor(0x000000, 0);
			renderer.setSize(canvas.clientWidth, canvas.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFShadowMap;
			// No tone mapping to preserve vibrant colors
			renderer.toneMapping = THREE.NoToneMapping;

			// OrbitControls for rotation/zoom
			controls = new OrbitControls(camera, canvas);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.enablePan = false;
			controls.minDistance = 10;
			controls.maxDistance = 18;
			controls.minPolarAngle = Math.PI / 6;
			controls.maxPolarAngle = Math.PI / 2.2;
			controls.target.set(0, 0, 0);

			// Auto-rotate when idle (respects reduced motion)
			reducedMotionEnabled = get(prefersReducedMotion);
			controls.autoRotate = !reducedMotionEnabled;
			controls.autoRotateSpeed = 0.5;

			// Pause auto-rotate during interaction, resume after
			controls.addEventListener('start', () => {
				isDragging = false;
				controls.autoRotate = false;
			});
			controls.addEventListener('change', () => { isDragging = true; });
			controls.addEventListener('end', () => {
				if (!reducedMotionEnabled) {
					controls.autoRotate = true;
				}
			});

			// Subscribe to reduced motion changes
			unsubscribeReducedMotion = prefersReducedMotion.subscribe(value => {
				reducedMotionEnabled = value;
				if (controls) controls.autoRotate = !value;
			});

			// Ambient light - brighter for vibrant colors
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
			scene.add(ambientLight);

			// Main light from top-right - bright white
			const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
			mainLight.position.set(6, 15, 8);
			mainLight.castShadow = true;
			mainLight.shadow.mapSize.width = 1024;
			mainLight.shadow.mapSize.height = 1024;
			mainLight.shadow.camera.near = 1;
			mainLight.shadow.camera.far = 35;
			mainLight.shadow.camera.left = -12;
			mainLight.shadow.camera.right = 12;
			mainLight.shadow.camera.top = 12;
			mainLight.shadow.camera.bottom = -12;
			mainLight.shadow.bias = -0.0001;
			scene.add(mainLight);

			// Fill light from left
			const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
			fillLight.position.set(-10, 8, -5);
			scene.add(fillLight);

			// Rim light from back
			const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
			rimLight.position.set(0, 4, -12);
			scene.add(rimLight);

			// Keyboard group - slight rotation for visual interest
			keyboardGroup = new THREE.Group();
			keyboardGroup.rotation.y = -0.3; // Rotate slightly for angled view
			scene.add(keyboardGroup);

			// Dimensions
			const totalWidth = KEYBOARD_COLS * (KEY_SIZE + KEY_GAP) - KEY_GAP + BOARD_PADDING * 2;
			const totalDepth = KEYBOARD_ROWS * (KEY_SIZE + KEY_GAP) - KEY_GAP + BOARD_PADDING * 2;

			// Keyboard base - sleek dark aluminum look
			const baseGeometry = new RoundedBoxGeometry(totalWidth, BOARD_HEIGHT, totalDepth, 4, 0.15);
			const baseMaterial = new THREE.MeshStandardMaterial({
				color: 0x151520,
				metalness: 0.7,
				roughness: 0.3
			});
			const base = new THREE.Mesh(baseGeometry, baseMaterial);
			base.position.y = -BOARD_HEIGHT / 2 - 0.08;
			base.receiveShadow = true;
			base.castShadow = true;
			keyboardGroup.add(base);

			// Starting position
			const startX = -(totalWidth / 2) + BOARD_PADDING + KEY_SIZE / 2;
			const startZ = -(totalDepth / 2) + BOARD_PADDING + KEY_SIZE / 2;

			// Create keycaps
			for (const skill of KEYBOARD_SKILLS_ARRAY) {
				const x = startX + skill.col * (KEY_SIZE + KEY_GAP);
				const z = startZ + skill.row * (KEY_SIZE + KEY_GAP);

				const keycapGroup = new THREE.Group();
				keycapGroup.position.set(x, 0, z);
				keycapGroup.name = skill.name;

				const color = new THREE.Color(skill.color);

				// Check if this is a very dark/black color (for black logos like GitHub, Next.js, Vercel)
				const hsl = { h: 0, s: 0, l: 0 };
				color.getHSL(hsl);
				const isVeryDark = hsl.l < 0.15;

				// Super saturated, vibrant colors
				const vibrantColor = color.clone();
				if (isVeryDark) {
					// Keep dark keys dark but add slight color
					vibrantColor.setHSL(hsl.h, Math.min(hsl.s + 0.1, 1), 0.12);
				} else {
					// SUPER saturated and vibrant - boost saturation a lot, keep brightness
					vibrantColor.setHSL(hsl.h, Math.min(hsl.s + 0.5, 1), Math.min(hsl.l + 0.05, 0.55));
				}

				// Keycap body - bigger keys that fill the space
				const keycapGeometry = new RoundedBoxGeometry(KEY_SIZE * 0.96, KEY_HEIGHT, KEY_SIZE * 0.96, 6, 0.1);
				const keycapMaterial = new THREE.MeshStandardMaterial({
					color: vibrantColor,
					metalness: 0.2,
					roughness: 0.15,
					emissive: vibrantColor,
					emissiveIntensity: isVeryDark ? 0.03 : 0.2
				});
				const keycap = new THREE.Mesh(keycapGeometry, keycapMaterial);
				keycap.position.y = KEY_HEIGHT / 2;
				keycap.castShadow = true;
				keycap.receiveShadow = true;
				keycapGroup.add(keycap);

				// Glossy top surface for the keycap - bright and shiny
				const topSurfaceGeometry = new THREE.PlaneGeometry(KEY_SIZE * 0.88, KEY_SIZE * 0.88);
				const topSurfaceMaterial = new THREE.MeshStandardMaterial({
					color: vibrantColor,
					metalness: 0.3,
					roughness: 0.05,
					emissive: vibrantColor,
					emissiveIntensity: isVeryDark ? 0.02 : 0.15
				});
				const topSurface = new THREE.Mesh(topSurfaceGeometry, topSurfaceMaterial);
				topSurface.rotation.x = -Math.PI / 2;
				topSurface.position.y = KEY_HEIGHT + 0.002;
				keycapGroup.add(topSurface);

				// Logo on top - bigger size
				const logoSize = KEY_SIZE * 0.65;
				const logoGeometry = new THREE.PlaneGeometry(logoSize, logoSize);
				const logoMaterial = new THREE.MeshBasicMaterial({
					transparent: true,
					opacity: 1,
					side: THREE.FrontSide,
					depthWrite: false
				});
				const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
				logoMesh.rotation.x = -Math.PI / 2;
				logoMesh.position.y = KEY_HEIGHT + 0.008;
				keycapGroup.add(logoMesh);

				// Load logo with white outline
				loadLogoTexture(skill.icon, logoMaterial, skill.label, skill.color, skill.name);

				keyboardGroup.add(keycapGroup);
				keycapMeshes.set(skill.name, {
					group: keycapGroup,
					keycap,
					keycapMaterial,
					originalY: 0,
					targetY: 0,
					color: color
				});
			}

			// Raycaster
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2();

			// Events
			canvas.addEventListener('mousemove', onMouseMove);
			canvas.addEventListener('click', onClick);
			canvas.addEventListener('mouseleave', onMouseLeave);
			window.addEventListener('resize', onResize);

			animate();
			isLoading = false;
		} catch (e) {
			console.error('Failed to load Three.js:', e);
			loadError = `Failed to load 3D keyboard: ${e instanceof Error ? e.message : String(e)}`;
			isLoading = false;
		}
	}

	function loadLogoTexture(url: string, material: any, label: string, skillColor: string, skillName: string) {
		const img = new Image();
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const cvs = document.createElement('canvas');
			const size = 512;
			cvs.width = size;
			cvs.height = size;
			const ctx = cvs.getContext('2d');

			if (ctx) {
				ctx.clearRect(0, 0, size, size);

				// Python gets bigger logo
				const baseScale = skillName === 'python' ? 0.9 : 0.8;
				const scale = Math.min(size / img.width, size / img.height) * baseScale;
				const w = img.width * scale;
				const h = img.height * scale;
				const x = (size - w) / 2;
				const y = (size - h) / 2;

				// Create white outline by drawing offset versions
				const outlineWidth = 10;
				for (let ox = -outlineWidth; ox <= outlineWidth; ox += 2) {
					for (let oy = -outlineWidth; oy <= outlineWidth; oy += 2) {
						if (Math.sqrt(ox*ox + oy*oy) <= outlineWidth) {
							ctx.drawImage(img, x + ox, y + oy, w, h);
						}
					}
				}

				// Make outline white
				ctx.globalCompositeOperation = 'source-in';
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(0, 0, size, size);

				// Draw the original logo on top
				ctx.globalCompositeOperation = 'source-over';
				ctx.drawImage(img, x, y, w, h);

				const texture = new THREE.CanvasTexture(cvs);
				texture.needsUpdate = true;
				texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
				material.map = texture;
				material.needsUpdate = true;
			}
		};

		img.onerror = () => {
			// Fallback: styled letter with white outline
			const cvs = document.createElement('canvas');
			const size = 512;
			cvs.width = size;
			cvs.height = size;
			const ctx = cvs.getContext('2d');

			if (ctx) {
				ctx.clearRect(0, 0, size, size);

				let text = label.charAt(0);
				if (label.includes(' ')) {
					text = label.split(' ').map(w => w[0]).join('').slice(0, 2);
				} else if (label.length <= 2) {
					text = label;
				}
				text = text.toUpperCase();

				ctx.font = 'bold 220px -apple-system, BlinkMacSystemFont, sans-serif';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				// White outline
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 16;
				ctx.lineJoin = 'round';
				ctx.strokeText(text, size / 2, size / 2);

				// Colored fill
				ctx.fillStyle = skillColor;
				ctx.fillText(text, size / 2, size / 2);

				const texture = new THREE.CanvasTexture(cvs);
				texture.needsUpdate = true;
				material.map = texture;
				material.needsUpdate = true;
			}
		};

		img.src = url;
	}

	function onMouseMove(event: MouseEvent) {
		if (!canvas || !raycaster || !camera || !keyboardGroup) return;

		const rect = canvas.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const keycapObjects: any[] = [];
		keycapMeshes.forEach(({ group }) => {
			group.children.forEach((child: any) => {
				if (child.isMesh) keycapObjects.push(child);
			});
		});

		const intersects = raycaster.intersectObjects(keycapObjects, false);
		let newHovered: string | null = null;

		if (intersects.length > 0) {
			const parentGroup = intersects[0].object.parent;
			if (parentGroup?.name && KEYBOARD_SKILLS[parentGroup.name]) {
				newHovered = parentGroup.name;
			}
		}

		if (newHovered !== hoveredSkill) {
			if (hoveredSkill) {
				const prev = keycapMeshes.get(hoveredSkill);
				if (prev) prev.targetY = prev.originalY;
			}

			if (newHovered) {
				const data = keycapMeshes.get(newHovered);
				if (data) {
					data.targetY = data.originalY - 0.08;
					const skill = KEYBOARD_SKILLS[newHovered];
					if (skill && selectedSkill?.name !== skill.name) {
						if (selectedSkill) playSound(releaseBuffer);
						playSound(pressBuffer);
						selectedSkill = skill;
					}
				}
			}
			hoveredSkill = newHovered;
		}
	}

	function onClick(event: MouseEvent) {
		// Don't click if user was dragging to rotate
		if (isDragging) return;
		if (!canvas || !raycaster || !camera) return;

		const rect = canvas.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const keycapObjects: any[] = [];
		keycapMeshes.forEach(({ group }) => {
			group.children.forEach((child: any) => {
				if (child.isMesh) keycapObjects.push(child);
			});
		});

		const intersects = raycaster.intersectObjects(keycapObjects, false);

		if (intersects.length > 0) {
			const parentGroup = intersects[0].object.parent;
			if (parentGroup?.name) {
				const skill = KEYBOARD_SKILLS[parentGroup.name];
				if (skill) {
					playSound(pressBuffer);
					selectedSkill = skill;
				}
			}
		}
	}

	function onMouseLeave() {
		keycapMeshes.forEach((data) => {
			data.targetY = data.originalY;
		});
		hoveredSkill = null;
		if (selectedSkill) {
			playSound(releaseBuffer);
			selectedSkill = null;
		}
	}

	function onResize() {
		if (!canvas || !camera || !renderer) return;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}

	function animate() {
		if (!renderer || !scene || !camera) return;
		animationId = requestAnimationFrame(animate);
		const delta = clock?.getDelta() || 0.016;

		// Update controls for smooth damping
		controls?.update();

		// Subtle floating animation (respects reduced motion)
		if (keyboardGroup && !reducedMotionEnabled) {
			const elapsed = clock?.getElapsedTime() || 0;
			keyboardGroup.position.y = Math.sin(elapsed * 0.8) * 0.1;
		}

		keycapMeshes.forEach((data) => {
			const diff = data.targetY - data.group.position.y;
			if (Math.abs(diff) > 0.001) {
				data.group.position.y += diff * Math.min(delta * 18, 1);
			}
		});

		renderer.render(scene, camera);
	}

	onMount(() => {
		if (!browser) return;
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isInView) {
					isInView = true;
					initAudio();
					loadThree();
				}
			},
			{ rootMargin: '200px', threshold: 0.1 }
		);
		if (container) observer.observe(container);
	});

	onDestroy(() => {
		if (!browser) return;
		observer?.disconnect();
		unsubscribeReducedMotion?.();
		if (animationId) cancelAnimationFrame(animationId);
		canvas?.removeEventListener('mousemove', onMouseMove);
		canvas?.removeEventListener('click', onClick);
		canvas?.removeEventListener('mouseleave', onMouseLeave);
		window.removeEventListener('resize', onResize);
		controls?.dispose();
		keycapMeshes.forEach(({ group }) => {
			group.traverse((obj: any) => {
				if (obj.geometry) obj.geometry.dispose();
				if (obj.material) {
					if (obj.material.map) obj.material.map.dispose();
					obj.material.dispose();
				}
			});
		});
		renderer?.dispose();
		audioContext?.close();
	});
</script>

<div class="keyboard-3d" bind:this={container}>
	{#if isLoading && isInView}
		<div class="loading-state">
			<div class="spinner"></div>
			<p>Loading keyboard...</p>
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
		<div
			class="skill-tooltip"
			class:dark-skill={isColorDark(selectedSkill.color)}
			style="--skill-color: {selectedSkill.color}"
		>
			<img
				src={selectedSkill.icon}
				alt={selectedSkill.label}
				onerror={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
			/>
			<span class="skill-name">{selectedSkill.label}</span>
		</div>
	{/if}
</div>

<style>
	.keyboard-3d {
		position: relative;
		width: 100%;
		max-width: 1100px;
		aspect-ratio: 16 / 10;
		min-height: 350px;
		max-height: 700px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.keyboard-3d {
			aspect-ratio: 4 / 3;
			min-height: 280px;
			max-height: 450px;
		}
	}

	@media (max-width: 480px) {
		.keyboard-3d {
			aspect-ratio: 1 / 1;
			min-height: 250px;
			max-height: 350px;
		}
	}

	.keyboard-canvas {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.6s ease;
		cursor: grab;
	}

	.keyboard-canvas:active {
		cursor: grabbing;
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
		color: var(--color-text-secondary, #71717a);
	}

	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid rgba(99, 102, 241, 0.2);
		border-top-color: #6366f1;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.skill-tooltip {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.25rem;
		background: rgba(15, 15, 20, 0.9);
		backdrop-filter: blur(12px);
		border: 1px solid color-mix(in srgb, var(--skill-color, #6366f1) 50%, transparent);
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		animation: tooltipIn 0.2s ease-out;
		z-index: 10;
	}

	.skill-tooltip img {
		width: 32px;
		height: 32px;
		object-fit: contain;
	}

	.skill-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--skill-color, #fff);
	}

	/* For dark skill colors, use white text for readability */
	.skill-tooltip.dark-skill .skill-name {
		color: #ffffff;
	}

	.skill-tooltip.dark-skill {
		border-color: rgba(255, 255, 255, 0.3);
	}

	@keyframes tooltipIn {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(12px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(1);
		}
	}
</style>
