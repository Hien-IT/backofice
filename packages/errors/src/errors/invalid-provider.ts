import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const InvalidProviderError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.InvalidProvider,
	'Invalid provider.',
	403,
);
