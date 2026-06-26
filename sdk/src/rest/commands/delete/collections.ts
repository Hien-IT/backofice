import type { BackofficeCollection } from '../../../schema/collection.js';
import type { RestCommand } from '../../types.js';

/**
 * Delete a collection.
 * @param collection
 * @returns
 */
export const deleteCollection =
	<Schema>(collection: BackofficeCollection<Schema>['collection']): RestCommand<void, Schema> =>
	() => ({
		path: `/collections/${collection}`,
		method: 'DELETE',
	});
