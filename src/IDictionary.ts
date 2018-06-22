import { IDictionaryEntry } from "./IDictionaryItem";
export interface IDictionary<T> {
  get(key: T): IDictionaryEntry<T> | null;
  remove(key: T): void;
  exists(key: T): boolean;
  getIndex(key: T): number;
  forceAdd(key: T, value: any): void;
  add(key: T, value: any): void;
}
