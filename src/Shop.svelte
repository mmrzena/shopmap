<script lang="ts">
	export let addresses: any;
	export let city: string;
</script>

<style>
	.shopBlock {
		border-right: 1px solid #e2e2e2;
		padding-right: 30px;
		margin-right: 30px;
		font-size: 18px;
	}

	.shopBlock:last-child {
		border: none;
	}

	.containerShopBlock {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.address {
		color: #A9A9A9;
		font-size: 15px;
	}

	.city {
		margin-top: 25px;
		margin-bottom: 5px;
	}
</style>

<li>
	<h3 class="city"><strong>{city}</strong></h3>
	<div class="containerShopBlock">
		{#each addresses as item}
			<div class="shopBlock">
				<div class="name">{item.name}</div>
				<div class="address">{item.address}</div>
			</div>
		{/each}
	</div>
</li>
