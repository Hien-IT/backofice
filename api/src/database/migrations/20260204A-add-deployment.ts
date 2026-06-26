import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('backoffice_deployments', (table) => {
		table.uuid('id').primary().notNullable();
		table.string('provider').notNullable().unique();
		table.text('credentials');
		table.text('options');
		table.timestamp('date_created').defaultTo(knex.fn.now());
		table.uuid('user_created').references('id').inTable('backoffice_users').onDelete('SET NULL');
	});

	await knex.schema.createTable('backoffice_deployment_projects', (table) => {
		table.uuid('id').primary().notNullable();
		table.uuid('deployment').notNullable().references('id').inTable('backoffice_deployments').onDelete('CASCADE');
		table.string('external_id').notNullable();
		table.string('name').notNullable();
		table.timestamp('date_created').defaultTo(knex.fn.now());
		table.uuid('user_created').references('id').inTable('backoffice_users').onDelete('SET NULL');
		table.unique(['deployment', 'external_id']);
	});

	await knex.schema.createTable('backoffice_deployment_runs', (table) => {
		table.uuid('id').primary().notNullable();
		table.uuid('project').notNullable().references('id').inTable('backoffice_deployment_projects').onDelete('CASCADE');
		table.string('external_id').notNullable();
		table.string('target').notNullable(); // 'production' or 'preview'
		table.timestamp('date_created').defaultTo(knex.fn.now());
		table.uuid('user_created').references('id').inTable('backoffice_users').onDelete('SET NULL');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('backoffice_deployment_runs');
	await knex.schema.dropTable('backoffice_deployment_projects');
	await knex.schema.dropTable('backoffice_deployments');
}
