import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const UnexpectedResponseError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.UnexpectedResponse,
	'Received an unexpected response.',
	503,
);
