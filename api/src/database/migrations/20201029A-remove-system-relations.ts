import type { Knex } from 'knex';
import { merge } from 'lodash-es';

export async function up(knex: Knex): Promise<void> {
	await knex('backoffice_relations')
		.delete()
		.where('many_collection', 'like', 'backoffice_%')
		.andWhere('one_collection', 'like', 'backoffice_%');
}

export async function down(knex: Knex): Promise<void> {
	const defaults = {
		many_collection: 'backoffice_users',
		many_field: null,
		many_primary: null,
		one_collection: null,
		one_field: null,
		one_primary: null,
		junction_field: null,
	};

	const systemRelations = [
		{
			many_collection: 'backoffice_users',
			many_field: 'role',
			many_primary: 'id',
			one_collection: 'backoffice_roles',
			one_field: 'users',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_users',
			many_field: 'avatar',
			many_primary: 'id',
			one_collection: 'backoffice_files',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_revisions',
			many_field: 'activity',
			many_primary: 'id',
			one_collection: 'backoffice_activity',
			one_field: 'revisions',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_presets',
			many_field: 'user',
			many_primary: 'id',
			one_collection: 'backoffice_users',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_presets',
			many_field: 'role',
			many_primary: 'id',
			one_collection: 'backoffice_roles',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_folders',
			many_field: 'parent',
			many_primary: 'id',
			one_collection: 'backoffice_folders',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_files',
			many_field: 'folder',
			many_primary: 'id',
			one_collection: 'backoffice_folders',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_files',
			many_field: 'uploaded_by',
			many_primary: 'id',
			one_collection: 'backoffice_users',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_fields',
			many_field: 'collection',
			many_primary: 'id',
			one_collection: 'backoffice_collections',
			one_field: 'fields',
			one_primary: 'collection',
		},
		{
			many_collection: 'backoffice_activity',
			many_field: 'user',
			many_primary: 'id',
			one_collection: 'backoffice_users',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_settings',
			many_field: 'project_logo',
			many_primary: 'id',
			one_collection: 'backoffice_files',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_settings',
			many_field: 'public_foreground',
			many_primary: 'id',
			one_collection: 'backoffice_files',
			one_primary: 'id',
		},
		{
			many_collection: 'backoffice_settings',
			many_field: 'public_background',
			many_primary: 'id',
			one_collection: 'backoffice_files',
			one_primary: 'id',
		},
	].map((row) => {
		for (const [key, value] of Object.entries(row)) {
			if (value !== null && (typeof value === 'object' || Array.isArray(value))) {
				(row as any)[key] = JSON.stringify(value);
			}
		}

		return merge({}, defaults, row);
	});

	await knex.insert(systemRelations).into('backoffice_relations');
}
