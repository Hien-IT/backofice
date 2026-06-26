import { expect, test, vi } from 'vitest';
import { isBackofficeVariable } from './is-backoffice-variable.js';

vi.mock('../constants/backoffice-variables.js', () => ({
	BACKOFFICE_VARIABLES_REGEX: [/TEST_.*/],
}));

test('Returns false if variable matches none of the regexes', () => {
	expect(isBackofficeVariable('NO')).toBe(false);
});

test('Returns true if variable matches one or more of the regexes', () => {
	expect(isBackofficeVariable('TEST_123')).toBe(true);
});

test('Checks against original name if variable is suffixed with _FILE', () => {
	expect(isBackofficeVariable('NO_FILE')).toBe(false);
	expect(isBackofficeVariable('TEST_123_FILE')).toBe(true);
});
