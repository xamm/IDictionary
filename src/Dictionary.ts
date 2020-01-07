import { IDictionaryEntry } from "./IDictionaryEntry";
import { IDictionary } from "./IDictionary";
import { KeyFalsyError } from "./Errors/KeyFalsyError";
import { KeyAlreadyExistsError } from "./Errors/KeyAlreadyExistsError";

/**
 * @description Implements a dictionary inspired by the dotnet api.
 * @export
 * @class Dictionary
 * @implements {IDictionary}
 */
export class Dictionary implements IDictionary {
	constructor(private readonly store: any = {}) { }

	/**
	 * @description Returns the number of key-value pairs in the dictionary.
	 * @readonly
	 * @type {number}
	 * @memberof Dictionary
	 */
	public get Count(): number {
		return this.Keys.length;
	}

	/**
	 * @description Removes all key-value pairs from the dictionary.
	 * @memberof Dictionary
	 */
	public clear(): void {
		const keys = this.Keys;
		keys.forEach(key => delete this.store[key]);
	}

	/**
	 * @description Returns all key-value pairs in the dictionary.
	 * @readonly
	 * @type {IDictionaryEntry[]}
	 * @memberof Dictionary
	 */
	public get Entries(): IDictionaryEntry[] {
		return this.Keys.map(key => this.store[key]) as IDictionaryEntry[];
	}

	/**
	 * @description Returns all keys used in the dictionary.
	 * @readonly
	 * @type {string[]}
	 * @memberof Dictionary
	 */
	public get Keys(): string[] {
		return Object.keys(this.store);
	}

	/**
	 * @description Returns all values stored in the dictionary.
	 * @readonly
	 * @type {any[]}
	 * @memberof Dictionary
	 */
	public get Items(): any[] {
		return this.Keys.map(key => this.store[key].value);
	}

	/**
	 * @description Searches the given key in all key-value pairs. Throws error if key is falsy.
	 * @param {string} key Key to search in all key-value pairs.
	 * @returns {boolean} True if key is found, otherwise false.
	 * @memberof Dictionary
	 */
	public containsKey(key: string): boolean {
		if (!key)
			throw new KeyFalsyError();
		return this.store.hasOwnProperty(key);
	}

	/**
	 * @description Searches the given value in all key-value pairs. 
	 * @param {*} value Value to search in all key-value pairs.
	 * @returns True if value is found in the dictionary, otherwise false.
	 * @memberof Dictionary
	 */
	public containsValue(value: any) {
		return this.Items.some(item => item === value);
	}

	/**
	 * @description Adds key-value pair to the dictionary.
	 * @param {string} key Throws error if key is false. Throws error if key is already used in the dictionary.
	 * @param {*} value Value can be of any type.
	 * @memberof Dictionary
	 */
	public add(key: string, value: any): void {
		if (!key)
			throw new KeyFalsyError();
		if (this.containsKey(key))
			throw new KeyAlreadyExistsError();

		this.store[key] = { key, value };
	}

	/**
	 * @description Adds key-value pair to the dictionary.
	 * @param {string} key Throws error if key is false.
	 * @param {*} value Value can be of any type.
	 * @returns {boolean} True if pair could be added, otherwise false.
	 * @memberof Dictionary
	 */
	public tryAdd(key: string, value: any): boolean {
		if (!key)
			throw new KeyFalsyError();
		if (this.containsKey(key))
			return false;

		this.add(key, value);
		return true;
	}

	/**
	 * @description Adds key-value pair to the dictionary. 
	 * @param {string} key If key already exists overwrites value.
	 * @param {*} value Value can be of any type.
	 * @memberof Dictionary
	 */
	public forceAdd(key: string, value: any): void {
		this.store[key] = { key, value };
	}

	/**
	 * @description Removes key-value pair from the dictionary.
	 * @param {string} key Throws error if key is falsy.
	 * @returns {boolean} True if key is present in the dictionary and value is removed, otherwise false.
	 * @memberof Dictionary
	 */
	public remove(key: string): boolean {
		if (this.containsKey(key)) {
			delete this.store[key]
			return true;
		}
		return false;
	}

	/**
	 * @description Retrieves the key-value pair from the dictionary.
	 * @param {string} key Key to lookup key-value pair.
	 * @returns {(IDictionaryEntry | null)} The dictionary entry if key-value pair exists, otherwise null.
	 * @memberof Dictionary
	 */
	public tryGetEntry(key: string): IDictionaryEntry | null {
		const item = this.store[key];
		return item == undefined ? null : item;
	}

	/**
	 * @description Retrieves the value of the key-value pair from the dictionary.
	 * @param {string} key
	 * @returns {(any | null)} The value of the dictionary entry if key-value pair exists, otherwise null.
	 * @memberof Dictionary
	 */
	public tryGetValue(key: string): any | null {
		const item = this.store[key] as IDictionaryEntry | undefined;
		return item == undefined ? null : item.value;
	}
}
