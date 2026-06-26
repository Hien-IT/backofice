import type { Knex } from 'knex';

const updates = [
	{
		table: 'backoffice_fields',
		constraints: [
			{
				column: 'group',
				references: 'backoffice_fields.id',
			},
		],
	},
	{
		table: 'backoffice_files',
		constraints: [
			{
				column: 'folder',
				references: 'backoffice_folders.id',
			},
			{
				column: 'uploaded_by',
				references: 'backoffice_users.id',
			},
			{
				column: 'modified_by',
				references: 'backoffice_users.id',
			},
		],
	},
	{
		table: 'backoffice_folders',
		constraints: [
			{
				column: 'parent',
				references: 'backoffice_folders.id',
			},
		],
	},
	{
		table: 'backoffice_permissions',
		constraints: [
			{
				column: 'role',
				references: 'backoffice_roles.id',
			},
		],
	},
	{
		table: 'backoffice_presets',
		constraints: [
			{
				column: 'user',
				references: 'backoffice_users.id',
			},
			{
				column: 'role',
				references: 'backoffice_roles.id',
			},
		],
	},
	{
		table: 'backoffice_revisions',
		constraints: [
			{
				column: 'activity',
				references: 'backoffice_activity.id',
			},
			{
				column: 'parent',
				references: 'backoffice_revisions.id',
			},
		],
	},
	{
		table: 'backoffice_sessions',
		constraints: [
			{
				column: 'user',
				references: 'backoffice_users.id',
			},
		],
	},
	{
		table: 'backoffice_settings',
		constraints: [
			{
				column: 'project_logo',
				references: 'backoffice_files.id',
			},
			{
				column: 'public_foreground',
				references: 'backoffice_files.id',
			},
			{
				column: 'public_background',
				references: 'backoffice_files.id',
			},
		],
	},
	{
		table: 'backoffice_users',
		constraints: [
			{
				column: 'role',
				references: 'backoffice_roles.id',
			},
		],
	},
];

/**
 * NOTE:
 * Not all databases allow (or support) recursive onUpdate/onDelete triggers. MS SQL / Oracle flat out deny creating them,
 * Postgres behaves erratic on those triggers, not sure if MySQL / Maria plays nice either.
 */

export async function up(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
				table.foreign(constraint.column).references(constraint.references);
			}
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
			}
		});
	}
}
