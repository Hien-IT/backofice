import type { MergeCoreCollection } from '../index.js';
import type { BackofficeAccess } from './access.js';
import type { BackofficePermission } from './permission.js';

export type BackofficePolicy<Schema> = MergeCoreCollection<
	Schema,
	'backoffice_policies',
	{
		id: string; // uuid
		name: string;
		icon: string;
		description: string | null;
		ip_access: string | null;
		enforce_tfa: boolean;
		admin_access: boolean;
		app_access: boolean;
		permissions: number[] | BackofficePermission<Schema>[];
		users: string[] | BackofficeAccess<Schema>[];
		roles: string[] | BackofficeAccess<Schema>[];
	}
>;
