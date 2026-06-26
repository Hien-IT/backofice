import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export interface InvalidProviderConfigErrorExtensions {
	provider: string;
	reason?: string;
}

export const InvalidProviderConfigError: BackofficeErrorConstructor<InvalidProviderConfigErrorExtensions> =
	createError<InvalidProviderConfigErrorExtensions>(ErrorCode.InvalidProviderConfig, 'Invalid config.', 503);
