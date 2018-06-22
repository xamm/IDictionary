import { IDictionaryItem } from "./IDictionaryItem";

export class DictionaryEntry<T> implements IDictionaryItem<T> {
  constructor(public key: T, public value: any) {}
}
