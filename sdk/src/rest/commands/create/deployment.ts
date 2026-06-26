import type { BackofficeDeployment } from '../../../schema/deployment.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateDeploymentOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeDeployment<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create a new deployment provider.
 *
 * @param item The deployment to create
 * @param query Optional return data query
 *
 * @returns Returns the created deployment object.
 */
export const createDeployment =
	<Schema, const TQuery extends Query<Schema, BackofficeDeployment<Schema>>>(
		item: NestedPartial<BackofficeDeployment<Schema>>,
		query?: TQuery,
	): RestCommand<CreateDeploymentOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/deployments`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
