import type { Knex } from 'knex';
import { uniq } from 'lodash-es';
import { getHelpers } from '../helpers/index.js';

export async function up(knex: Knex): Promise<void> {
	const helpers = getHelpers(knex);

	const groupsInUse = await knex.select('id', 'group').from('backoffice_fields').whereNotNull('group');

	const groupIDs: number[] = uniq(groupsInUse.map(({ group }) => group));

	const groupFields = await knex.select('id', 'field').from('backoffice_fields').whereIn('id', groupIDs);

	const groupMap = new Map();

	for (const { id, field } of groupFields) {
		groupMap.set(id, field);
	}

	await knex.schema.alterTable('backoffice_fields', (table) => {
		table.dropForeign('group');
	});

	await knex.schema.alterTable('backoffice_fields', (table) => {
		table.dropColumn('group');
	});

	await knex.schema.alterTable('backoffice_fields', (table) => {
		table.string('group', helpers.schema.getColumnNameMaxLength());
	});

	for (const { id, group } of groupsInUse) {
		await knex('backoffice_fields')
			.update({ group: groupMap.get(group) })
			.where({ id });
	}
}

export async function down(knex: Knex): Promise<void> {
	const fieldsThatUseAGroup = await knex
		.select('id', 'collection', 'group')
		.from('backoffice_fields')
		.whereNotNull('group');

	if (fieldsThatUseAGroup.length === 0) return;

	const groupMap = new Map();

	for (const { collection, group } of fieldsThatUseAGroup) {
		const { id } = await knex.select('id').from('backoffice_fields').where({ collection, field: group }).first();

		groupMap.set(group, id);
	}

	await knex.schema.alterTable('backoffice_fields', (table) => {
		table.dropColumn('group');
	});

	await knex.schema.alterTable('backoffice_fields', (table) => {
		table.integer('group').references('id').inTable('backoffice_fields');
	});

	for (const { id, group } of fieldsThatUseAGroup) {
		await knex('backoffice_fields')
			.update({ group: groupMap.get(group) })
			.where({ id });
	}
}
