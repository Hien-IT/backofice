import { Permission } from '@backoffice/types';

export const appRecommendedPermissions: Partial<Permission>[] = [
	{
		collection: 'backoffice_comments',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_files',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_files',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_files',
		action: 'update',
		permissions: { uploaded_by: { _eq: '$CURRENT_USER' } },
		fields: [
			'title',
			'description',
			'tags',
			'location',
			'folder',
			'focal_point_x',
			'focal_point_y',
			'filename_download',
		],
	},
	{
		collection: 'backoffice_files',
		action: 'delete',
		permissions: { uploaded_by: { _eq: '$CURRENT_USER' } },
		fields: ['*'],
	},
	{
		collection: 'backoffice_dashboards',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_dashboards',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_dashboards',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_dashboards',
		action: 'delete',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_panels',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_panels',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_panels',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_panels',
		action: 'delete',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_folders',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_folders',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_folders',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_folders',
		action: 'delete',
		permissions: {},
	},
	{
		collection: 'backoffice_users',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_users',
		action: 'update',
		permissions: {
			id: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: [
			'first_name',
			'last_name',
			'email',
			'password',
			'location',
			'title',
			'description',
			'avatar',
			'language',
			'appearance',
			'theme_light',
			'theme_dark',
			'theme_light_overrides',
			'theme_dark_overrides',
			'tfa_secret',
		],
	},
	{
		collection: 'backoffice_roles',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_shares',
		action: 'read',
		permissions: {
			_or: [
				{
					// TODO should this be _in $CURRENT_ROLES?
					role: {
						_eq: '$CURRENT_ROLE',
					},
				},
				{
					role: {
						_null: true,
					},
				},
			],
		},
		fields: ['*'],
	},
	{
		collection: 'backoffice_shares',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'backoffice_shares',
		action: 'update',
		permissions: {
			user_created: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: ['*'],
	},
	{
		collection: 'backoffice_shares',
		action: 'delete',
		permissions: {
			user_created: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: ['*'],
	},
	{
		collection: 'backoffice_flows',
		action: 'read',
		permissions: {
			trigger: {
				_eq: 'manual',
			},
		},
		fields: ['id', 'status', 'name', 'icon', 'color', 'options', 'trigger'],
	},
];

export const editablePermissionActions = ['create', 'read', 'update', 'delete', 'share'] as const;
export type EditablePermissionsAction = (typeof editablePermissionActions)[number];

export const disabledActions: Record<string, EditablePermissionsAction[]> = {
	backoffice_extensions: ['create', 'delete'],
};
