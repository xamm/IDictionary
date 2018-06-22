import { IDictionary } from "./IDictionary";
import { DictionaryEntry } from "./DictionaryEntry";

export class Dictionary<T> implements IDictionary<T> {
  constructor(private readonly items: DictionaryEntry<T>[] = []) {}

  public get Items(): DictionaryEntry<T>[] {
    return this.items;
  }

  public getIndex(key: T): number {
    const index = this.items.findIndex(item => {
      return item.key === key;
    });
    return index;
  }

  public exists(key: T): boolean {
    const index = this.items.findIndex(item => {
      return item.key === key;
    });
    if (index === -1) {
      return false;
    }
    return true;
  }

  public add(key: T, value: any): void {
    if (this.exists(key)) {
      throw new Error("An entry with this key already exists.");
	}
    this.items.push(new DictionaryEntry(key, value));
  }

  public forceAdd(key: T, value: any): void {
    const index = this.getIndex(key);
    if (index === -1) {
      this.items.push(new DictionaryEntry(key, value));
    } else {
      this.items.splice(index, 1, new DictionaryEntry(key, value));
    }
  }

  public remove(key: T): void {
    const index = this.getIndex(key);
    if (index === -1) {
      return;
    }
    this.items.splice(index, 1);
  }

  public get(key: T): DictionaryEntry<T> | null {
    const item = this.items.find(item => {
      return item.key === key;
    });
    return item == undefined ? null : item;
  }
}
