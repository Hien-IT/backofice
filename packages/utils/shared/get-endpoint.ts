import { isSystemCollection } from '@backoffice/system-data';

export function getEndpoint(collection: string): string {
	if (isSystemCollection(collection)) {
		return `/${collection.substring(11)}`;
	}

	return `/items/${collection}`;
}
