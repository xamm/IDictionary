interface IDictionaryItem<T> {
  key: T;
  value: any;
}

class DictionaryItem<T> implements IDictionaryItem<T> {
  constructor(public key: T, public value: any) {}
}

interface IDictionary<T> {
  getItem(key: T): IDictionaryItem<T> | undefined;
  addItem(key: T, value: any): void;
  removeItem(key: T): void;
  exists(key: T): boolean;
  getIndex(key: T): number;
}

class Dictionary<T> implements IDictionary<T> {
  private readonly items: IDictionaryItem<T>[];

  constructor() {
    this.items = [];
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

  public getItem(key: T): DictionaryItem<T> | undefined {
    return this.items.find(item => {
      return item.key === key;
    });
  }
}