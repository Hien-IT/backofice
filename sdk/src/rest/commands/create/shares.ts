import type { BackofficeShare } from '../../../schema/share.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateShareOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeShare<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new shares.
 *
 * @param items The shares to create
 * @param query Optional return data query
 *
 * @returns Returns the share objects for the created shares.
 */
export const createShares =
	<Schema, const TQuery extends Query<Schema, BackofficeShare<Schema>>>(
		items: NestedPartial<BackofficeShare<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateShareOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/shares`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new share.
 *
 * @param item The share to create
 * @param query Optional return data query
 *
 * @returns Returns the share object for the created share.
 */
export const createShare =
	<Schema, const TQuery extends Query<Schema, BackofficeShare<Schema>>>(
		item: NestedPartial<BackofficeShare<Schema>>,
		query?: TQuery,
	): RestCommand<CreateShareOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/shares`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
