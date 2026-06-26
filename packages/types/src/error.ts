export interface BackofficeError<Extensions = void> extends Error {
	extensions: Extensions;
	code: string;
	status: number;
}
