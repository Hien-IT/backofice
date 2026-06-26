import type { RestCommand } from '../../types.js';

/**
 * Resets both the data and schema cache of Backoffice. This endpoint is only available to admin users.
 * @returns Nothing
 */
export const clearCache =
	<Schema>(): RestCommand<void, Schema> =>
	(system = false) => ({
		method: 'POST',
		path: `/utils/cache/clear${system ? '?system' : ''}`,
	});
