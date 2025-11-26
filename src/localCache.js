
import { CACHE_STATE} from "./Utilities.js";

export class LocalCache {
    constructor(key) {
        this.key = key;
        this.updatedKey = key + "_updatedAt";
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
        localStorage.setItem(this.updatedKey, Date.now());
    }

    load() {
        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : null;
    }

    getUpdatedAt() {
        return Number(localStorage.getItem(this.updatedKey)) || 0;
    }

    clear() {
        localStorage.removeItem(this.key);
        localStorage.removeItem(this.updatedKey);
    }

    /**
     * Compare cached data with fresh data
     *
     * @param {*} freshData - data fetched from Firebase
     * @returns {boolean} - TRUE if same, FALSE if different
     */
    isSame(freshData) {
        const cached = this.load();
        if (!cached) return false; // no cache → definitely not same

        // compare by JSON (simple + safe for your case)
        return JSON.stringify(cached) === JSON.stringify(freshData);
    }
}



export const CacheManager = {
    clearAll() {
        Object.values(CACHE_STATE).forEach(key => {
            new LocalCache(key).clear();
        });
    }
};