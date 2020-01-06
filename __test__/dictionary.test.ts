import { Dictionary } from "../src/Dictionary";
import { IDictionaryEntry } from "../src/IDictionaryEntry";
import { KeyFalsyError } from "../src/Errors/KeyFalsyError";

test("expect items count to be zero on creation", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Items).toEqual([]);
});

test("expect to be added with new key", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	expect(dictionary.Items.length).toEqual(1);
});

test("expect to get added item", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	const item: IDictionaryEntry | null = dictionary.tryGetEntry(key);
	expect(item).toEqual({ key, value: "value" });
});

test("expect to get null as value when key is not in dictionary", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	const value = dictionary.tryGetValue("wrongKey");
	expect(value).toEqual(null);
});

test("expect to get value of added item", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	const value: IDictionaryEntry | null = dictionary.tryGetValue(key);
	expect(value).toEqual("value");
});

test("expect to get null on wrong key", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	const item: IDictionaryEntry | null = dictionary.tryGetEntry("totally wrong");
	expect(item).toEqual(null);
});

test("expect to be overwritten after being added with same key", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	dictionary.forceAdd(key, 1);
	dictionary.forceAdd(key, "value123");
	dictionary.forceAdd(key, 500);
	const item = dictionary.tryGetEntry(key);
	expect(dictionary.Items.length).toEqual(1);
	expect(item).toEqual({ key, value: 500 });
});

test("expect get item multiple items", () => {
	const dictionary = new Dictionary();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	dictionary.forceAdd(key2, 1);
	dictionary.forceAdd(key3, "value123");
	const item1 = dictionary.tryGetEntry(key);
	const item2 = dictionary.tryGetEntry(key2);
	const item3 = dictionary.tryGetEntry(key3);
	expect(dictionary.Items.length).toEqual(3);
	expect(item1).toEqual({ key, value: "value" });
	expect(item2).toEqual({ key: key2, value: 1 });
	expect(item3).toEqual({ key: key3, value: "value123" });
});


test("expect existing single item", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	const isExisting = dictionary.containsKey(key);
	expect(dictionary.Items.length).toEqual(1);
	expect(isExisting).toBe(true);
});

test("expect multiple items existing", () => {
	const dictionary = new Dictionary();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	dictionary.forceAdd(key2, 1);
	dictionary.forceAdd(key3, "value123");
	const itemExisting = dictionary.containsKey(key);
	const itemExisting2 = dictionary.containsKey(key2);
	const itemExisting3 = dictionary.containsKey(key3);
	expect(dictionary.Items.length).toEqual(3);
	expect(itemExisting).toBe(true);
	expect(itemExisting2).toBe(true);
	expect(itemExisting3).toBe(true);
});

test("expect multiple items existing after remove", () => {
	const dictionary = new Dictionary();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	dictionary.forceAdd(key2, 1);
	dictionary.forceAdd(key3, "value123");
	expect(dictionary.Items.length).toEqual(3);

	const removed = dictionary.remove(key2);
	const itemExisting = dictionary.containsKey(key);
	const itemExisting2 = dictionary.containsKey(key2);
	const itemExisting3 = dictionary.containsKey(key3);

	expect(dictionary.Items.length).toEqual(2);
	expect(removed).toBe(true);
	expect(itemExisting).toBe(true);
	expect(itemExisting2).toBe(false);
	expect(itemExisting3).toBe(true);
});

test("expect item existing after remove with wrong key", () => {
	const dictionary = new Dictionary();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.forceAdd(key, "value");
	dictionary.forceAdd(key2, 1);
	dictionary.forceAdd(key3, "value123");
	expect(dictionary.Items.length).toEqual(3);

	const removed = dictionary.remove("totally wrong key");
	expect(removed).toBe(false);
	expect(dictionary.Items.length).toEqual(3);
});

test("expect add to add an item to empty items", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.add(key, "value");
	expect(dictionary.Items.length).toEqual(1);
});

test("expect add to add multiple items to empty items", () => {
	const dictionary = new Dictionary();
	const key = "test";
	const key2 = "secondKey";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.add(key, "value");
	dictionary.add(key2, "value2");
	expect(dictionary.Items.length).toEqual(2);
});

test("expect add to throw exception if key exists already", () => {
	const dictionary = new Dictionary();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.add(key, "value");
	expect(() => dictionary.add(key, "value2")).toThrowError(
		"An entry with this key already exists."
	);
	expect(dictionary.Items.length).toEqual(1);
});

test("expect add to throw exception if key is falsy", () => {
	const dictionary = new Dictionary();
	const key1 = "";
	expect(dictionary.Items.length).toEqual(0);

	expect(() => dictionary.add(key1, "1231")).toThrowError(KeyFalsyError);
});

test("containsKey throws error if key is falsy", () => {
	const dictionary = new Dictionary();
	expect(() => dictionary.containsKey("")).toThrowError(KeyFalsyError);
});

test("remove throws error if key is falsy", () => {
	const dictionary = new Dictionary();
	expect(() => dictionary.remove("")).toThrowError(KeyFalsyError);
});

test("tryadd throws error if key is falsy", () => {
	const dictionary = new Dictionary();
	expect(() => dictionary.tryAdd("", "testValue")).toThrowError(KeyFalsyError);
});

