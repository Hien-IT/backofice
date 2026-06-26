import type { MergeCoreCollection } from '../index.js';
import type { BackofficePolicy } from './policy.js';

export type BackofficePermission<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_permissions',
	{
		id: number;
		policy: BackofficePolicy<Schema> | string | null;
		collection: string; // TODO keyof complete schema
		action: string;
		permissions: Record<string, any> | null;
		validation: Record<string, any> | null;
		presets: Record<string, any> | null;
		fields: string[] | null;
	}
>;
