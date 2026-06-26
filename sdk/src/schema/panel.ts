import type { MergeCoreCollection } from '../index.js';
import type { BackofficeDashboard } from './dashboard.js';
import type { BackofficeUser } from './user.js';

export type BackofficePanel<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_panels',
	{
		id: string;
		dashboard: BackofficeDashboard<Schema> | string;
		name: string | null;
		icon: string | null;
		color: string | null;
		show_header: boolean;
		note: string | null;
		type: string;
		position_x: number;
		position_y: number;
		width: number;
		height: number;
		options: Record<string, any> | null;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
	}
>;
