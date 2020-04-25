function Dictionary() {
    var items = {};
    this.set = function (key, value) {
        if (!this.has(key)) {
            items[key] = value;
            return true;
        } else {
            return false;
        }
    };
    this.delete = function (key) {
        if (!this.has(key)) {
            delete items[key];
            return true;
        } else {
            return false;
        }
    };
    this.has = function (key) {
        return key in items;
    };
    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    };
    this.clear = function () {
        items = {};
    };
    this.size = function () {
        return Object.keys(items).length;
    };
    this.keys = function () {
        return Object.keys(items);
    };
    this.values = function () {
        var values = [];
        for (var k in items) { //{1}
            if (this.has(k)) {
                values.push(items[k]); //{2}
            }
        }
        return values;
    }
}

export default Dictionary;