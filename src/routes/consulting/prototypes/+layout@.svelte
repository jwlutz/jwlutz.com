<script lang="ts">
	import '../../../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<!-- Prototype review routes: keep out of search until promoted to /consulting -->
	<meta name="robots" content="noindex" />
</svelte:head>

{@render children()}
