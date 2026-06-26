#!/usr/bin/env node
import { updateCheck } from '@backoffice/update-check';
import { version } from './version.js';

if (version) {
	await updateCheck(version);
}

import('@backoffice/api/cli/run.js');
