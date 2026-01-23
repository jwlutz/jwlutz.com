<script lang="ts">
	import { Hero, Projects, Experience, TechStack, Contact, projects, experience, skills, profile } from '$lib';
</script>

<Hero {profile} />
<TechStack {skills} />
<Experience experiences={experience} />
<Projects {projects} />
<Contact {profile} />
