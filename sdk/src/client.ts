import type { ClientGlobals, ClientOptions, BackofficeClient } from './types/client.js';

/**
 * The default globals supplied to the client
 */
const defaultGlobals: ClientGlobals = {
	fetch: globalThis.fetch,
	WebSocket: globalThis.WebSocket,
	URL: globalThis.URL,
	logger: globalThis.console,
};

/**
 * Creates a client to communicate with a Backoffice app.
 *
 * @param url The URL to the Backoffice app.
 * @param options The client options. Defaults to the standard implementation of `globals`.
 *
 * @returns A Backoffice client.
 */
export const createBackoffice = <Schema = any>(url: string, options: ClientOptions = {}): BackofficeClient<Schema> => {
	const globals = options.globals ? { ...defaultGlobals, ...options.globals } : defaultGlobals;
	return {
		globals,
		url: new globals.URL(url),
		with(createExtension) {
			return {
				...this,
				...createExtension(this),
			};
		},
	};
};
