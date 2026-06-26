export async function seed(knex) {
	if (process.env.TEST_LOCAL) {
		await knex('backoffice_collections').del();
		await knex('backoffice_relations').del();
		await knex('backoffice_roles').del();
		await knex('backoffice_permissions').del();
		await knex('backoffice_policies').del();
		await knex('backoffice_access').del();
		await knex('backoffice_revisions').del();
		await knex('backoffice_versions').del();
		await knex('backoffice_users').del();
	}
}
