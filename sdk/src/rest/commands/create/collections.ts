import type { BackofficeCollection } from '../../../schema/collection.js';
import type { ApplyQueryFields, FieldQuery, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateCollectionOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeCollection<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create a new Collection. This will create a new table in the database as well.
 *
 * @param item This endpoint doesn't currently support any query parameters.
 * @param query Optional return data query
 *
 * @returns The collection object for the collection created in this request.
 */
export const createCollection =
	<Schema, const TQuery extends FieldQuery<Schema, BackofficeCollection<Schema>>>(
		item: NestedPartial<BackofficeCollection<Schema>>,
		query?: TQuery,
	): RestCommand<CreateCollectionOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/collections`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
