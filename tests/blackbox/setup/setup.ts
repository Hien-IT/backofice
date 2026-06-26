/* eslint-disable no-console */
import { spawn, spawnSync } from 'child_process';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import axios from 'axios';
import knex from 'knex';
import { Listr } from 'listr2';
import { clone } from 'lodash-es';
import config, { getUrl, paths } from '../common/config';
import vendors from '../common/get-dbs-to-test';
import { USER } from '../common/variables';
import { awaitDatabaseConnection, awaitBackofficeConnection } from '../utils/await-connection';
import global from './global';

export async function setup() {
	console.log(`👮‍♀️ Starting tests!\n`);

	await new Listr([
		{
			title: 'Bootstrap databases and start servers',
			task: async () => {
				return new Listr(
					vendors.map((vendor) => {
						return {
							title: config.names[vendor],
							task: async () => {
								const database = knex(config.knexConfig[vendor]);
								await awaitDatabaseConnection(database, config.knexConfig[vendor].waitTestSQL);

								if (vendor === 'sqlite3') {
									await fs.writeFile(join(paths.cwd, 'test.db'), '');
								}

								const bootstrap = spawnSync('node', [paths.cli, 'bootstrap'], {
									cwd: paths.cwd,
									env: config.envs[vendor],
								});

								if (bootstrap.status !== null && bootstrap.status !== 0) {
									throw new Error(
										`Backoffice-${vendor} bootstrap failed (${bootstrap.status}): \n ${bootstrap.stderr.toString()}`,
									);
								}

								await database.migrate.latest();
								await database.seed.run();
								await database.destroy();

								if (!process.env['TEST_LOCAL']) {
									const server = spawn('node', [paths.cli, 'start'], {
										cwd: paths.cwd,
										env: config.envs[vendor],
									});

									global.backoffice[vendor] = server;
									let serverOutput = '';
									server.stdout.setEncoding('utf8');

									server.stdout.on('data', (data) => {
										serverOutput += data.toString();
									});

									server.stderr.on('data', (data) => {
										serverOutput += data.toString();
										console.log(`[MAIN] ${data.toString()}`);
									});

									server.on('exit', async (code) => {
										if (process.env['TEST_SAVE_LOGS']) {
											await fs.writeFile(join(paths.cwd, `server-log-${vendor}.txt`), serverOutput);
										}

										if (code !== null)
											throw new Error(`Backoffice-${vendor} server failed (${code}): \n ${serverOutput}`);
									});

									// Give the server some time to start
									await awaitBackofficeConnection(Number(config.envs[vendor].PORT));

									// Set up separate backoffice instance without system cache
									const noCacheEnv = clone(config.envs[vendor]);
									noCacheEnv['CACHE_SCHEMA'] = 'false';
									noCacheEnv['PORT'] = String(parseInt(noCacheEnv.PORT) + 50);
									const serverNoCache = spawn('node', [paths.cli, 'start'], { cwd: paths.cwd, env: noCacheEnv });
									global.backofficeNoCache[vendor] = serverNoCache;
									let serverNoCacheOutput = '';
									serverNoCache.stdout.setEncoding('utf8');

									serverNoCache.stdout.on('data', (data) => {
										serverNoCacheOutput += data.toString();
									});

									serverNoCache.stderr.on('data', (data) => {
										serverNoCacheOutput += data.toString();
										console.log(`[NO CACHE] ${data.toString()}`);
									});

									serverNoCache.on('exit', async (code) => {
										if (process.env['TEST_SAVE_LOGS']) {
											await fs.writeFile(join(paths.cwd, `server-log-${vendor}-no-cache.txt`), serverNoCacheOutput);
										}

										if (code !== null) {
											throw new Error(`Backoffice-${vendor}-no-cache server failed (${code}): \n ${serverNoCacheOutput}`);
										}
									});

									// Give the server some time to start
									await awaitBackofficeConnection(Number(noCacheEnv['PORT']));
								}
							},
						};
					}),
					{ concurrent: true, rendererOptions: { collapseErrors: false } },
				);
			},
		},
		{
			title: 'Test server connectivity',
			task: async () => {
				for (const vendor of vendors) {
					try {
						const serverUrl = getUrl(vendor);

						const response = await axios.get(
							`${serverUrl}/items/tests_flow_data?access_token=${USER.TESTS_FLOW.TOKEN}`,
						);

						if (response.status === 200) {
							process.env['serverUrl'] = serverUrl;
							break;
						}
					} catch {
						continue;
					}
				}

				if (!process.env['serverUrl']) {
					throw new Error('Unable to connect to any Backoffice server');
				}
			},
		},
	])
		.run()
		.catch((reason) => {
			for (const server of Object.values(global.backoffice)) {
				server?.kill();
			}

			for (const serverNoCache of Object.values(global.backofficeNoCache)) {
				serverNoCache?.kill();
			}

			throw new Error(reason);
		});

	console.log('\n');
}

export async function teardown() {
	try {
		await fs.unlink('sequencer-data.json');
	} catch {
		// Ignore
	}

	if (!process.env['TEST_LOCAL']) {
		await new Listr([
			{
				title: 'Stop Backoffice servers',
				task: () => {
					return new Listr(
						vendors.map((vendor) => {
							return {
								title: config.names[vendor]!,
								task: async () => {
									const backoffice = global.backoffice[vendor];
									backoffice?.kill();

									const backofficeNoCache = global.backofficeNoCache[vendor];
									backofficeNoCache?.kill();
								},
							};
						}),
						{ concurrent: true, exitOnError: false },
					);
				},
			},
		]).run();
	}

	console.log('\n');

	console.log(`👮‍♀️ Tests complete!\n`);
}
