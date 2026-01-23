<script lang="ts">
	import type { Profile } from '$lib/types';

	let { profile }: { profile: Profile } = $props();
</script>

<div class="hero-card">
	<div class="card-content">
		<p class="titles">
			{#each profile.titles as title, i}
				<span>{title.toUpperCase()}</span>
				{#if i < profile.titles.length - 1}
					<span class="separator">•</span>
				{/if}
			{/each}
		</p>

		<h1 class="name">{profile.name}</h1>

		<p class="tagline">{profile.tagline}</p>

		<p class="meta">
			<span class="location">
				<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="10" r="3" />
					<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
				</svg>
				{profile.location}
			</span>
			<span class="separator">•</span>
			<span>{profile.subtitle}</span>
		</p>
	</div>

	<div class="photo-wrapper">
		<img src={profile.photo} alt={profile.name} class="photo" />
	</div>
</div>

<style>
	.hero-card {
		display: flex;
		align-items: center;
		gap: 3rem;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 1.5rem;
		padding: 3rem 4rem;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.05),
			0 10px 15px -3px rgba(0, 0, 0, 0.05),
			0 20px 25px -5px rgba(0, 0, 0, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.6);
		max-width: 1000px;
		width: 100%;
		will-change: transform, opacity;
	}

	:global(html.dark) .hero-card {
		background: rgba(20, 20, 20, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.2),
			0 10px 15px -3px rgba(0, 0, 0, 0.2),
			0 20px 25px -5px rgba(0, 0, 0, 0.15);
	}

	.card-content {
		flex: 1;
	}

	.titles {
		font-family: var(--font-family-mono);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		color: var(--color-text-secondary);
		margin-bottom: 1rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.titles .separator {
		color: var(--color-text-secondary);
		opacity: 0.5;
	}

	.name {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0 0 1rem 0;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.tagline {
		font-size: 1.25rem;
		color: var(--color-text-primary);
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
		color: var(--color-text-secondary);
	}

	.meta .separator {
		opacity: 0.4;
	}

	.location {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.icon {
		width: 1rem;
		height: 1rem;
	}

	.photo-wrapper {
		flex-shrink: 0;
	}

	.photo {
		width: 220px;
		height: 280px;
		object-fit: cover;
		border-radius: 1rem;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	/* Mobile */
	@media (max-width: 768px) {
		.hero-card {
			flex-direction: column-reverse;
			padding: 2rem;
			gap: 2rem;
			text-align: center;
		}

		.titles {
			justify-content: center;
		}

		.meta {
			justify-content: center;
			flex-wrap: wrap;
		}

		.photo {
			width: 160px;
			height: 200px;
		}
	}
</style>
