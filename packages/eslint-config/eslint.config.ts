import backofficeConfig from './src/index.js';

export default [
	...backofficeConfig,
	{
		ignores: ['fixtures'],
	},
];
