import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const InvalidIpError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.InvalidIp,
	'Invalid IP address.',
	401,
);
