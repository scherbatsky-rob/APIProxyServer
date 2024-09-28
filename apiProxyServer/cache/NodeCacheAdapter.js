// NodeCacheAdapter.js

const NodeCache = require('node-cache');
const Cache = require('./Cache');

class NodeCacheAdapter extends Cache {
    constructor(ttl) {
        super();
        this.cache = new NodeCache({ stdTTL: ttl });
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        this.cache.set(key, value);
    }
}

module.exports = NodeCacheAdapter;