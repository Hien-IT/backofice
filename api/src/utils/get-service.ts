import { ForbiddenError } from '@backoffice/errors';
import type { AbstractServiceOptions } from '@backoffice/types';
import {
	AccessService,
	ActivityService,
	CommentsService,
	DashboardsService,
	DeploymentProjectsService,
	DeploymentRunsService,
	DeploymentService,
	FilesService,
	FlowsService,
	FoldersService,
	ItemsService,
	NotificationsService,
	OperationsService,
	PanelsService,
	PermissionsService,
	PoliciesService,
	PresetsService,
	RevisionsService,
	RolesService,
	SettingsService,
	SharesService,
	TranslationsService,
	UsersService,
	VersionsService,
} from '../services/index.js';

/**
 * Select the correct service for the given collection. This allows the individual services to run
 * their custom checks (f.e. it allows `UsersService` to prevent updating TFA secret from outside).
 */
export function getService(collection: string, opts: AbstractServiceOptions): ItemsService {
	switch (collection) {
		case 'backoffice_access':
			return new AccessService(opts);
		case 'backoffice_activity':
			return new ActivityService(opts);
		case 'backoffice_comments':
			return new CommentsService(opts);
		case 'backoffice_dashboards':
			return new DashboardsService(opts);
		case 'backoffice_files':
			return new FilesService(opts);
		case 'backoffice_flows':
			return new FlowsService(opts);
		case 'backoffice_folders':
			return new FoldersService(opts);
		case 'backoffice_notifications':
			return new NotificationsService(opts);
		case 'backoffice_operations':
			return new OperationsService(opts);
		case 'backoffice_panels':
			return new PanelsService(opts);
		case 'backoffice_permissions':
			return new PermissionsService(opts);
		case 'backoffice_presets':
			return new PresetsService(opts);
		case 'backoffice_policies':
			return new PoliciesService(opts);
		case 'backoffice_revisions':
			return new RevisionsService(opts);
		case 'backoffice_roles':
			return new RolesService(opts);
		case 'backoffice_settings':
			return new SettingsService(opts);
		case 'backoffice_shares':
			return new SharesService(opts);
		case 'backoffice_translations':
			return new TranslationsService(opts);
		case 'backoffice_users':
			return new UsersService(opts);
		case 'backoffice_versions':
			return new VersionsService(opts);
		case 'backoffice_deployments':
			return new DeploymentService(opts);
		case 'backoffice_deployment_projects':
			return new DeploymentProjectsService(opts);
		case 'backoffice_deployment_runs':
			return new DeploymentRunsService(opts);
		default:
			// Deny usage of other system collections via ItemsService
			if (collection.startsWith('backoffice_')) throw new ForbiddenError();

			return new ItemsService(collection, opts);
	}
}
