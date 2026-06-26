import type { BackofficeClient } from '../types/client.js';
import type { StaticTokenClient } from './types.js';

/**
 * Creates a client to authenticate with Backoffice using a static token.
 *
 * @param token static token.
 *
 * @returns A Backoffice static token client.
 */
export const staticToken = (access_token: string) => {
	return <Schema>(_client: BackofficeClient<Schema>): StaticTokenClient<Schema> => {
		let token: string | null = access_token ?? null;
		return {
			async getToken() {
				return token;
			},
			async setToken(access_token: string | null) {
				token = access_token;
			},
		};
	};
};
