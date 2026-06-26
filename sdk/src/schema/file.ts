import type { MergeCoreCollection } from '../index.js';
import type { BackofficeFolder } from './folder.js';
import type { BackofficeUser } from './user.js';

// Base type for backoffice_files
export type BackofficeFile<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_files',
	{
		id: string;
		storage: string;
		filename_disk: string | null;
		filename_download: string;
		title: string | null;
		type: string | null;
		folder: BackofficeFolder<Schema> | string | null;
		uploaded_by: BackofficeUser<Schema> | string | null;
		uploaded_on: 'datetime';
		modified_by: BackofficeUser<Schema> | string | null;
		modified_on: 'datetime';
		charset: string | null;
		filesize: string | null;
		width: number | null;
		height: number | null;
		duration: number | null;
		embed: unknown | null;
		description: string | null;
		location: string | null;
		tags: string[] | null;
		metadata: Record<string, any> | null;
		focal_point_x: number | null;
		focal_point_y: number | null;
	}
>;
