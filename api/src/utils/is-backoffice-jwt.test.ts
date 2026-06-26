import jwt from 'jsonwebtoken';
import { expect, test } from 'vitest';
import isBackofficeJWT from './is-backoffice-jwt.js';

test('Returns false for non JWT string', () => {
	const result = isBackofficeJWT('test');
	expect(result).toBe(false);
});

test('Returns false for JWTs with text payload', () => {
	const token = jwt.sign('plaintext', 'secret');
	const result = isBackofficeJWT(token);
	expect(result).toBe(false);
});

test(`Returns false if token issuer isn't "backoffice"`, () => {
	const token = jwt.sign({ payload: 'content' }, 'secret', { issuer: 'rijk' });
	const result = isBackofficeJWT(token);
	expect(result).toBe(false);
});

test(`Returns true if token is valid JWT and issuer is "backoffice"`, () => {
	const token = jwt.sign({ payload: 'content' }, 'secret', { issuer: 'backoffice' });
	const result = isBackofficeJWT(token);
	expect(result).toBe(true);
});
