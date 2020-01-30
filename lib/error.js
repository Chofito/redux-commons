"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error = function (configuration) { return function (state, action) {
    if (state === void 0) { state = {}; }
    var clear = configuration.clear, populate = configuration.populate;
    if (clear != null && clear.includes(action.type)) {
        return {};
    }
    if (populate != null && populate.includes(action.type)) {
        return action.payload;
    }
    return state;
}; };
exports.default = error;
