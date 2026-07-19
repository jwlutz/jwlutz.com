<script lang="ts">
	import { onMount } from 'svelte';
	import { Hero, Projects, Experience, TechStack, Contact, projects, experience, skills, profile } from '$lib';
	import { initSessionTiming } from '$lib/analytics';

	onMount(() => initSessionTiming('home'));
</script>

<div class="portfolio-page">
	<Hero {profile} />
	<TechStack {skills} />
	<Projects {projects} />
	<Experience experiences={experience} />
	<Contact {profile} />
</div>
