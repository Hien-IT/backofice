import { createInspector } from '@backoffice/schema';
import type { Knex } from 'knex';
import { useLogger } from '../../logger/index.js';
import { getDatabaseClient } from '../index.js';

export async function up(knex: Knex): Promise<void> {
	const isMysql = getDatabaseClient(knex) === 'mysql';

	if (isMysql) {
		await dropConstraint(knex);
	}

	await knex.schema.alterTable('backoffice_shares', (table) => {
		table.dropNullable('collection');
		table.dropNullable('item');
	});

	if (isMysql) {
		await recreateConstraint(knex);
	}
}

export async function down(knex: Knex): Promise<void> {
	const isMysql = getDatabaseClient(knex) === 'mysql';

	if (isMysql) {
		await dropConstraint(knex);
	}

	await knex.schema.alterTable('backoffice_shares', (table) => {
		table.setNullable('collection');
		table.setNullable('item');
	});

	if (isMysql) {
		await recreateConstraint(knex);
	}
}

/**
 * Temporarily drop foreign key constraint for MySQL instances, see https://github.com/backoffice/backoffice/issues/19399
 */
async function dropConstraint(knex: Knex) {
	const logger = useLogger();

	const inspector = createInspector(knex);

	const foreignKeys = await inspector.foreignKeys('backoffice_shares');
	const collectionForeignKeys = foreignKeys.filter((fk) => fk.column === 'collection');
	const constraintName = collectionForeignKeys[0]?.constraint_name;

	if (constraintName && collectionForeignKeys.length === 1) {
		await knex.schema.alterTable('backoffice_shares', (table) => {
			table.dropForeign('collection', constraintName);
		});
	} else {
		logger.warn(`Unexpected number of foreign key constraints on 'backoffice_shares.collection':`);
		logger.warn(JSON.stringify(collectionForeignKeys, null, 4));
	}
}

/**
 * Recreate foreign key constraint for MySQL instances, from 20211211A-add-shares.ts
 */
async function recreateConstraint(knex: Knex) {
	return knex.schema.alterTable('backoffice_shares', async (table) => {
		table.foreign('collection').references('backoffice_collections.collection').onDelete('CASCADE');
	});
}
