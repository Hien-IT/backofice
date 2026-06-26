import type { BackofficeError } from '../types/error.js';

/**
 * A type guard to check if an error is a Backoffice API error
 */
export function isBackofficeError<R = Response>(error: unknown): error is BackofficeError<R> {
	return (
		typeof error === 'object' &&
		error !== null &&
		'errors' in error &&
		Array.isArray(error.errors) &&
		'message' in error.errors[0] &&
		'extensions' in error.errors[0] &&
		'code' in error.errors[0].extensions
	);
}
