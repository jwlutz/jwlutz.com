<script lang="ts">
	import { env } from '$env/dynamic/public';
	import TechMark from './TechMark.svelte';

	let {
		tech,
		domain,
		label = tech
	}: {
		tech: string;
		domain: string;
		label?: string;
	} = $props();

	let failed = $state(false);
	const token = $derived(env.PUBLIC_LOGO_DEV_TOKEN || '');
	const source = $derived(token
		? `https://img.logo.dev/${domain}?token=${encodeURIComponent(token)}&format=png&size=72&retina=true&theme=dark&fallback=404`
		: '');
</script>

<span class="logo-mark" title={label} aria-hidden="true">
	{#if source && !failed}
		<img
			src={source}
			alt=""
			width="42"
			height="42"
			decoding="async"
			referrerpolicy="origin"
			onerror={() => (failed = true)}
		/>
	{:else}
		<TechMark {tech} size="feature" framed={false} />
	{/if}
</span>

<style>
	.logo-mark {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		flex: 0 0 auto;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.logo-mark :global(.tech-mark) { width: 42px; height: 42px; }
</style>
