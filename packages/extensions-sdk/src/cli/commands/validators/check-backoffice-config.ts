import path from 'path';
import { API_EXTENSION_TYPES, EXTENSION_TYPES } from '@backoffice/constants';
import { EXTENSION_PKG_KEY } from '@backoffice/extensions';
import fse from 'fs-extra';
import { type Ora } from 'ora';
import semver from 'semver';
import type { Report } from '../../types.js';

const checkBackofficeConfig = {
	name: 'backoffice-config',
	handler: async (spinner: Ora, reports: Array<Report>): Promise<string> => {
		spinner.text = 'Checking package file exists';

		const packagePath = path.resolve('package.json');

		if (!(await fse.pathExists(packagePath))) {
			spinner.fail();

			const message = 'No package.json';

			reports.push({
				level: 'error',
				message: `${checkBackofficeConfig.name}: ${message}`,
			});

			throw new Error(message);
		}

		const packageFile = await fse.readJson(packagePath);

		spinner.text = `Checking ${EXTENSION_PKG_KEY} is present`;

		if (!packageFile[EXTENSION_PKG_KEY]) {
			spinner.fail();

			const message = `"${EXTENSION_PKG_KEY}" not found in ${packagePath}`;

			reports.push({
				level: 'error',
				message: `${checkBackofficeConfig.name}: ${message}`,
			});

			throw new Error(message);
		}

		const packageObject = packageFile[EXTENSION_PKG_KEY];
		const { type, host, sandbox } = packageObject;
		let extensionPath = packageObject.path;

		spinner.text = `Checking extension type`;

		if (!EXTENSION_TYPES.includes(type)) {
			spinner.fail();
			const message = `Invalid Backoffice Extension Type: ${type}`;

			reports.push({
				level: 'error',
				message: `${checkBackofficeConfig.name}: ${message}`,
			});

			throw new Error(message);
		}

		spinner.text = `Checking extension path(s)`;

		if (typeof extensionPath === 'string') {
			extensionPath = { app: extensionPath };
		}

		Object.keys(extensionPath).forEach(async (key) => {
			if (!(await fse.pathExists(path.resolve(extensionPath[key])))) {
				spinner.fail();
				const message = `Extension path ${key}: ${extensionPath[key]} invalid`;

				reports.push({
					level: 'error',
					message: `${checkBackofficeConfig.name}: ${message}`,
				});

				throw new Error(message);
			}
		});

		spinner.text = 'Checking for valid Backoffice host version';

		if (!semver.validRange(host)) {
			spinner.fail();
			const message = `${host} not a valid Backoffice version`;

			reports.push({
				level: 'error',
				message: `${checkBackofficeConfig.name}: ${message}`,
			});

			throw new Error(message);
		}

		spinner.text = 'Checking if it will publish to the Backoffice Marketplace';

		if (type === 'bundle' || (sandbox && !sandbox?.enabled && API_EXTENSION_TYPES.findIndex(type) >= 0)) {
			reports.push({
				level: 'warn',
				message: `${checkBackofficeConfig.name}: Extension won't be generally visible in the Backoffice Marketplace`,
			});
		}

		const message = `Valid ${EXTENSION_PKG_KEY} Object`;

		reports.push({
			level: 'info',
			message: `${checkBackofficeConfig.name}: ${message}`,
		});

		return (spinner.text = message);
	},
};

export default checkBackofficeConfig;
