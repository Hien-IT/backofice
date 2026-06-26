import type { MergeCoreCollection } from '../index.js';
import type { BackofficePolicy } from './policy.js';
import type { BackofficeRole } from './role.js';
import type { BackofficeUser } from './user.js';

export type BackofficeAccess<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_access',
	{
		id: string; // uuid
		role: string | BackofficeRole<Schema>;
		user: string | BackofficeUser<Schema>;
		policy: string | BackofficePolicy<Schema>;
		sort: number;
	}
>;
