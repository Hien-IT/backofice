import type { MergeCoreCollection } from '../index.js';
import type { BackofficeAccess } from './access.js';
import type { BackofficeUser } from './user.js';

export type BackofficeRole<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_roles',
	{
		id: string;
		name: string;
		icon: string;
		description: string | null;
		parent: string | BackofficeRole<Schema>;
		children: string[] | BackofficeRole<Schema>[];
		policies: string[] | BackofficeAccess<Schema>[];
		users: string[] | BackofficeUser<Schema>[];
	}
>;
