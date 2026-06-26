import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export const OutOfDateError: BackofficeErrorConstructor<void> = createError(
	ErrorCode.OutOfDate,
	'Operation could not be executed: Your current instance of Backoffice is out of date.',
	503,
);
