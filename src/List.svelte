<script lang="ts">
	import shops from '../server/shops.json';

	const shopsToList = shops.filter((item) => !item.name.startsWith('Zde pro vás vyrábíme')).sort((item1, item2) => {
		return item1.name.localeCompare(item2.name);
	})
</script>

<style>
.shops-list {
	list-style-type: none;
	margin-left: 0;
	padding-left: 0;
}

</style>

<ul class="shops-list">
	{#each shopsToList as item}
	<li><strong>{item.name}</strong>, {item.address}</li>
	{/each}
</ul>
