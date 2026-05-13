<script lang="ts">
	import { KEYBOARD_SKILLS } from '$lib/data/keyboard-skills';

	const skills = Object.values(KEYBOARD_SKILLS);
</script>

<div class="skills-grid">
	<div class="grid">
		{#each skills as skill}
			<div class="skill-card" style="--accent: {skill.color}">
				<div class="icon-wrapper">
					<img src={skill.icon} alt={skill.label} loading="lazy" />
				</div>
				<span class="label">{skill.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.skills-grid {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
			gap: 1.25rem;
		}
	}

	.skill-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.25rem 0.75rem;
		background: var(--color-surface);
		border: 1px solid transparent;
		border-radius: 16px;
		position: relative;
		overflow: hidden;
	}

	.icon-wrapper {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}

	.icon-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.label {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-align: center;
		position: relative;
		z-index: 1;
	}
</style>
