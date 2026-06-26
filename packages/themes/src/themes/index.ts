import type { Theme } from '@backoffice/types';
import { backofficeDefault as darkBackofficeDefault } from './dark/index.js';
import {
	backofficeColorMatch as lightBackofficeColorMatch,
	backofficeDefault as lightBackofficeDefault,
	backofficeMinimal as lightBackofficeMinimal,
} from './light/index.js';

// We're using manually defined arrays here to guarantee the order
export const dark: Theme[] = [darkBackofficeDefault];
export const light: Theme[] = [lightBackofficeDefault, lightBackofficeMinimal, lightBackofficeColorMatch];
