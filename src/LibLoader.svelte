<script>
	import {longitude, latitude} from './store.js'

	export let inputElement;

	const initializeSMap = () => {
		window.Loader.async = true;
		window.Loader.load(null, {suggest: true}, () => {
			const suggest = new window.SMap.Suggest(inputElement);
			suggest.urlParams({
				// omezeni pro celou CR
				bounds: "48.5370786,12.0921668|51.0746358,18.8927040"
			});
			suggest.addListener("suggest", function(suggestData) {
				longitude.set(suggestData.data.longitude);
				latitude.set(suggestData.data.latitude);
			})
		});
	}
</script>

<svelte:head>
	<script src="https://api.mapy.cz/loader.js" on:load={initializeSMap}></script>
</svelte:head>
