import type { Accountability } from '@backoffice/types';
import { toArray } from '@backoffice/utils';
import type { Knex } from 'knex';
import { withCache } from '../../utils/with-cache.js';

export const fetchPoliciesIpAccess = withCache('policies-ip-access', _fetchPoliciesIpAccess, ({ user, roles }) => ({
	user,
	roles,
}));

export async function _fetchPoliciesIpAccess(
	accountability: Pick<Accountability, 'user' | 'roles'>,
	knex: Knex,
): Promise<string[][]> {
	const query = knex('backoffice_access')
		.select({ ip_access: 'backoffice_policies.ip_access' })
		.leftJoin('backoffice_policies', 'backoffice_access.policy', 'backoffice_policies.id')
		.whereNotNull('backoffice_policies.ip_access');

	// No roles and no user means unauthenticated request
	if (accountability.roles.length === 0 && !accountability.user) {
		query.where({
			role: null,
			user: null,
		});
	} else {
		query.where(function () {
			if (accountability.user) {
				this.orWhere('backoffice_access.user', accountability.user);
			}

			this.orWhereIn('backoffice_access.role', accountability.roles);
		});
	}

	const rows = await query;

	return rows.filter(({ ip_access }) => ip_access).map(({ ip_access }) => toArray(ip_access));
}
