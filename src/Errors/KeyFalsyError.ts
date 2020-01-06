export class KeyFalsyError extends Error {
	constructor() {
		const errorMessage = "The key has a falsy value, this is not allowed."
		super(errorMessage);
	}
}