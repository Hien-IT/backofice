import jwt from 'jsonwebtoken';

/**
 * Check if a given string conforms to the structure of a JWT
 * and whether it is issued by Backoffice.
 */
export default function isBackofficeJWT(string: string): boolean {
	try {
		const payload = jwt.decode(string, { json: true });
		if (payload?.iss !== 'backoffice') return false;
		return true;
	} catch {
		return false;
	}
}
