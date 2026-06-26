import { defineEndpoint } from '@backoffice/extensions-sdk';

export default defineEndpoint((router) => {
	router.get('/', (_req, res) => res.send('Hello, World!'));
});
