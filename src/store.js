import { writable, readable } from 'svelte/store';
import stores from '../server/shops.json'

export const longitude = writable(0);
export const latitude = writable(0);
export const shops = writable(stores);
export const allShops = readable(stores);
