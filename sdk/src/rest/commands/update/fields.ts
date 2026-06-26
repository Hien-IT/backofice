import type { BackofficeField } from '../../../schema/field.js';
import type { ApplyQueryFields, FieldQuery, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

export type UpdateFieldOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeField<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Updates the given field in the given collection.
 * @param collection
 * @param field
 * @param item
 * @param query
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
export const updateField =
	<Schema, const TQuery extends FieldQuery<Schema, BackofficeField<Schema>>>(
		collection: BackofficeField<Schema>['collection'],
		field: BackofficeField<Schema>['field'],
		item: NestedPartial<BackofficeField<Schema>>,
		query?: TQuery,
	): RestCommand<UpdateFieldOutput<Schema, TQuery>, Schema> =>
	() => {
		throwIfEmpty(collection, 'Keys cannot be empty');
		throwIfEmpty(field, 'Field cannot be empty');

		return {
			path: `/fields/${collection}/${field}`,
			params: query ?? {},
			body: JSON.stringify(item),
			method: 'PATCH',
		};
	};

/**
 * Updates the multiple field in the given collection.
 * Update multiple existing fields.
 * @param collection
 * @param items
 * @param query
 * @returns
 * @throws Will throw if collection is empty
 */
export const updateFields =
	<Schema, const TQuery extends FieldQuery<Schema, BackofficeField<Schema>>>(
		collection: BackofficeField<Schema>['collection'],
		items: NestedPartial<BackofficeField<Schema>>[],
		query?: TQuery,
	): RestCommand<UpdateFieldOutput<Schema, TQuery>[], Schema> =>
	() => {
		throwIfEmpty(collection, 'Collection cannot be empty');

		return {
			path: `/fields/${collection}`,
			params: query ?? {},
			body: JSON.stringify(items),
			method: 'PATCH',
		};
	};
