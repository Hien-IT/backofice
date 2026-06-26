import type { BackofficePreset } from '../../../schema/preset.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

/**
 * Delete multiple existing presets.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
export const deletePresets =
	<Schema>(keys: BackofficePreset<Schema>['id'][]): RestCommand<void, Schema> =>
	() => {
		throwIfEmpty(keys, 'Keys cannot be empty');

		return {
			path: `/presets`,
			body: JSON.stringify(keys),
			method: 'DELETE',
		};
	};

/**
 * Delete an existing preset.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
export const deletePreset =
	<Schema>(key: BackofficePreset<Schema>['id']): RestCommand<void, Schema> =>
	() => {
		throwIfEmpty(String(key), 'Key cannot be empty');

		return {
			path: `/presets/${key}`,
			method: 'DELETE',
		};
	};
