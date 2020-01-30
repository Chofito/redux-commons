"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withResetState = function (reducer) { return function (resetActionTypes) { return function (state, action) {
    if (state === void 0) { state = reducer(undefined, {}); }
    return (resetActionTypes.includes(action.type) ? reducer(undefined, {}) : reducer(state, action));
}; }; };
exports.default = withResetState;
