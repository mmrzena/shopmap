<script lang="ts">
	export let addresses: any;
	export let city: string;
</script>

<style>
	.shopBlock {
		/* border: 1px solid red; */
		box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  	/* transition: 0.3s; */
		padding: 10px 20px;
		margin-right: 20px;
		border-radius: 6px;
		font-size: 18px;
	}

	.shopBlock:hover {
		/* box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	 */
	}

	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.address {
		color: #A9A9A9;
		font-size: 15px;
	}

	.city {
		margin-top: 30px;
		margin-bottom: 5px;
	}
</style>

<li>
	<h3 class="city"><strong>{city}</strong></h3>
	<div class="container">
		{#each addresses as item}
			<div class="shopBlock">
				<div class="name">{item.name}</div>
				<div class="address">{item.address}</div>
			</div>
		{/each}
	</div>
</li>
