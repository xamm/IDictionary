"use strict";
class DictionaryItem {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
class Dictionary {
    constructor() {
        this.items = [];
    }
    getIndex(key) {
        const index = this.items.findIndex(item => {
            return item.key === key;
        });
        return index;
    }
    exists(key) {
        const index = this.items.findIndex(item => {
            return item.key === key;
        });
        if (index === -1) {
            return false;
        }
        return true;
    }
    addItem(key, value) {
        const index = this.getIndex(key);
        if (index === -1) {
            this.items.push(new DictionaryItem(key, value));
        }
        else {
            this.items.splice(index, 1, new DictionaryItem(key, value));
        }
    }
    removeItem(key) {
        const index = this.getIndex(key);
        if (index === -1) {
            return;
        }
        this.items.splice(index, 1);
    }
    getItem(key) {
        return this.items.find(item => {
            return item.key === key;
        });
    }
}
//# sourceMappingURL=dictionary.js.map