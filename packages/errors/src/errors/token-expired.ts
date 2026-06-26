import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const TokenExpiredError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.TokenExpired,
	'Token expired.',
	401,
);
