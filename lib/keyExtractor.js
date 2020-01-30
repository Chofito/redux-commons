"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyExtractor = function (configuration) { return function (state, action) {
    if (state === void 0) { state = configuration.default; }
    var clear = configuration.clear, set = configuration.set, extractionKey = configuration.extractionKey;
    if (clear != null && clear.includes(action.type)) {
        return configuration.default;
    }
    if (set != null && set.includes(action.type)) {
        return action.payload[extractionKey];
    }
    return state;
}; };
exports.default = keyExtractor;
