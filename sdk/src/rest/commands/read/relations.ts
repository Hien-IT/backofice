import type { BackofficeRelation } from '../../../schema/relation.js';
import type { ApplyQueryFields } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';
import { throwIfEmpty } from '../../utils/index.js';

export type ReadRelationOutput<Schema> = ApplyQueryFields<Schema, BackofficeRelation<Schema>, '*'>;

/**
 * List all Relations that exist in Backoffice.
 * @returns An array of Relation objects. If no items are available, data will be an empty array.
 */
export const readRelations =
	<Schema>(): RestCommand<ReadRelationOutput<Schema>[], Schema> =>
	() => ({
		path: `/relations`,
		method: 'GET',
	});

/**
 * List all Relations of a collection.
 * @param collection The collection
 * @returns Returns an array of Relation objects if a valid collection name was provided.
 */
export const readRelationByCollection =
	<Schema>(collection: BackofficeRelation<Schema>['collection']): RestCommand<ReadRelationOutput<Schema>[], Schema> =>
	() => ({
		path: `/relations/${collection}`,
		method: 'GET',
	});

/**
 * List an existing Relation by collection and field name.
 * @param collection The collection
 * @param field The field
 * @returns Returns a Relation object if a valid collection and field name was provided.
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
export const readRelation =
	<Schema>(
		collection: BackofficeRelation<Schema>['collection'],
		field: BackofficeRelation<Schema>['field'],
	): RestCommand<ReadRelationOutput<Schema>, Schema> =>
	() => {
		throwIfEmpty(collection, 'Collection cannot be empty');
		throwIfEmpty(field, 'Field cannot be empty');

		return {
			path: `/relations/${collection}/${field}`,
			method: 'GET',
		};
	};
