<script lang="ts">
	import PrototypeLanding from '$lib/components/consulting-prototype/PrototypeLanding.svelte';
	import type { ContactFormState } from '$lib/types/consulting-contact';

	let { form }: { form?: ContactFormState | null } = $props();
</script>

<PrototypeLanding contactForm={form ?? undefined} />
