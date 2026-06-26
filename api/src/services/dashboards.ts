import type { AbstractServiceOptions } from '@backoffice/types';
import { ItemsService } from './items.js';

export class DashboardsService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('backoffice_dashboards', options);
	}
}
