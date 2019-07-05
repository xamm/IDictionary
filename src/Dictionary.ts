import { DictionaryEntry } from './DictionaryEntry';
import { IDictionary } from "./IDictionary";

export class Dictionary<T> implements IDictionary<T> {
  constructor(private readonly store: DictionaryEntry<T>[] = []) { }

  public get Entries(): DictionaryEntry<T>[] {
    return this.store;
  }

  public get Keys(): T[] {
    return this.store.map(entry => entry.key);
  }

  public get Items() {
    return this.store.map(entry => entry.value);
  }

  public getIndex(key: T): number {
    const index = this.store.findIndex(item => {
      return item.key === key;
    });
    return index;
  }

  public exists(key: T): boolean {
    const index = this.store.findIndex(item => {
      return item.key === key;
    });
    if (index === -1) {
      return false;
    }
    return true;
  }

  public add(key: T, value: string): void {
    if (this.exists(key)) {
      throw new Error("An entry with this key already exists.");
    }
    this.store.push(new DictionaryEntry(key, value));
  }

  public forceAdd(key: T, value: string | number): void {
    const index = this.getIndex(key);
    if (index === -1) {
      this.store.push(new DictionaryEntry(key, value));
    } else {
      this.store.splice(index, 1, new DictionaryEntry(key, value));
    }
  }

  public remove(key: T): void {
    const index = this.getIndex(key);
    if (index === -1) {
      return;
    }
    this.store.splice(index, 1);
  }

  public get(key: T): DictionaryEntry<T> | null {
    const item = this.store.find(item => {
      return item.key === key;
    });
    return item == undefined ? null : item;
  }
}