test("get all items no entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Items.length).toEqual(0);
});

test("get all items one entry made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Items.length).toEqual(0);
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.add(key, "value");
	expect(dictionary.Items.length).toEqual(1);
	expect(dictionary.Items[0]).toEqual("value");
});

test("get all items multiple entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Items.length).toEqual(0);
	const key = "test";

	dictionary.add(key, "value");
	dictionary.add("key2", "value2");
	expect(dictionary.Items.length).toEqual(2);
	expect(dictionary.Items[0]).toEqual("value");
	expect(dictionary.Items[1]).toEqual("value2");
});

test("get all keys no entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Keys.length).toEqual(0);
});

test("get all keys one entry made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Keys.length).toEqual(0);
	const key = "test";
	expect(dictionary.Keys.length).toEqual(0);

	dictionary.add(key, "value");
	expect(dictionary.Keys.length).toEqual(1);
	expect(dictionary.Keys[0]).toEqual(key);
});

test("get all keys multiple entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Keys.length).toEqual(0);
	const key = "test";

	dictionary.add(key, "value");
	dictionary.add("key2", "value2");
	expect(dictionary.Keys.length).toEqual(2);
	expect(dictionary.Keys[0]).toEqual(key);
	expect(dictionary.Keys[1]).toEqual("key2");
});

test("get all entries no entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Entries.length).toEqual(0);
});

test("get all Entries one entry made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Entries.length).toEqual(0);
	const key = "test";
	expect(dictionary.Entries.length).toEqual(0);

	dictionary.add(key, "value");
	expect(dictionary.Entries.length).toEqual(1);
	expect(dictionary.Entries[0]).toEqual(dictionary.tryGetEntry(key));
});

test("get all keys multiple entries made", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Entries.length).toEqual(0);
	const key = "test";

	dictionary.add(key, "value");
	dictionary.add("key2", "value2");
	expect(dictionary.Entries.length).toEqual(2);
	expect(dictionary.Entries[0]).toEqual(dictionary.tryGetEntry(key));
	expect(dictionary.Entries[1]).toEqual(dictionary.tryGetEntry("key2"));
});

test("performance, add many items and get some afterwards ", () => {
	const dictionary = new Dictionary();
	const entriesToEnter = 100000;
	const entriesToGet = 100;
	const keysToGet = [];
	for (let i = 0; i < entriesToGet; i++)
		keysToGet.push(i.toString());
	expect(dictionary.Items.length).toEqual(0);

	// add entries
	for (let i = 0; i < entriesToEnter; i++)
		dictionary.add(i.toString(), "value " + i.toString());

	// get entries
	for (const key in keysToGet)
		expect(dictionary.tryGetValue(key)).toEqual("value " + key.toString());

	expect(dictionary.Items.length).toEqual(entriesToEnter);
});

test("Count no entries should be 0", () => {
	const dictionary = new Dictionary();
	expect(dictionary.Count).toEqual(0);
});

test("Count one entry should be 1", () => {
	const dictionary = new Dictionary();
	dictionary.add("testKey", "oaijda");
	expect(dictionary.Count).toEqual(1);
});

test("Count multiple entries should equal the number of added entries with independant keys", () => {
	const dictionary = new Dictionary();
	dictionary.add("testKey", "1");
	dictionary.add("testKey2", "2");
	dictionary.add("testKey3", "3");

	dictionary.add("added", "4");
	dictionary.forceAdd("added", "5");

	expect(dictionary.Count).toEqual(4);
});

test("Remove all keys and values", () => {
	const dictionary = new Dictionary();
	dictionary.add("testKey", "1");
	dictionary.add("testKey2", "2");
	dictionary.add("testKey3", "3");
	expect(dictionary.Count).toEqual(3);

	dictionary.clear();

	expect(dictionary.Count).toEqual(0);
	expect(dictionary.Items.length).toEqual(0);
	expect(dictionary.Keys.length).toEqual(0);
	expect(dictionary.Entries.length).toEqual(0);
});

test("ContainsValue returns correct value", () => {
	const dictionary = new Dictionary();
	dictionary.add("testKey", "1");
	dictionary.add("testKey2", "2");
	dictionary.add("testKey3", "3");
	dictionary.add("added", "4");
	dictionary.forceAdd("added", "5");

	const shouldBeFalse = dictionary.containsValue("4");
	const shouldBeTrue = dictionary.containsValue("5");

	expect(shouldBeFalse).toBe(false);
	expect(shouldBeTrue).toBe(true);
});

test("tryAdd adds item if key does not exist and returns true", () => {
	const dictionary = new Dictionary();
	expect(dictionary.tryAdd("key", "value")).toBe(true);
	expect(dictionary.tryAdd("key2", "value")).toBe(true);
	expect(dictionary.Items.length).toEqual(2);
});

test("tryAdd does not add item if key does exist and returns false", () => {
	const dictionary = new Dictionary();
	const key = "key1"
	expect(dictionary.tryAdd(key, "value")).toBe(true);
	expect(dictionary.tryAdd(key, "1312")).toBe(false);
	expect(dictionary.Items.length).toEqual(1);
	expect(dictionary.tryGetValue(key)).toEqual("value");
});