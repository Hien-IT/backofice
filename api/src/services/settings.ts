import type { AbstractServiceOptions, OwnerInformation } from '@backoffice/types';
import { version } from 'backoffice/version';
import { sendReport } from '../telemetry/index.js';
import { ItemsService } from './items.js';

export class SettingsService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('backoffice_settings', options);
	}

	async setOwner(data: OwnerInformation) {
		const { project_id } = await this.knex.select('project_id').from('backoffice_settings').first();

		sendReport({ ...data, project_id, version }).catch(async () => {
			await this.knex.update('project_status', 'pending').from('backoffice_settings');
		});

		return await this.upsertSingleton({
			project_owner: data.project_owner,
			project_usage: data.project_usage,
			org_name: data.org_name,
			product_updates: data.product_updates,
			project_status: null,
		});
	}
}
