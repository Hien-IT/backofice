import type { Permission } from '@backoffice/types';

export function hasItemPermissions(permission: Permission) {
	return permission.permissions !== null && Object.keys(permission.permissions).length > 0;
}
