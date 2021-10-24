<script lang="ts">
	import {shops, allShops} from './store.js'
	import Shop from './Shop.svelte';

	const shopsToList = $shops.
		filter((item) => !item.name.startsWith('Zde pro vás vyrábíme'))
		.sort(({ name: name1 }, {name: name2}) => name1.localeCompare(name2, 'cs'))

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

	$: orderedShopsMap = Object.keys(shopsMap).sort((a, b) => a.localeCompare(b, 'cs')).reduce(
  (obj, key) => { 
    obj[key] = shopsMap[key]; 
    return obj;
  }, 
  {}
);

const onChange = (e) => {
	shops.set(filteredShops)
}

</script>

<style>
.shops-list {
	list-style-type: none;
	margin-left: 0;
	padding-left: 0;
	/* display: flex;
	flex-wrap: wrap; */
}

.invisibleNumberOfShops {
	display: none;
}

</style>

<h3>Vyhledávání</h3>
<input bind:value={searchValue} on:input={onChange} class='form-control' placeholder="Zadejte název města nebo obchodu" />
<ul class="shops-list" id="shops-list">
	{#each Object.keys(orderedShopsMap) as key}
		<Shop city={key} addresses={shopsMap[key]} />
	{/each}
</ul>
<span class="invisibleNumberOfShops" id="invisibleNumberOfShops" data-numberOfShops={$allShops.length} />
