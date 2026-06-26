import type { BackofficePermission } from '../../../schema/permission.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreatePermissionOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficePermission<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new permission rules
 *
 * @param items The permission rules to create
 * @param query Optional return data query
 *
 * @returns Returns the permission objects for the created permissions.
 */
export const createPermissions =
	<Schema, const TQuery extends Query<Schema, BackofficePermission<Schema>>>(
		items: NestedPartial<BackofficePermission<Schema>>[],
		query?: TQuery,
	): RestCommand<CreatePermissionOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/permissions`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new permission rule
 *
 * @param item The permission rule to create
 * @param query Optional return data query
 *
 * @returns Returns the permission object for the created permission.
 */
export const createPermission =
	<Schema, const TQuery extends Query<Schema, BackofficePermission<Schema>>>(
		item: NestedPartial<BackofficePermission<Schema>>,
		query?: TQuery,
	): RestCommand<CreatePermissionOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/permissions`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
