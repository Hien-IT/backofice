import type { ConsoleInterface, FetchInterface, UrlInterface, WebSocketConstructor } from './globals.js';

/**
 * empty backoffice client
 */
export interface BackofficeClient<Schema> {
	url: URL;
	globals: ClientGlobals;
	with: <Extension extends object>(createExtension: (client: BackofficeClient<Schema>) => Extension) => this & Extension;
}

/**
 * All used globals for the client
 */
export type ClientGlobals = {
	fetch: FetchInterface;
	WebSocket: WebSocketConstructor;
	URL: UrlInterface;
	logger: ConsoleInterface;
};

/**
 * Available options on the client
 */
export type ClientOptions = {
	globals?: Partial<ClientGlobals>;
};
