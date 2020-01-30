"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var counter = function (configuration) { return function (state, action) {
    if (state === void 0) { state = 0; }
    var incremented = configuration.incremented, decremented = configuration.decremented, reset = configuration.reset;
    var payload = action.payload;
    if (incremented != null && incremented.includes(action.type)) {
        if (typeof payload !== 'undefined') {
            return state + (payload.step || 1);
        }
    }
    if (decremented != null && decremented.includes(action.type)) {
        if (typeof payload !== 'undefined') {
            return state - (payload.step || 1);
        }
    }
    if (reset != null && reset.includes(action.type)) {
        return 0;
    }
    return state;
}; };
exports.default = counter;
