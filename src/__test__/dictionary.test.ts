import { Dictionary } from "../Dictionary";
import { DictionaryItem } from "../DictionaryItem";

test("expect items count to be zero on creation", () => {
  const dictionary = new Dictionary<string>();
  expect(dictionary.Items).toEqual([]);
});

test("expect to be added with new key", () => {
  const dictionary = new Dictionary<string>();
  const key = "test";
  expect(dictionary.Items.length).toEqual(0);

  dictionary.addItem(key, "value");
  expect(dictionary.Items.length).toEqual(1);
});

test("expect to get added item", () => {
  const dictionary = new Dictionary<string>();
  const key = "test";
  expect(dictionary.Items.length).toEqual(0);

  dictionary.addItem(key, "value");
  const item: DictionaryItem<string> | null = dictionary.getItem(key);
  expect(item).toEqual({ key, value: "value" });
});

test("expect to get null on wrong key", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	const item: DictionaryItem<string> | null = dictionary.getItem("totally wrong");
	expect(item).toEqual(null);
  });

test("expect to be overwritten after being added with same key", () => {
  const dictionary = new Dictionary<string>();
  const key = "test";
  expect(dictionary.Items.length).toEqual(0);

  dictionary.addItem(key, "value");
  dictionary.addItem(key, 1);
  dictionary.addItem(key, "value123");
  dictionary.addItem(key, 500);
  const item = dictionary.getItem(key);
  expect(dictionary.Items.length).toEqual(1);
  expect(item).toEqual({ key, value: 500 });
});

test("expect get item multiple items", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	dictionary.addItem(key2, 1);
	dictionary.addItem(key3, "value123");
	const item1 = dictionary.getItem(key);
	const item2 = dictionary.getItem(key2);
	const item3 = dictionary.getItem(key3);
	expect(dictionary.Items.length).toEqual(3);
	expect(item1).toEqual(new DictionaryItem<string>(key, "value"));
	expect(item2).toEqual(new DictionaryItem<string>(key2, 1));
	expect(item3).toEqual(new DictionaryItem<string>(key3, "value123"));
  });

test("expect get index single item", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	const index = dictionary.getIndex(key);
	expect(dictionary.Items.length).toEqual(1);
	expect(index).toBe(0);
  });


test("expect get index missing item", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	const index = dictionary.getIndex("wrong Key");
	expect(dictionary.Items.length).toEqual(1);
	expect(index).toBe(-1);
  });


  test("expect get index multiple items", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	dictionary.addItem(key2, 1);
	dictionary.addItem(key3, "value123");
	const index = dictionary.getIndex(key);
	const index2 = dictionary.getIndex(key2);
	const index3 = dictionary.getIndex(key3);
	expect(dictionary.Items.length).toEqual(3);
	expect(index).toBe(0);
	expect(index2).toBe(1);
	expect(index3).toBe(2);
  });


test("expect existing single item", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	const isExisting = dictionary.exists(key);
	expect(dictionary.Items.length).toEqual(1);
	expect(isExisting).toBe(true);
  });


test("expect missing item", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	const isExisting = dictionary.exists("wrong Key");
	expect(dictionary.Items.length).toEqual(1);
	expect(isExisting).toBe(false);
  });


  test("expect multiple items existing", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	dictionary.addItem(key2, 1);
	dictionary.addItem(key3, "value123");
	const itemExisting = dictionary.exists(key);
	const itemExisting2 = dictionary.exists(key2);
	const itemExisting3 = dictionary.exists(key3);
	expect(dictionary.Items.length).toEqual(3);
	expect(itemExisting).toBe(true);
	expect(itemExisting2).toBe(true);
	expect(itemExisting3).toBe(true);
  });

  test("expect multiple items existing after remove", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	dictionary.addItem(key2, 1);
	dictionary.addItem(key3, "value123");
	expect(dictionary.Items.length).toEqual(3);

	dictionary.removeItem(key2);
	const itemExisting = dictionary.exists(key);
	const itemIndex = dictionary.getIndex(key);

	const itemExisting2 = dictionary.exists(key2);
	const itemIndex2 = dictionary.getIndex(key2);

	const itemExisting3 = dictionary.exists(key3);
	const itemIndex3 = dictionary.getIndex(key3);

	expect(dictionary.Items.length).toEqual(2);
	expect(itemExisting).toBe(true);
	expect(itemIndex).toBe(0);

	expect(itemExisting2).toBe(false);
	expect(itemIndex2).toBe(-1);

	expect(itemExisting3).toBe(true);
	expect(itemIndex3).toBe(1);
  });

  test("expect item existing after remove with wrong key", () => {
	const dictionary = new Dictionary<string>();
	const key = "test";
	const key2 = "1234";
	const key3 = "Test4";
	expect(dictionary.Items.length).toEqual(0);

	dictionary.addItem(key, "value");
	dictionary.addItem(key2, 1);
	dictionary.addItem(key3, "value123");
	expect(dictionary.Items.length).toEqual(3);

	dictionary.removeItem("totally wrong key");
	expect(dictionary.Items.length).toEqual(3);
  });

