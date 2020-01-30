"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timestamp = function (configuration) { return function (state, action) {
    if (state === void 0) { state = configuration.default; }
    var clear = configuration.clear, set = configuration.set, _a = configuration.timestampKey, timestampKey = _a === void 0 ? 'timestamp' : _a;
    if (clear != null && clear.includes(action.type)) {
        return configuration.default;
    }
    if (set != null && set.includes(action.type)) {
        if (typeof action.payload === 'object') {
            return action.payload[timestampKey];
        }
        return action.payload;
    }
    return state;
}; };
exports.default = timestamp;
