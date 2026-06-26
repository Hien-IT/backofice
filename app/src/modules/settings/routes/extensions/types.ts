import { ExtensionType as ExtensionTypeOriginal } from '@backoffice/extensions';

export type ExtensionState = 'enabled' | 'disabled' | 'partial';

export type ExtensionType = ExtensionTypeOriginal | 'missing';
