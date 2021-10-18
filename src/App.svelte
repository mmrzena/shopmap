<script lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
// import shops from '../server/shops.json';
import Form from './Form.svelte'
import List from './List.svelte'
import {shops} from './store.js'

import aramaraMarkerIcon from './aramara_marker.png'

const DefaultIcon = L.icon({
    iconUrl: aramaraMarkerIcon,
		iconSize: [30,60],
		iconAnchor: [15,60],
		popupAnchor: [0,-60]
});

L.Marker.prototype.options.icon = DefaultIcon;

const hasDiv = window.document.getElementById('shopmap')
const hasDicks = window.document.getElementById('dicks')

let createMarker = (props) => {}
const markers = []
let myMap;
if (hasDiv) {
	myMap = L.map('shopmap').setView([49.8426, 15.6920544], 8);

	
	createMarker = ({name, address, lat, lng}) => {
		const marker = L.marker([lat, lng]).addTo(myMap);
		const popup = L.popup()
		.setLatLng([lat, lng])
		.setContent(`<p class="popup_name">${name}</p><p>${address}</p>`)
		marker.bindPopup(popup);
		markers.push(marker)
	}
	// load a tile layer
	L.tileLayer('https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
	{
		attribution: '<a href="https://o.seznam.cz/">© Seznam.cz, a.s.</a> a OpenStreetMap',
		maxZoom: 18,
		minZoom: 8
	}).addTo(myMap);
}

$: if (hasDiv) {
	markers.forEach((marker) => myMap.removeLayer(marker))
	$shops.forEach((shop) => createMarker(shop))
}

</script>

{#if !window.location.href.startsWith('https://www.aramara.cz')}
	<Form />
{/if}
{#if hasDicks}
	<List />
{/if}

