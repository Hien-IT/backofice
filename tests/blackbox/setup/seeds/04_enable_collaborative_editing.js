export async function seed(knex) {
	await knex('backoffice_settings').update({
		collaborative_editing_enabled: true,
	});
}
