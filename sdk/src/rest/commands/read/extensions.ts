import type { BackofficeExtension } from '../../../schema/extension.js';
import type { RestCommand } from '../../types.js';

/**
 * List the available extensions in the project.
 * @returns An array of extensions.
 */
export const readExtensions =
	<Schema>(): RestCommand<BackofficeExtension<Schema>[], Schema> =>
	() => ({
		path: `/extensions/`,
		method: 'GET',
	});
