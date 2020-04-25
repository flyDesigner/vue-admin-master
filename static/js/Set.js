function Set() {
    let item = {};
    this.add = function (value) {
        if (!this.has(value)) {
            item[value] = value;
            return true;
        } else {
            return false;
        }
    }
    this.remove = function (value) {
        if (!this.has(value)) {
            delete item[value];
            return true;
        } else {
            return false
        }
    }
    this.has = function (value) {
        return item.hasOwnProperty(value);
    }
    this.clear = function () {
        item = {};
    }
    this.size = function () {
        return Object.keys(item).length;
    }
    this.values = function () {
        let values = [];
        for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
            values.push(items[keys[i]]);
        }
        return values;
    }
}

export default Set;