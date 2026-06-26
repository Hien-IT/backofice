import type { MergeCoreCollection } from '../index.js';
import type { BackofficeUser } from './user.js';

/**
 * Backoffice Deployment configuration
 */
export type BackofficeDeployment<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_deployments',
	{
		id: string;
		provider: string;
		credentials: Record<string, any>;
		options: Record<string, any> | null;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
		projects: BackofficeDeploymentProject<Schema>[] | string[];
	}
>;

/**
 * Backoffice Deployment Project
 */
export type BackofficeDeploymentProject<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_deployment_projects',
	{
		id: string;
		deployment: BackofficeDeployment<Schema> | string;
		external_id: string;
		name: string;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
	}
>;

/**
 * Backoffice Deployment Run
 */
export type BackofficeDeploymentRun<Schema = any> = MergeCoreCollection<
	Schema,
	'backoffice_deployment_runs',
	{
		id: string;
		project: BackofficeDeploymentProject<Schema> | string;
		external_id: string;
		status: 'building' | 'ready' | 'error' | 'canceled';
		target: string;
		url: string | null;
		started_at: 'datetime' | null;
		completed_at: 'datetime' | null;
		date_created: 'datetime' | null;
		user_created: BackofficeUser<Schema> | string | null;
		logs?: { timestamp: Date | string; type: 'stdout' | 'stderr' | 'info'; message: string }[];
	}
>;
