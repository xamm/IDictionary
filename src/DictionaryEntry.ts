import { IDictionaryEntry } from "./IDictionaryItem";

export class DictionaryEntry<T> implements IDictionaryEntry<T> {
  constructor(public key: T, public value: any) {}
}
