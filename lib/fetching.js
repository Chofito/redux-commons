"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetching = function (configuration) { return function (state, action) {
    if (state === void 0) { state = []; }
    var started = configuration.started, succeed = configuration.succeed, failed = configuration.failed, _a = configuration.idKey, idKey = _a === void 0 ? 'id' : _a;
    if (started != null && started.includes(action.type)) {
        if (typeof action.payload === 'number' || typeof action.payload === 'string') {
            return __spreadArrays(state, [action.payload]);
        }
        if (typeof action.payload === 'object' &&
            (typeof action.payload[idKey] === 'number' || typeof action.payload[idKey] === 'string')) {
            return __spreadArrays(state, [action.payload[idKey]]);
        }
        return state;
    }
    if (failed != null && failed.includes(action.type)) {
        var payload_1 = action.payload;
        if (payload_1 !== null && typeof payload_1 === 'object' && typeof payload_1.objectId === 'number') {
            return state.filter(function (id) { return id != payload_1.objectId; });
        }
        return state;
    }
    if (succeed != null && succeed.includes(action.type)) {
        var payload_2 = action.payload;
        if (payload_2 !== null &&
            typeof payload_2 === 'object' &&
            (typeof payload_2[idKey] === 'number' || typeof payload_2[idKey] === 'string')) {
            return state.filter(function (id) { return id != payload_2[idKey]; });
        }
        if (typeof payload_2 === 'number' || typeof payload_2 === 'string') {
            return state.filter(function (id) { return id != payload_2; });
        }
        return state;
    }
    return state;
}; };
exports.default = fetching;
