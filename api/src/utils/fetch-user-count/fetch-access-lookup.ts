import type { PrimaryKey } from '@backoffice/types';
import type { Knex } from 'knex';

export interface AccessLookup {
	role: string | null;
	user: string | null;
	app_access: boolean | number;
	admin_access: boolean | number;
	user_status: 'active' | string;
	user_role: string | null;
}

export interface FetchAccessLookupOptions {
	excludeAccessRows?: PrimaryKey[];
	excludePolicies?: PrimaryKey[];
	excludeUsers?: PrimaryKey[];
	excludeRoles?: PrimaryKey[];
	adminOnly?: boolean;
	knex: Knex;
}

export async function fetchAccessLookup(options: FetchAccessLookupOptions): Promise<AccessLookup[]> {
	let query = options.knex
		.select(
			'backoffice_access.role',
			'backoffice_access.user',
			'backoffice_policies.app_access',
			'backoffice_policies.admin_access',
			'backoffice_users.status as user_status',
			'backoffice_users.role as user_role',
		)
		.from('backoffice_access')
		.leftJoin('backoffice_policies', 'backoffice_access.policy', 'backoffice_policies.id')
		.leftJoin('backoffice_users', 'backoffice_access.user', 'backoffice_users.id');

	if (options.excludeAccessRows && options.excludeAccessRows.length > 0) {
		query = query.whereNotIn('backoffice_access.id', options.excludeAccessRows);
	}

	if (options.excludePolicies && options.excludePolicies.length > 0) {
		query = query.whereNotIn('backoffice_access.policy', options.excludePolicies);
	}

	if (options.excludeUsers && options.excludeUsers.length > 0) {
		query = query.where((q) =>
			q.whereNotIn('backoffice_access.user', options.excludeUsers!).orWhereNull('backoffice_access.user'),
		);
	}

	if (options.excludeRoles && options.excludeRoles.length > 0) {
		query = query.where((q) =>
			q.whereNotIn('backoffice_access.role', options.excludeRoles!).orWhereNull('backoffice_access.role'),
		);
	}

	if (options.adminOnly) {
		query = query.where('backoffice_policies.admin_access', 1);
	}

	return query;
}
