import type { RegistryDescribeResponse, RegistryListResponse } from '@backoffice/extensions-registry';
import formatTitle from '@backoffice/format-title';

type Extension = RegistryListResponse['data'][number] | RegistryDescribeResponse['data'];

export const formatName = (extension: Extension) => {
	let name = extension.name;

	if (name.startsWith('@')) {
		name = name.split('/')[1]!;
	}

	if (name.startsWith('backoffice-extension-')) {
		name = name.substring('backoffice-extension-'.length);
	}

	return formatTitle(name);
};
