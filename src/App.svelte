<script lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import shops from '../server/shops.json';
import Form from './Form.svelte'
import List from './List.svelte'

import aramaraMarkerIcon from './aramara_marker.png'

const DefaultIcon = L.icon({
    iconUrl: aramaraMarkerIcon,
		iconSize: [30,60],
		iconAnchor: [15,60],
		popupAnchor: [0,-60]
});

L.Marker.prototype.options.icon = DefaultIcon;

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const hasDiv = window.document.getElementById('shopmap')

if (hasDiv) {
	const mymap = L.map('shopmap').setView([49.8426, 15.6920544], 8);
	
	const createMarker = ({name, address, lat, lng}) => {
		const marker = L.marker([lat, lng]).addTo(mymap);
		const popup = L.popup()
		.setLatLng([lat, lng])
		.setContent(`<p class="popup_name">${name}</p><p>${address}</p>`)
		marker.bindPopup(popup);
	}
	// load a tile layer
	L.tileLayer('https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
	{
		attribution: '<a href="https://o.seznam.cz/">© Seznam.cz, a.s.</a> a OpenStreetMap',
		maxZoom: 18,
		minZoom: 8
	}).addTo(mymap);
	
	shops.forEach((shop) => createMarker(shop))
}
</script>

{#if !window.location.href.startsWith('https://www.aramara.cz')}
	<Form />
	<List />
{/if}

