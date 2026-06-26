import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const ContentTooLargeError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.ContentTooLarge,
	'Uploaded content is too large.',
	413,
);
