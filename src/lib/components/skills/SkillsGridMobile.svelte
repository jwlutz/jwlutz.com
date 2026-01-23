<script lang="ts">
	import { KEYBOARD_SKILLS, type KeyboardSkill } from '$lib/data/keyboard-skills';

	const skills = Object.values(KEYBOARD_SKILLS);
	let selectedSkill = $state<KeyboardSkill | null>(null);
</script>

<div class="skills-grid-mobile">
	<div class="grid">
		{#each skills as skill}
			<button
				class="skill-item"
				class:selected={selectedSkill?.id === skill.id}
				onclick={() => (selectedSkill = selectedSkill?.id === skill.id ? null : skill)}
				aria-label={skill.label}
			>
				<img src={skill.icon} alt={skill.label} loading="lazy" />
			</button>
		{/each}
	</div>

	{#if selectedSkill}
		<div class="skill-tooltip">
			<h4>{selectedSkill.label}</h4>
			<p>{selectedSkill.shortDescription}</p>
		</div>
	{:else}
		<div class="skill-tooltip hint">
			<p>Tap a skill to learn more</p>
		</div>
	{/if}
</div>

<style>
	.skills-grid-mobile {
		padding: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
		max-width: 400px;
		margin: 0 auto;
	}

	.skill-item {
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
		background: var(--color-surface);
		border: 2px solid transparent;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.skill-item:hover,
	.skill-item.selected {
		border-color: var(--color-accent);
		background: var(--color-surface-hover);
		transform: scale(1.05);
	}

	.skill-item img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.skill-tooltip {
		text-align: center;
		margin-top: 1.5rem;
		padding: 1rem;
		background: var(--color-surface);
		border-radius: 12px;
		min-height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.skill-tooltip h4 {
		color: var(--color-text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.skill-tooltip p {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		margin: 0;
	}

	.skill-tooltip.hint p {
		color: var(--color-text-secondary);
		opacity: 0.6;
	}
</style>
