import { ChildProcess } from 'child_process';

const global = {
	backoffice: {} as { [vendor: string]: ChildProcess },
	backofficeNoCache: {} as { [vendor: string]: ChildProcess },
};

export default global;
