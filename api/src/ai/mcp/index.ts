export class BackofficeMCP {
	constructor(config: any) {}
	handleRequest(req: any, res: any) {
		res.status(403).json({ error: 'MCP is disabled' });
	}
}
