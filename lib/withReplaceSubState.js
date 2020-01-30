"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var withReplaceSubState = function (reducer) { return function (replaceActionTypes) { return function (state, action) {
    if (state === void 0) { state = reducer(undefined, {}); }
    return (replaceActionTypes.includes(action.type) ? action.payload : reducer(state, action));
}; }; };
exports.default = withReplaceSubState;
