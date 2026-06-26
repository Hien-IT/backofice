import type { Ora } from 'ora';
import type { Report } from '../../types.js';
import checkBuiltCode from './check-built-code.js';
import checkBackofficeConfig from './check-backoffice-config.js';
import checkLicense from './check-license.js';
import checkReadme from './check-readme.js';

interface Validator {
	name: string;
	handler: (spinner: Ora, reports: Array<Report>) => Promise<string>;
}

const validators: Validator[] = [checkReadme, checkLicense, checkBackofficeConfig, checkBuiltCode];

export default validators;
