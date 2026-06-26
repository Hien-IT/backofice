import { useEnv } from '@backoffice/env';
import { describe, expect, test, vi } from 'vitest';
import { getAuthProviders } from './get-auth-providers.js';

vi.mock('@backoffice/env');

const scenarios = [
	{
		name: 'when no providers configured',
		input: {},
		output: [],
	},
	{
		name: 'when no driver configured',
		input: {
			AUTH_PROVIDERS: 'backoffice',
		},
		output: [],
	},

	{
		name: 'when single provider and driver are properly configured',
		input: {
			AUTH_PROVIDERS: 'backoffice',
			AUTH_BACKOFFICE_DRIVER: 'openid',
			AUTH_BACKOFFICE_LABEL: 'Backoffice',
			AUTH_BACKOFFICE_ICON: 'hare',
		},
		output: [
			{
				name: 'backoffice',
				driver: 'openid',
				label: 'Backoffice',
				icon: 'hare',
			},
		],
	},

	{
		name: 'when multiple provider and driver are properly configured',
		input: {
			AUTH_PROVIDERS: 'backoffice,custom',
			AUTH_BACKOFFICE_DRIVER: 'openid',
			AUTH_BACKOFFICE_LABEL: 'Backoffice',
			AUTH_BACKOFFICE_ICON: 'hare',
			AUTH_CUSTOM_DRIVER: 'openid',
			AUTH_CUSTOM_ICON: 'lock',
		},
		output: [
			{
				name: 'backoffice',
				driver: 'openid',
				label: 'Backoffice',
				icon: 'hare',
			},
			{
				name: 'custom',
				driver: 'openid',
				icon: 'lock',
			},
		],
	},
];

describe('get auth providers', () => {
	for (const scenario of scenarios) {
		test(scenario.name, () => {
			vi.mocked(useEnv).mockReturnValue(scenario.input);

			expect(getAuthProviders()).toEqual(scenario.output);
		});
	}
});
