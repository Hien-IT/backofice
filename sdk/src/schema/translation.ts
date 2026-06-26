import type { MergeCoreCollection } from '../index.js';

export type BackofficeTranslation<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_translations',
	{
		id: string; // uuid
		language: string;
		key: string;
		value: string;
	}
>;
