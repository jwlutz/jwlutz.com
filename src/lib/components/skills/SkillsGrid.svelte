<script lang="ts">
	import { KEYBOARD_SKILLS, type KeyboardSkill } from '$lib/data/keyboard-skills';

	const skills = Object.values(KEYBOARD_SKILLS);
	let hoveredSkill = $state<KeyboardSkill | null>(null);
</script>

<div class="skills-grid">
	<div class="grid">
		{#each skills as skill}
			<button
				class="skill-card"
				style="--accent: {skill.color}"
				onmouseenter={() => (hoveredSkill = skill)}
				onmouseleave={() => (hoveredSkill = null)}
				onfocus={() => (hoveredSkill = skill)}
				onblur={() => (hoveredSkill = null)}
			>
				<div class="icon-wrapper">
					<img src={skill.icon} alt={skill.label} loading="lazy" />
				</div>
				<span class="label">{skill.label}</span>
			</button>
		{/each}
	</div>

	<!-- Tooltip for hovered skill -->
	<div class="tooltip" class:visible={hoveredSkill !== null}>
		{#if hoveredSkill}
			<p class="tooltip-text">{hoveredSkill.shortDescription}</p>
		{/if}
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
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.skill-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, var(--accent) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.skill-card:hover,
	.skill-card:focus-visible {
		transform: translateY(-4px);
		border-color: var(--accent);
		box-shadow:
			0 10px 40px -10px color-mix(in srgb, var(--accent) 30%, transparent),
			0 4px 6px -2px rgba(0, 0, 0, 0.1);
	}

	.skill-card:hover::before,
	.skill-card:focus-visible::before {
		opacity: 0.08;
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
		transition: transform 0.3s ease;
	}

	.skill-card:hover .icon-wrapper img {
		transform: scale(1.1);
	}

	.label {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-align: center;
		position: relative;
		z-index: 1;
		transition: color 0.3s ease;
	}

	.skill-card:hover .label {
		color: var(--color-text-primary);
	}

	.tooltip {
		text-align: center;
		margin-top: 2rem;
		padding: 1rem 1.5rem;
		background: var(--color-surface);
		border-radius: 12px;
		min-height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: translateY(10px);
		transition: all 0.3s ease;
	}

	.tooltip.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.tooltip-text {
		color: var(--color-text-secondary);
		font-size: 1rem;
		margin: 0;
	}
</style>
