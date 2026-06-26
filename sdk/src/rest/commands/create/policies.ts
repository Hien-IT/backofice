import type { BackofficePolicy } from '../../../schema/policy.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreatePolicyOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficePolicy<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new policies
 *
 * @param items The policies to create
 * @param query Optional return data query
 *
 * @returns Returns the policy objects for the created policies.
 */
export const createPolicies =
	<Schema, const TQuery extends Query<Schema, BackofficePolicy<Schema>>>(
		items: NestedPartial<BackofficePolicy<Schema>>[],
		query?: TQuery,
	): RestCommand<CreatePolicyOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/policies`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new policy
 *
 * @param item The policy to create
 * @param query Optional return data query
 *
 * @returns Returns the policy object for the created policy.
 */
export const createPolicy =
	<Schema, const TQuery extends Query<Schema, BackofficePolicy<Schema>>>(
		item: NestedPartial<BackofficePolicy<Schema>>,
		query?: TQuery,
	): RestCommand<CreatePolicyOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/policies`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
