import { sandbox } from '@backoffice/sandbox';
import { authentication, createBackoffice, rest } from '@backoffice/sdk';
import { database } from '@utils/constants.js';
import { getUID } from '@utils/getUID.js';
import { Signal } from '@utils/signal.js';
import { expect, test } from 'vitest';

test('redact sensitive data', async () => {
	const backoffice = await sandbox(database, {
		inspect: false,
		env: {
			LOG_LEVEL: 'debug',
			LOG_STYLE: 'raw',
			DB_FILENAME: `backoffice_test_${getUID()}.db`,
		},
	});

	const messages = new Signal<string[]>([]);

	backoffice.logger.onLog((msg) => {
		messages.set([...messages.get(), msg]);
	});

	const api = createBackoffice(`http://localhost:${backoffice.apis[0].port}`).with(rest()).with(authentication());

	await api.login({
		email: backoffice.env.ADMIN_EMAIL,
		password: backoffice.env.ADMIN_PASSWORD,
	});

	const loginMsg = await messages.waitFor((msgs) => msgs.find((msg) => msg.includes('/auth/login')));
	const loginData = JSON.parse(loginMsg ?? '{}');

	expect(loginData.res.headers['set-cookie']).toBe('--redacted--');

	// TODO: fix SDK bug?
	// await api.refresh();

	// const refreshMsg = await messages.waitFor((msgs) => msgs.find((msg) => msg.includes('/auth/refresh')));
	// const refreshData = JSON.parse(refreshMsg ?? '{}');

	// expect(refreshData.res.headers['set-cookie']).toBe('--redacted--');

	await backoffice.stop();
});
