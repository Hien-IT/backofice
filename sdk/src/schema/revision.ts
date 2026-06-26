import type { MergeCoreCollection } from '../index.js';
import type { BackofficeActivity } from './activity.js';
import type { BackofficeVersion } from './version.js';

export type BackofficeRevision<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_revisions',
	{
		id: number;
		activity: BackofficeActivity<Schema> | number;
		collection: string; // TODO keyof complete schema
		item: string;
		data: Record<string, any> | null;
		delta: Record<string, any> | null;
		parent: BackofficeRevision<Schema> | number | null;
		version: BackofficeVersion<Schema> | string | null;
	}
>;
