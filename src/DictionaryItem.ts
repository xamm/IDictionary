import { IDictionaryItem } from "./IDictionaryItem";

export class DictionaryItem<T> implements IDictionaryItem<T> {
  constructor(public key: T, public value: any) {}
}
