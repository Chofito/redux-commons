"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var order = function (configuration) { return function (state, action) {
    if (state === void 0) { state = []; }
    var added = configuration.added, fetched = configuration.fetched, replaced = configuration.replaced, removed = configuration.removed, confirmed = configuration.confirmed, cleared = configuration.cleared, sorted = configuration.sorted, _a = configuration.idKey, idKey = _a === void 0 ? 'id' : _a, _b = configuration.preferPrepend, preferPrepend = _b === void 0 ? false : _b;
    var payload = action.payload;
    if (added != null && added.includes(action.type)) {
        if (typeof payload === 'object' && (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string')) {
            return !preferPrepend ? __spreadArrays(state, [payload[idKey]]) : __spreadArrays([payload[idKey]], state);
        }
    }
    if (fetched != null && fetched.includes(action.type)) {
        if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
            var stateSet_1 = new Set(state);
            var difference = payload.order.filter(function (id) { return !stateSet_1.has(id); });
            return __spreadArrays(state, difference);
        }
    }
    if (replaced != null && replaced.includes(action.type)) {
        if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
            return payload.order;
        }
    }
    if (removed != null && removed.includes(action.type)) {
        if (typeof payload === 'object' && payload.order != null && payload.order.constructor === Array) {
            var stateSet_2 = new Set(state);
            var difference = payload.order.filter(function (id) { return !stateSet_2.has(id); });
            return __spreadArrays(state, difference);
        }
        if (typeof payload === 'number' || typeof payload === 'string') {
            return state.filter(function (id) { return id !== payload; });
        }
        if (typeof payload === 'object' && typeof payload[idKey] !== 'undefined') {
            return state.filter(function (id) { return id !== payload[idKey]; });
        }
        return state;
    }
    if (confirmed != null && confirmed.includes(action.type)) {
        if (typeof payload === 'object') {
            var _c = payload.oldId, oldId_1 = _c === void 0 ? -1 : _c, _d = payload.newId, newId_1 = _d === void 0 ? -1 : _d;
            return state.map(function (i) { return (i === oldId_1 ? newId_1 : i); });
        }
        return state;
    }
    if (cleared != null && cleared.includes(action.type)) {
        return [];
    }
    if (sorted != null && sorted.includes(action.type)) {
        if (typeof payload === 'object') {
            var oldIndex = payload.oldIndex, newIndex = payload.newIndex;
            if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
                return utils_1.arrayMove(state, oldIndex, newIndex);
            }
        }
    }
    return state;
}; };
exports.default = order;
