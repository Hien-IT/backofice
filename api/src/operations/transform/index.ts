import { defineOperationApi } from '@backoffice/extensions';
import { optionToObject } from '@backoffice/utils';

type Options = {
	json: string | Record<string, any>;
};

export default defineOperationApi<Options>({
	id: 'transform',

	handler: ({ json }) => {
		return optionToObject(json);
	},
});
