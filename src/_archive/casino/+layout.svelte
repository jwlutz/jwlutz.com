<script lang="ts">
	import '../../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Jack Lutz | Casino Portfolio</title>
	<meta name="description" content="A gamified portfolio experience - play your way through my resume!" />
</svelte:head>

{@render children()}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #0a0a0a;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}
</style>
