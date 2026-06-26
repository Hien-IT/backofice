import type {
	EditConfig as BackofficeEditConfig,
	ReceiveAction as BackofficeReceiveAction,
	SendAction as BackofficeSendAction,
	SavedData,
} from './backoffice.ts';

export type { SavedData, HighlightElementData, ConfirmData, CheckFieldAccessData } from './backoffice.ts';

export type EditConfigStrict = BackofficeEditConfig;

export type EditConfig = Omit<EditConfigStrict, 'fields'> & { fields?: EditConfigStrict['fields'] | string };

export type SendAction = BackofficeReceiveAction;
export type ReceiveAction = BackofficeSendAction;

export type ReceiveData = { action: ReceiveAction | null; data: unknown };

export type EditableElementOptions = {
	customClass?: string | undefined;
	onSaved?: ((data: Omit<SavedData, 'key'>) => void) | undefined;
};
