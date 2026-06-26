import type { Database, Options } from '@backoffice/sandbox';
import { inject } from 'vitest';

export const database = process.env['DATABASE'] as Database;
export const env = inject('envs')?.[database];
export const port = inject('port')?.[database];
export const options = inject('options')?.[database] as Options;
