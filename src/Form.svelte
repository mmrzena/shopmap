<script>
	import LibLoader from './LibLoader.svelte';
	import {longitude, latitude} from './store.js'
	let name = '';
	let inputValue = '';
	let inputElement;

	async function postShop () {
		await fetch('http://localhost:3000/addShop', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"name": name,
				"address": inputValue,
				"lng": $longitude,
				"lat": $latitude,
			})
		})
	}
</script>

<LibLoader inputElement={inputElement} />

<div class="container">
	<div>
		<input bind:this={inputElement} class="inputAddress" bind:value={inputValue} placeholder="Enter your address">
		<ul class="data_list">
			<li>Name: {name}</li>
			<li>Adresa: {inputValue}</li>
			<li>LNG: {$longitude}</li>
			<li>LAT: {$latitude}</li>
		</ul>
	</div>

	<input bind:value={name} placeholder="Enter name">
	<button class="button" on:click={postShop}>ADD TO SHOPS</button>
</div>
<style>
	.container {
		/* display: flex; */
		flex-direction: row;
		justify-content: space-between;
	}
	.data_list {
		list-style: none;
		display: inline-block;
	}
	.button {
		background-color: transparent;
		border: 3px solid purple;
	}
	.inputAddress {
		min-width: 300px;
	}
</style>
