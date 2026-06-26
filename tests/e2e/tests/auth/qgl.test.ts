import { randomUUID } from 'node:crypto';
import { authentication, createBackoffice, createUser, graphql, rest, staticToken } from '@backoffice/sdk';
import { port } from '@utils/constants.js';
import { expect, test } from 'vitest';

const api = createBackoffice(`http://localhost:${port}`).with(rest()).with(staticToken('admin'));

test('auth with email & password', async () => {
	const email = `${randomUUID()}@test.com`;

	await api.request(
		createUser({
			first_name: 'Test',
			last_name: 'User',
			email,
			password: 'secret',
		}),
	);

	const auth = createBackoffice(`http://localhost:${port}`).with(graphql()).with(authentication());

	const result = await auth.query(
		`
mutation {
    auth_login(email: "${email}", password: "secret") {
        access_token
        refresh_token
    }
}
`,
		{},
		'system',
	);

	expect(result).toEqual({
		auth_login: {
			access_token: expect.any(String),
			refresh_token: expect.any(String),
		},
	});
});
