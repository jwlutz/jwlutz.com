<script lang="ts">
	import { Hero, Projects, Experience, Skills, Contact, projects, experience, skills, profile } from '$lib';
</script>

<Hero {profile} />
<Projects {projects} />
<Experience experiences={experience} />
<Skills {skills} />
<Contact {profile} />
