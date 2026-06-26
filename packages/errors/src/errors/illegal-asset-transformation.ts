import { createError, type BackofficeErrorConstructor, ErrorCode } from '../index.js';

export interface IllegalAssetTransformationErrorExtensions {
	invalidTransformations: string[];
}

export const IllegalAssetTransformationError: BackofficeErrorConstructor<IllegalAssetTransformationErrorExtensions> =
	createError<IllegalAssetTransformationErrorExtensions>(
		ErrorCode.IllegalAssetTransformation,
		'Illegal asset transformation.',
		400,
	);
