export class InternalSearchParams {
    items: string[];
    mappedItems: [string, string][];
    lastAccessedKey: string;
    lastAccessedIndex: number;

    constructor(search: string) {
        const searchParams = search.substring(1).split('&');

        this.items = searchParams;
        this.mappedItems = searchParams.map(param => {
            const keyValuePair = param.split('=');
            return [keyValuePair[0], keyValuePair[1]];
        });
    }

    set(key: string, value: string) {
        const index = this.indexOf(key);
        this.mappedItems[index][1] = value;
        this.items[index] = `${key}=${value}`;
    }

    replaceKey(oldKey: string, newKey: string) {
        const index = this.indexOf(oldKey);

        if (index >= 0) {
            const item = this.mappedItems[index];

            item[0] = newKey;

            this.items[index] = `${newKey}=${item[1]}`;
            this.lastAccessedKey = newKey;
        }
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.mappedItems.length) {
                    const value = this.mappedItems[index++];
                    return { value, done: false };
                } else {
                    return { done: true };
                }
            }
        }
    }

    toString() {
        return this.items.join('&');
    }

    private indexOf(key: string) {
        if (this.lastAccessedKey === key)
            return this.lastAccessedIndex;

        this.lastAccessedKey = key;
        return this.lastAccessedIndex = this.mappedItems.findIndex(i => i[0] === key);
    }
}