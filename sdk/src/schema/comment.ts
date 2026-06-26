import type { MergeCoreCollection } from '../index.js';
import type { BackofficeCollection } from './collection.js';
import type { BackofficeUser } from './user.js';

export type BackofficeComment<Schema> = MergeCoreCollection<
	Schema,
	'backoffice_comments',
	{
		id: string;
		collection: BackofficeCollection<Schema> | string;
		item: string;
		comment: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
		user_updated: BackofficeUser<Schema> | string | null;
	}
>;
