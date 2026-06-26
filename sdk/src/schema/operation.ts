import type { MergeCoreCollection } from '../index.js';
import type { BackofficeFlow } from './flow.js';
import type { BackofficeUser } from './user.js';

export type BackofficeOperation<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_operations',
	{
		id: string;
		name: string | null;
		key: string;
		type: string;
		position_x: number;
		position_y: number;
		timestamp: string;
		options: Record<string, any> | null;
		resolve: BackofficeOperation<Schema> | string | null;
		reject: BackofficeOperation<Schema> | string | null;
		flow: BackofficeFlow<Schema> | string;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
	}
>;
