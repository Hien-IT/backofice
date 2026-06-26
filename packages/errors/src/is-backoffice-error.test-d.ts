import { expectTypeOf, test } from 'vitest';
import { ErrorCode } from './codes.js';
import type { BackofficeError } from './create-error.js';
import { ContainsNullValuesError, type ContainsNullValuesErrorExtensions } from './errors/contains-null-values.js';
import { ContentTooLargeError } from './errors/content-too-large.js';
import { isBackofficeError } from './is-backoffice-error.js';

test('Guards input as BackofficeError', () => {
	expectTypeOf(isBackofficeError).guards.toEqualTypeOf<BackofficeError<unknown>>();
});

test('Returns specific type when provided code for built-in error', () => {
	const contentTooLargeError = new ContentTooLargeError();

	if (isBackofficeError(contentTooLargeError, ErrorCode.ContentTooLarge)) {
		expectTypeOf(contentTooLargeError).toEqualTypeOf<BackofficeError<never>>();
	}

	const containsNullValuesError = new ContainsNullValuesError({ collection: 'sample', field: 'sample' });

	if (isBackofficeError(containsNullValuesError, ErrorCode.ContainsNullValues)) {
		expectTypeOf(containsNullValuesError).toEqualTypeOf<BackofficeError<ContainsNullValuesErrorExtensions>>();
	}
});

test('Returns unknown when provided code is not a built-in error', () => {
	const error = { name: 'BackofficeError', code: 'CustomError' };

	if (isBackofficeError(error, error.code)) {
		expectTypeOf(error).toEqualTypeOf<BackofficeError<unknown>>();
	}
});

test('Allows to pass custom extensions type', () => {
	const error = { name: 'BackofficeError' };

	type CustomBackofficeErrorExtensions = { custom: string };

	if (isBackofficeError<CustomBackofficeErrorExtensions>(error)) {
		expectTypeOf(error).toEqualTypeOf<BackofficeError<CustomBackofficeErrorExtensions>>();
	}
});
