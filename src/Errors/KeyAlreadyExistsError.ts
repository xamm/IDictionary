export class KeyAlreadyExistsError extends Error {
	constructor() {
		const errorMessage = "An entry with this key already exists."
		super(errorMessage);
	}
}
