export interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
}

export class Dictionary<T> implements IDictionary<T> {

    _keys: string[] = [];
    _values: T[] = [];

    constructor(init?: { key: string; value: T; }[],
        array?: { values: T[], getKey: (o: T) => string }) {
        if (init) {
            for (var x = 0; x < init.length; x++) {
                this.add(init[x].key, init[x].value);
            }
        }
        if (array) {
            for (var x = 0; x < array.values.length; x++) {
                this.add(array.getKey(array.values[x]), 
                    array.values[x]);
            }
        }
    }

    add(key: string, value: T) {
        var i = this._keys.indexOf(key);
        if (i !== -1) {
            this[key] = value;
            this._values[i] = value;
            return;
        }

        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary<T> {
        return this;
    }
}