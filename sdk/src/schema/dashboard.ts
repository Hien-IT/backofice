import type { MergeCoreCollection } from '../index.js';
import type { BackofficeUser } from './user.js';

export type BackofficeDashboard<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_dashboards',
	{
		id: string;
		name: string;
		icon: string;
		note: string | null;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
		color: string | null;
	}
>;
