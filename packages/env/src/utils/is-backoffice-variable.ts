import { BACKOFFICE_VARIABLES_REGEX } from '../constants/backoffice-variables.js';

export const isBackofficeVariable = (key: string): boolean => {
	if (key.endsWith('_FILE')) {
		key = key.slice(0, -5);
	}

	return BACKOFFICE_VARIABLES_REGEX.some((regex) => regex.test(key));
};
