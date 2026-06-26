import type { MergeCoreCollection } from '../index.js';
import type { BackofficeUser } from './user.js';

export type BackofficeNotification<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_notifications',
	{
		id: string;
		timestamp: 'datetime' | null;
		status: string | null;
		recipient: BackofficeUser<Schema> | string;
		sender: BackofficeUser<Schema> | string | null;
		subject: string;
		message: string | null;
		collection: string | null; // TODO keyof complete schema
		item: string | null;
	}
>;
