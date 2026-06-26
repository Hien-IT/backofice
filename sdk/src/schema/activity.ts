import type { MergeCoreCollection } from '../index.js';
import type { BackofficeRevision } from './revision.js';
import type { BackofficeUser } from './user.js';

export type BackofficeActivity<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_activity',
	{
		id: number;
		action: string;
		user: BackofficeUser<Schema> | string | null;
		timestamp: 'datetime';
		ip: string | null;
		user_agent: string | null;
		collection: string;
		item: string;
		origin: string | null;
		revisions: BackofficeRevision<Schema>[] | number[] | null;
	}
>;
