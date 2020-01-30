"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var orderById = function (configuration) { return function (state, action) {
    var _a, _b;
    if (state === void 0) { state = {}; }
    var fetched = configuration.fetched, replaced = configuration.replaced, _c = configuration.idKey, idKey = _c === void 0 ? 'id' : _c, _d = configuration.orderKey, orderKey = _d === void 0 ? 'order' : _d;
    var payload = action.payload;
    if (fetched != null && fetched.includes(action.type)) {
        var order = payload[orderKey];
        if (order && order.constructor === Array) {
            var objectId = payload[idKey];
            var originalOrder = state[objectId] || [];
            var stateSet_1 = new Set(originalOrder);
            var difference = order.filter(function (id) { return !stateSet_1.has(id); });
            return __assign(__assign({}, state), (_a = {}, _a[objectId] = __spreadArrays(originalOrder, difference), _a));
        }
    }
    if (replaced != null && replaced.includes(action.type)) {
        var order = payload[orderKey];
        if (order && order.constructor === Array) {
            var objectId = payload[idKey];
            return __assign(__assign({}, state), (_b = {}, _b[objectId] = order, _b));
        }
    }
    return state;
}; };
exports.default = orderById;
