import type { AbstractServiceOptions } from '@backoffice/types';
import { ItemsService } from './items.js';

export class ActivityService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('backoffice_activity', options);
	}
}
