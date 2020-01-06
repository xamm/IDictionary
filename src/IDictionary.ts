import { IDictionaryEntry } from "./IDictionaryEntry";

export interface IDictionary {
	add(key: string, value: any): void;
	forceAdd(key: string, value: any): void;
	tryGetValue(key: string): any | null;
	tryGetEntry(key: string): IDictionaryEntry | null
	clear(): void;
	containsKey(key: string): boolean;
	containsValue(value: string): boolean;
	remove(key: string): boolean;
	tryAdd(key: string, value: any): boolean;
}
