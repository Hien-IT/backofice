import { LOCAL_TYPES, TYPES } from '@backoffice/constants';
import { defineDisplay } from '@backoffice/extensions';

export default defineDisplay({
	id: 'raw',
	name: '$t:displays.raw.raw',
	icon: 'code',
	component: ({ value }) => (typeof value === 'string' ? value : JSON.stringify(value)),
	options: [],
	types: TYPES,
	localTypes: LOCAL_TYPES,
});
