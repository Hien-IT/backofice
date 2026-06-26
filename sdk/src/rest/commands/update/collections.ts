import type { BackofficeCollection } from '../../../schema/collection.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

export type UpdateCollectionOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeCollection<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Update the metadata for an existing collection.
 * @param collection
 * @param item
 * @param query
 * @returns The collection object for the updated collection in this request.
 * @throws Will throw if collection is empty
 */
export const updateCollection =
	<Schema, const TQuery extends Query<Schema, BackofficeCollection<Schema>>>(
		collection: BackofficeCollection<Schema>['collection'],
		item: NestedPartial<BackofficeCollection<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateCollectionOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(collection, 'Collection cannot be empty');

		return {
			path: `/collections/${collection}`,
			params: query ?? {},
			body: JSON.stringify(item),
			method: 'PATCH',
		};
	};

/**
 * Update multiple collections as batch.
 * @param items
 * @param query
 * @returns Returns the collection objects for the updated collections.
 */
export const updateCollectionsBatch =
	<Schema, const TQuery extends Query<Schema, BackofficeCollection<Schema>>>(
		items: NestedPartial<BackofficeCollection<Schema>>[],
		query?: TQuery,
	): RestCommand<UpdateCollectionOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/collections`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'PATCH',
	});
