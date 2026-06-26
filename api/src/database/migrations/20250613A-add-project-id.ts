import type { Knex } from 'knex';
import { v7 as uuid } from 'uuid';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('backoffice_settings', (table) => {
		table.uuid('project_id');
	});

	const existing = await knex('backoffice_settings').select('id').first();
	const timestamp = await knex<{ timestamp: string }>('backoffice_migrations').select('timestamp').first();
	const msecs = timestamp ? new Date(timestamp.timestamp).getTime() : Date.now();

	if (existing) {
		await knex('backoffice_settings').update({
			project_id: uuid({
				msecs,
			}),
		});
	} else {
		await knex('backoffice_settings').insert({
			project_id: uuid(),
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('backoffice_settings', (table) => {
		table.dropColumn('project_id');
	});
}
