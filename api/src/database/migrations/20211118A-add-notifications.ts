import type { Knex } from 'knex';
import { getHelpers } from '../helpers/index.js';

export async function up(knex: Knex): Promise<void> {
	const helpers = getHelpers(knex);

	await knex.schema.createTable('backoffice_notifications', (table) => {
		table.increments();
		table.timestamp('timestamp').notNullable();
		table.string('status').defaultTo('inbox');
		table.uuid('recipient').notNullable().references('id').inTable('backoffice_users').onDelete('CASCADE');
		table.uuid('sender').notNullable().references('id').inTable('backoffice_users');
		table.string('subject').notNullable();
		table.text('message');
		table.string('collection', helpers.schema.getTableNameMaxLength());
		table.string('item');
	});

	await knex.schema.alterTable('backoffice_users', (table) => {
		table.boolean('email_notifications').defaultTo(true);
	});

	await knex('backoffice_users').update({ email_notifications: true });
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('backoffice_notifications');

	await knex.schema.alterTable('backoffice_users', (table) => {
		table.dropColumn('email_notifications');
	});
}
