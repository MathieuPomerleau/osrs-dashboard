export class Cache<T> {
    internalCache: Map<string, Cacheable<T>>;
    ttlInMs: number;

    constructor(ttlInMs: number) {
        this.ttlInMs = ttlInMs;
        this.internalCache = new Map();
    }

    public get(key: string): T | undefined {
        return this.internalCache.get(key)?.cached;
    }

    public set(key: string, obj: T): void {
        if (this.internalCache.has(key)) return;

        this.internalCache.set(key, {
            cached: obj,
            timeout: setTimeout(
                () => this.internalCache.delete(key),
                this.ttlInMs
            ),
        });
    }

    public invalidate(key: string): void {
        const cached = this.internalCache.get(key);
        if (!cached) return;

        clearTimeout(cached.timeout);
        this.internalCache.delete(key);
    }
}

type Cacheable<T> = {
    cached: T;
    timeout: NodeJS.Timeout;
};
