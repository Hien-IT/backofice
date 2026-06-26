import type { Accountability, SchemaOverview } from '@backoffice/types';
import type { Knex } from 'knex';

export interface Context {
	schema: SchemaOverview;
	knex: Knex;
	accountability?: Accountability;
}
