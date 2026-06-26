import type { MergeCoreCollection } from '../index.js';

export type BackofficeFolder<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_folders',
	{
		id: string;
		name: string;
		parent: BackofficeFolder<Schema> | string | null;
	}
>;
