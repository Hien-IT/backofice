import type { AbstractServiceOptions } from '@backoffice/types';
import { ItemsService } from './items.js';

export class PanelsService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('backoffice_panels', options);
	}
}
