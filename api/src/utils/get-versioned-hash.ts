import { version } from 'backoffice/version';
import hash from 'object-hash';

export function getVersionedHash(item: Record<string, any>): string {
	return hash({ item, version });
}
