import type { Knex } from 'knex';
import { getHelpers } from '../helpers/index.js';

export async function up(knex: Knex): Promise<void> {
	const helpers = getHelpers(knex);

	await knex.schema.createTable('backoffice_versions', (table) => {
		table.uuid('id').primary().notNullable();
		table.string('key', 64).notNullable();
		table.string('name');

		table
			.string('collection', helpers.schema.getTableNameMaxLength())
			.notNullable()
			.references('collection')
			.inTable('backoffice_collections')
			.onDelete('CASCADE');

		table.string('item').notNullable();

		// Hash is managed on API side
		table.string('hash');

		table.timestamp('date_created').defaultTo(knex.fn.now());
		table.timestamp('date_updated').defaultTo(knex.fn.now());
		table.uuid('user_created').references('id').inTable('backoffice_users').onDelete('SET NULL');
		// Cannot have two constraints from/to the same table, handled on API side
		table.uuid('user_updated').references('id').inTable('backoffice_users');
	});

	await knex.schema.alterTable('backoffice_collections', (table) => {
		table.boolean('versioning').notNullable().defaultTo(false);
	});

	await knex.schema.alterTable('backoffice_revisions', (table) => {
		table.uuid('version').references('id').inTable('backoffice_versions').onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('backoffice_collections', (table) => {
		table.dropColumn('versioning');
	});

	await knex.schema.alterTable('backoffice_revisions', (table) => {
		table.dropColumn('version');
	});

	await knex.schema.dropTable('backoffice_versions');
}
