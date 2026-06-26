import type { AbstractServiceOptions } from '@backoffice/types';
import { ItemsService } from './items.js';

export class PresetsService extends ItemsService {
	constructor(options: AbstractServiceOptions) {
		super('backoffice_presets', options);
	}
}
