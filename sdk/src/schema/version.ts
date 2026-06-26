import type { MergeCoreCollection } from '../index.js';
import type { BackofficeCollection } from './collection.js';
import type { BackofficeUser } from './user.js';

export type BackofficeVersion<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_versions',
	{
		id: string;
		key: string;
		name: string | null;
		collection: BackofficeCollection<Schema> | string;
		item: string;
		hash: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
		user_updated: BackofficeUser<Schema> | string | null;
		delta: Record<string, any> | null;
	}
>;
