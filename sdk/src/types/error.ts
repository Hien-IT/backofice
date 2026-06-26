// Also defined in packages/types/src/error.ts
export interface BackofficeApiError {
	message: string;
	extensions: {
		code: string;
		[key: string]: any;
	};
}

export interface BackofficeError<R = Response> {
	message: string;
	errors: BackofficeApiError[];
	response: R;
	data?: any;
}
