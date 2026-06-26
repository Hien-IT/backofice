import type { MergeCoreCollection } from '../index.js';
import type { BackofficeOperation } from './operation.js';
import type { BackofficeUser } from './user.js';

export type BackofficeFlow<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_flows',
	{
		id: string;
		name: string;
		icon: string | null;
		color: string | null;
		description: string | null;
		status: string;
		trigger: string | null;
		accountability: string | null;
		options: Record<string, any> | null;
		operation: BackofficeOperation<Schema> | string | null;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
	}
>;
