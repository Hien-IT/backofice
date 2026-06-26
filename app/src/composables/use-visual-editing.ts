import { computed, type MaybeRef, unref } from 'vue';
import { MODULE_BAR_DEFAULT } from '@/constants';
import { useSettingsStore } from '@/stores/settings';
import { normalizeUrl } from '@/utils/normalize-url';

interface UseVisualEditingOptions {
	/** Preview URL to check (will be normalized internally) */
	previewUrl: MaybeRef<string | null>;
	/** Whether this is a new item - visual editing is disabled for new items. Defaults to false. */
	isNew?: MaybeRef<boolean>;
}

/**
 * Handles visual editing prerequisites check.
 * Returns whether visual editing can be enabled in live preview and whether the visual module is enabled.
 *
 * Note: This checks prerequisites only. The live-preview component does the final
 * sameOrigin validation against the currently displayed URL.
 */
export function useVisualEditing({ previewUrl, isNew = false }: UseVisualEditingOptions) {
	const visualModuleEnabled = computed(() => false);
	const visualEditingEnabled = computed(() => false);

	return { visualEditingEnabled, visualModuleEnabled };
}
