<script lang="ts">
	import { onMount } from 'svelte';
	import { Hero, Projects, Experience, TechStack, Contact, projects, experience, skills, profile } from '$lib';
	import { initSessionTiming } from '$lib/analytics';

	onMount(() => initSessionTiming('home'));
</script>

<Hero {profile} />
<TechStack {skills} />
<Experience experiences={experience} />
<Projects {projects} />
<Contact {profile} />
