import type { BackofficeNotification } from '../../../schema/notification.js';
import type { ApplyQueryFields, NestedPartial, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type CreateNotificationOutput<
	Schema,
	TQuery extends Query<Schema, Item>,
	Item extends object = BackofficeNotification<Schema>,
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Create multiple new notifications.
 *
 * @param items The notifications to create
 * @param query Optional return data query
 *
 * @returns Returns the notification object for the created notification.
 */
export const createNotifications =
	<Schema, const TQuery extends Query<Schema, BackofficeNotification<Schema>>>(
		items: NestedPartial<BackofficeNotification<Schema>>[],
		query?: TQuery,
	): RestCommand<CreateNotificationOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/notifications`,
		params: query ?? {},
		body: JSON.stringify(items),
		method: 'POST',
	});

/**
 * Create a new notification.
 *
 * @param item The notification to create
 * @param query Optional return data query
 *
 * @returns Returns the notification object for the created notification.
 */
export const createNotification =
	<Schema, const TQuery extends Query<Schema, BackofficeNotification<Schema>>>(
		item: NestedPartial<BackofficeNotification<Schema>>,
		query?: TQuery,
	): RestCommand<CreateNotificationOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/notifications`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'POST',
	});
