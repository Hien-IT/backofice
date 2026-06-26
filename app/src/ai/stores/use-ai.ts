import { defineStore } from 'pinia';

export const useAiStore = defineStore('ai', {
	state: () => ({
		enabled: false,
	}),
	actions: {
		async hydrate() {},
		async dehydrate() {},
	}
});
