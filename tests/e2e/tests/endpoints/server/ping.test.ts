import { createBackoffice, rest, serverPing, staticToken } from '@backoffice/sdk';
import { port } from '@utils/constants.js';
import { expect, test } from 'vitest';

const api = createBackoffice(`http://localhost:${port}`).with(rest()).with(staticToken('admin'));

test('ping', async () => {
	const result = await api.request(serverPing());

	expect(result).toBe('pong');
});
