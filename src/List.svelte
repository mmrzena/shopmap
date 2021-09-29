<script lang="ts">
	import shops from '../server/shops.json';
	import Shop from './Shop.svelte';

	const shopsToList = shops.filter((item) => !item.name.startsWith('Zde pro vás vyrábíme')).sort((item1, item2) => {
		return item1.name.localeCompare(item2.name);
	})
	const shopsMap = shopsToList.reduce((acc, shop) => {
		const address = shop.address.split(',')
		const city = address[address.length - 1].trim()
		address.pop()
		const item = {name: shop.name, address: address.join(', ')}
		if (acc[city]) {
			acc[city].push(item)
		} else {
			acc[city] = [item]
		}

		return acc
	}, {})

	const orderedShopsMap = Object.keys(shopsMap).sort().reduce(
  (obj, key) => { 
    obj[key] = shopsMap[key]; 
    return obj;
  }, 
  {}
);

</script>

<style>
.shops-list {
	list-style-type: none;
	margin-left: 0;
	padding-left: 0;
	/* display: flex;
	flex-wrap: wrap; */
}

</style>

<ul class="shops-list">
	{#each Object.keys(orderedShopsMap) as key}
		<Shop city={key} addresses={shopsMap[key]} />
	{/each}
</ul>
