import { IDictionary } from "./IDictionary";
import { DictionaryItem } from "./DictionaryItem";

export class Dictionary<T> implements IDictionary<T> {
  constructor(private readonly items: DictionaryItem<T>[] = []) {}

  public get Items(): DictionaryItem<T>[] {
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

  public addItem(key: T, value: any): void {
    const index = this.getIndex(key);
    if (index === -1) {
      this.items.push(new DictionaryItem(key, value));
    } else {
      this.items.splice(index, 1, new DictionaryItem(key, value));
    }
  }

  public removeItem(key: T): void {
    const index = this.getIndex(key);
    if (index === -1) {
      return;
    }
    this.items.splice(index, 1);
  }

  public getItem(key: T): DictionaryItem<T> | null {
    const item = this.items.find(item => {
      return item.key === key;
    });
    return item == undefined ? null : item;
  }
}
