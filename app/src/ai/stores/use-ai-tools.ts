import { defineStore } from 'pinia';
import { createEventHook } from '@vueuse/core';

export const useAiToolsStore = defineStore('ai-tools', () => {
	const systemToolResultHook = createEventHook<any>();

	return {
		register() {},
		unregister() {},
		registerBatch() {},
		unregisterBatch() {},
		registerLocalTool() {},
		replaceLocalTool() {},
		deregisterLocalTool() {},
		dehydrate() {},
		onSystemToolResult: systemToolResultHook.on,
		triggerSystemToolResult: systemToolResultHook.trigger,
	};
});
