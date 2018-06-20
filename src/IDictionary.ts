import { IDictionaryItem } from "./IDictionaryItem";
export interface IDictionary<T> {
  getItem(key: T): IDictionaryItem<T> | null;
  addItem(key: T, value: any): void;
  removeItem(key: T): void;
  exists(key: T): boolean;
  getIndex(key: T): number;
}
