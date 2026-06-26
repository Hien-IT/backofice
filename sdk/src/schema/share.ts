import type { MergeCoreCollection } from '../index.js';
import type { BackofficeRole } from './role.js';
import type { BackofficeUser } from './user.js';

export type BackofficeShare<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_shares',
	{
		id: string;
		name: string | null;
		collection: string | null;
		item: string | null;
		role: BackofficeRole<Schema> | string | null;
		password: string | null;
		user_created: BackofficeUser<Schema> | string | null;
		date_created: 'datetime' | null;
		date_start: 'datetime' | null;
		date_end: 'datetime' | null;
		times_used: number | null;
		max_uses: number | null;
	}
>;
