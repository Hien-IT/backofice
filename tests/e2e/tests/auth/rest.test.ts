import { randomUUID } from 'node:crypto';
import { authentication, createBackoffice, createUser, readMe, rest, staticToken } from '@backoffice/sdk';
import { port } from '@utils/constants.js';
import { expect, test } from 'vitest';

const api = createBackoffice<unknown>(`http://localhost:${port}`).with(rest()).with(staticToken('admin'));

test('auth with token', async () => {
	const token = randomUUID();

	const user = await api.request(
		createUser({
			first_name: 'Test',
			last_name: 'User',
			email: `${randomUUID()}@test.com`,
			password: 'secret',
			token,
		}),
	);

	const auth = createBackoffice<unknown>(`http://localhost:${port}`).with(rest()).with(staticToken(token));

	const me = await auth.request(readMe());

	expect(user.id).toBe(me.id);
});

test('auth with email & password', async () => {
	const email = `${randomUUID()}@test.com`;

	const user = await api.request(
		createUser({
			first_name: 'Test',
			last_name: 'User',
			email,
			password: 'secret',
		}),
	);

	const auth = createBackoffice<unknown>(`http://localhost:${port}`).with(rest()).with(authentication());

	await auth.login({
		email,
		password: 'secret',
	});

	const me = await auth.request(readMe());

	expect(user.id).toBe(me.id);
});
