
export interface CacheOptions {
    interval?: number;
}

export interface FetchOptions extends CacheOptions {
    key: string;
}

type CacheStore = {
    [key: string]: CacheEntry
}

interface CacheEntry {
    value?: any;
    interval: number;
    nextUpdate: number;
    update: () => any;
}

export default class Cache {
    private store: CacheStore = {};
    private defaultInterval: number;

    constructor(options: CacheOptions = { }) {
        this.defaultInterval = options.interval || 30000;

        this.fetch = this.fetch.bind(this);
    }

    async fetch(options: FetchOptions | string, update: () => any): Promise<any> {
        const now = Date.now();
        const key = typeof options === 'object' ? options.key : options;
        let cacheEntry = this.store[key];

        if (!cacheEntry) {
            // merge options into default fetch options
            cacheEntry = {
                interval: this.defaultInterval,
                nextUpdate: now,
                update: update || (() => { return null }),
            };
            if (typeof options === 'object' && options.interval) {
                cacheEntry.interval = options.interval;
                cacheEntry.nextUpdate = now;
            }
            this.store[key] = cacheEntry;
        }

        if (now >= cacheEntry.nextUpdate) {
            cacheEntry.value = await cacheEntry.update();
            cacheEntry.nextUpdate = now + cacheEntry.interval;
            this.store[key] = cacheEntry;
            return cacheEntry.value;
        } else {
            return cacheEntry.value;
        }
    }
};
