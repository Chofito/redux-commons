"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selected = function (configuration) { return function (state, action) {
    if (state === void 0) { state = null; }
    var allDeselected = configuration.allDeselected;
    if (configuration.selected != null && configuration.selected.includes(action.type)) {
        if (typeof action.payload === 'number' || typeof action.payload === 'string') {
            return action.payload;
        }
        return state;
    }
    if (allDeselected != null && allDeselected.includes(action.type)) {
        return configuration.default;
    }
    return state;
}; };
exports.default = selected;
