import { PrimaryKey as PrimaryKeyOrig } from '@backoffice/types';
import { MaybeRef } from 'vue';

export type Collection = MaybeRef<string | null>;

export type PrimaryKey = MaybeRef<PrimaryKeyOrig | null>;

export type IsNew = MaybeRef<boolean>;
