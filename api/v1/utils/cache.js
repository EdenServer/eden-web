class Cache {
    constructor(options = {}) {
        this.store = {};
        this.defaultInterval = options.interval || 30000;

        this.fetch = this.fetch.bind(this);
    }

    async fetch(options, update) {
        const now = Date.now();
        const key = typeof options === 'object' ? options.key : options;
        let cache = this.store[key];

        if (!cache) {
            // merge options into default fetch options
            const fetchOptions = {
                interval: this.defaultInterval,
                nextUpdate: now,
                update: update || (() => { return null }),
            };
            if (typeof options === 'object') {
                if (options.interval) {
                    fetchOptions.interval = options.interval;
                    fetchOptions.nextUpdate = now;
                }
            }
            cache = fetchOptions;
            this.store[key] = cache;
        } 

        if (now >= cache.nextUpdate) {
            cache.value = await cache.update();
            cache.nextUpdate = now + cache.interval;
            this.store[key] = cache;
            return cache.value;
        } else {
            return cache.value;
        }
    }
};

module.exports = Cache;
