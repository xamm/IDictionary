import { IDictionaryEntry } from "./IDictionaryEntry";
import { IDictionary } from "./IDictionary";
import { KeyFalsyError } from "./Errors/KeyFalsyError";
import { KeyAlreadyExistsError } from "./Errors/KeyAlreadyExistsError";

export class Dictionary implements IDictionary {
	constructor(private readonly store: any = {}) { }

	public get Count(): number {
		return this.Keys.length;
	}

	public clear(): void {
		const keys = this.Keys;
		keys.forEach(key => delete this.store[key]);
	}

	public get Entries(): IDictionaryEntry[] {
		return this.Keys.map(key => this.store[key]) as IDictionaryEntry[];
	}

	public get Keys(): string[] {
		return Object.keys(this.store);
	}

	public get Items(): any[] {
		return this.Keys.map(key => this.store[key].value);
	}

	public containsKey(key: string): boolean {
		if (!key)
			throw new KeyFalsyError();
		return this.store.hasOwnProperty(key);
	}

	public containsValue(value: any) {
		return this.Items.some(item => item === value);
	}

	public add(key: string, value: any): void {
		if (!key)
			throw new KeyFalsyError();
		if (this.containsKey(key))
			throw new KeyAlreadyExistsError();

		this.store[key] = { key, value };
	}

	public tryAdd(key: string, value: any): boolean {
		if (!key)
			throw new KeyFalsyError();
		if (this.containsKey(key))
			return false;

		this.add(key, value);
		return true;
	}

	public forceAdd(key: string, value: string | number): void {
		this.store[key] = { key, value };
	}

	public remove(key: string): boolean {
		if (this.containsKey(key)) {
			delete this.store[key]
			return true;
		}
		return false;
	}

	public tryGetEntry(key: string): IDictionaryEntry | null {
		const item = this.store[key];
		return item == undefined ? null : item;
	}

	public tryGetValue(key: string): IDictionaryEntry | null {
		const item = this.store[key] as IDictionaryEntry | undefined;
		return item == undefined ? null : item.value;
	}
}
