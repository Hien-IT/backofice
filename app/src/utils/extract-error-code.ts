import type { BackofficeError } from '@backoffice/sdk';
import type { RequestError } from '@/api';
import type { APIError } from '@/types/error';

export function extractErrorCode(error: unknown): string {
	return (
		(error as RequestError).response?.data?.errors?.[0]?.extensions?.code ||
		(error as BackofficeError)?.errors?.[0]?.extensions?.code ||
		(error as APIError)?.extensions?.code ||
		'UNKNOWN'
	);
}
