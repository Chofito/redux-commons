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
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Fix State Shape, should be ErrorType instead of any
var errors = function (configuration) { return function (state, action) {
    var _a, _b;
    if (state === void 0) { state = {}; }
    var clear = configuration.clear, populate = configuration.populate, _c = configuration.idKey, idKey = _c === void 0 ? 'id' : _c;
    var payload = action.payload;
    if (populate != null && populate.includes(action.type)) {
        if (typeof payload.objectId === 'number') {
            return __assign(__assign({}, state), (_a = {}, _a[payload.objectId] = action.payload, _a));
        }
        if (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string') {
            return __assign(__assign({}, state), (_b = {}, _b[payload[idKey]] = action.payload, _b));
        }
        return state;
    }
    if (clear != null && clear.includes(action.type)) {
        if (typeof payload[idKey] === 'number' || typeof payload[idKey] === 'string') {
            var newState = __assign({}, state);
            delete newState[payload[idKey]];
            return newState;
        }
        return state;
    }
    return state;
}; };
exports.default = errors;
