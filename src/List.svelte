<script lang="ts">
	import shops from '../server/shops.json';

	const shopsToList = shops.filter((item) => !item.name.startsWith('Zde pro vás vyrábíme'))
</script>

<ul class="shops-list">
	{#each shopsToList as item}
	<li><strong>{item.name}</strong>, {item.address}</li>
	{/each}
</ul>
