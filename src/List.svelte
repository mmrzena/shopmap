<script lang="ts">
	import shops from '../server/shops.json';
	import Shop from './Shop.svelte';

	const shopsToList = shops.filter((item) => !item.name.startsWith('Zde pro vás vyrábíme')).sort((item1, item2) => {
		return item1.name.localeCompare(item2.name);
	})

	let searchValue = ''
	$: filteredShops = shopsToList.filter((shop) => 
		shop.name.toLowerCase().includes(searchValue.toLowerCase()) ||
		shop.address.toLowerCase().includes(searchValue.toLowerCase()))

	$: shopsMap = filteredShops.reduce((acc, shop) => {
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

	$: orderedShopsMap = Object.keys(shopsMap).sort().reduce(
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

<h3>Vyhledávání</h3>
<input bind:value={searchValue} class='form-control' placeholder="Zadejte název města nebo obchodu" />
<ul class="shops-list" id="shops-list">
	{#each Object.keys(orderedShopsMap) as key}
		<Shop city={key} addresses={shopsMap[key]} />
	{/each}
</ul>
